
import path from 'path';
import url from 'url';
import https from 'https';
import fs from 'fs'; 

import express from 'express';
import kurento from 'kurento-client';
import socketIO from 'socket.io';
import minimst from 'minimist';

import { Session, Register } from './lib';

let userRegister = new Register();
let rooms = {};

const argv = minimst(process.argv.slice(2), {
    default: {
        as_uri: 'https://localhost:3000',
        ws_uri: 'ws://54.223.104.239:8888/kurento'
    }
});


/////////////////////////// https ///////////////////////////////
const options = {
    key: fs.readFileSync('./server/keys/server.key'),
    cert: fs.readFileSync('./server/keys/server.crt')
};

let app = express();

let asUrl = url.parse(argv.as_uri);
let port = asUrl.port;
let server = https.createServer(options, app).listen(port, () => {
    console.log('LYCAMPLUS Group Call started');
    console.log('Open %s with a WebRTC capable brower.', url.format(asUrl));
});

/////////////////////////// websocket ///////////////////////////////

let io = socketIO(server).path('/groupcall');
let wsUrl = url.parse(argv.ws_uri).href;

io.on('connection', socket => {

    // error handle
    socket.on('error', error => {
        console.error(`Connection %s error : %s`, socket.id, error);
    });

    socket.on('disconnect', data => {
        console.log(`Connection : %s disconnect`, data);
    });

    socket.on('message', message => {
        console.log(`Connection: %s receive message`, message.id);

        switch (message.id) {
            case 'joinRoom':
                joinRoom(socket, message, err => {
                    if (err) {
                        console.error(`join Room error ${err}`);
                    }
                });
                break;
            case 'receiveVideoFrom':
                receiveVideoFrom(socket, message.sender, message.sdpOffer, (error) => {
                    if (error) {
                        console.error(error);
                    }
                });
                break;
            case 'leaveRoom':
                leaveRoom(socket, (error) => {
                    if (error) {
                        console.error(error);
                    }
                });
                break;
            case 'onIceCandidate':
                addIceCandidate(socket, message, (error) => {
                    if (error) {
                        console.error(error);
                    }
                });
                break;
            default:
                socket.emit({id: 'error', msg: `Invalid message ${message}`});
        }
    });

});


/**
 * 
 * @param {*} socket 
 * @param {*} message 
 * @param {*} callback 
 */
function joinRoom(socket, message, callback) {

    // get room 
    getRoom(message.roomName, (error, room) => {
        if (error) {
            callback(error);
            return;
        }
        // join user to room
        join(socket, room, message.name, (err, user) => {
            console.log(`join success : ${user.name}`);
            if (err) {
                callback(err);
                return;
            }
            callback();
        });
    });
}

/**
 * Get room. Creates room if room does not exists
 * 
 * @param {string} roomName 
 * @param {function} callback 
 */
function getRoom(roomName, callback) {
    let room = rooms[roomName];

    if (room == null) {
        console.log(`create new room : ${roomName}`);
        getKurentoClient((error, kurentoClient) => {
            if (error) {
                return callback(error);
            }

            kurentoClient.create('MediaPipeline', (error, pipeline) => {
                if (error) {
                    return callback(error);
                }
                room = {
                    name: roomName,
                    pipeline: pipeline,
                    participants: {},
                    kurentoClient: kurentoClient
                };

                rooms[roomName] = room;
                callback(null, room);
            });
        });
    } else {
        console.log(`get existing room : ${roomName}`);
        callback(null, room);
    }
}


/**
 * join call room
 * 
 * @param {*} socket 
 * @param {*} room 
 * @param {*} userName 
 * @param {*} callback 
 */
function join(socket, room, userName, callback) {

    // add user to session
    let userSession = new Session(socket, userName, room.name);

    // register
    userRegister.register(userSession);

    room.pipeline.create('WebRtcEndpoint', (error, outgoingMedia) => {
        if (error) {
            console.error('no participant in room');
            if (Object.keys(room.participants).length === 0) {
                room.pipeline.release();
            }
            return callback(error);
        }

        // else
        outgoingMedia.setMaxVideoRecvBandwidth(300);
        outgoingMedia.setMinVideoRecvBandwidth(100);
        userSession.setOutgoingMedia(outgoingMedia);
    

        // add ice candidate the get sent before endpoint is established
        // socket.id : room iceCandidate Queue
        let iceCandidateQueue = userSession.iceCandidateQueue[userSession.name];
        if (iceCandidateQueue) {
            while (iceCandidateQueue.length) {
                let message = iceCandidateQueue.shift();
                console.error(`user: ${userSession.id} collect candidate for outgoing media`);
                userSession.outgoingMedia.addIceCandidate(message.candidate);
            }
        }

        // ICE 
        // listener
        userSession.outgoingMedia.on('OnIceCandidate', event => {
            // ka ka ka ka ka
            // console.log(`generate outgoing candidate ${userSession.id}`);
            let candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
            userSession.sendMessage({
                id: 'iceCandidate',
                name: userSession.name,
                candidate: candidate
            });
        });

         
         let usersInRoom = room.participants;


        // notify other user that new user is joing
        for (let i in usersInRoom) {
            if (usersInRoom[i].name != userSession.name) {
                usersInRoom[i].sendMessage({
                    id: 'newParticipantArrived',
                    name: userSession.name
                });
            }
        }


        // send list of current user in the room to current participant
        let existingUsers = [];
        for (let i in usersInRoom) {
            if (usersInRoom[i].name != userSession.name) {
                existingUsers.push(usersInRoom[i].name);
            }
        }
        userSession.sendMessage({
            id: 'existingParticipants',
            data: existingUsers,
            roomName: room.name
        });

        // register user to room
        room.participants[userSession.name] = userSession;

        callback(null, userSession);
    });
}

/**
 * receive video from sender
 * 
 * @param {*} socket 
 * @param {*} senderName 
 * @param {*} sdpOffer 
 * @param {*} callback 
 */
function receiveVideoFrom(socket, senderName, sdpOffer, callback) {
    let userSession = userRegister.getById(socket.id);
    let sender = userRegister.getByName(senderName);


    getEndpointForUser(userSession, sender, (error, endpoint) => {
        if (error) {
            console.error(error);
            callback(error);
        }

        endpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
            console.log(`process offer from ${sender.name} to ${userSession.name}`);
            if (error) {
                return callback(error);
            }
            let data = {
                id: 'receiveVideoAnswer',
                name: sender.name,
                sdpAnswer: sdpAnswer
            };
            userSession.sendMessage(data);

            endpoint.gatherCandidates(error => {
                if (error) {
                    return callback(error);
                }
            });

            return callback(null, sdpAnswer);
        });
    });
}


/**
 * 
 */
function leaveRoom(socket, callback) {
    var userSession = userRegister.getById(socket.id);

    if (!userSession) {
        return;
    }

    var room = rooms[userSession.roomName];

    if(!room){
        return;
    }

    console.log('notify all user that ' + userSession.name + ' is leaving the room ' + room.name);
    var usersInRoom = room.participants;
    delete usersInRoom[userSession.name];
    userSession.outgoingMedia.release();
    
    // release incoming media for the leaving user
    for (var i in userSession.incomingMedia) {
        userSession.incomingMedia[i].release();
        delete userSession.incomingMedia[i];
    }

    var data = {
        id: 'participantLeft',
        name: userSession.name
    };
    for (var i in usersInRoom) {
        var user = usersInRoom[i];
        // release viewer from this
        user.incomingMedia[userSession.name].release();
        delete user.incomingMedia[userSession.name];

        // notify all user in the room
        user.sendMessage(data);
    }

    // Release pipeline and delete room when room is empty
    if (Object.keys(room.participants).length == 0) {
        room.pipeline.release();
        delete rooms[userSession.roomName];
    }
    delete userSession.roomName;
}


/**
 * getKurento Client
 * 
 * @param {function} callback 
 */
function getKurentoClient(callback) {
    kurento(wsUrl, (error, kurentoClient) => {
        if (error) {
            let message = `Could not find media server at address ${wsUrl}`;
            return callback(`${message} . Exiting with error ${error}`);
        }
        callback(null, kurentoClient);
    });
}

/**
 *  Add ICE candidate, required for WebRTC calls
 * 
 * @param {*} socket 
 * @param {*} message 
 * @param {*} callback 
 */
function addIceCandidate(socket, message, callback) {
    let user = userRegister.getById(socket.id);
    if (user != null) {
        // assign type to IceCandidate
        let candidate = kurento.register.complexTypes.IceCandidate(message.candidate);
        user.addIceCandidate(message, candidate);
        callback();
    } else {
        console.error(`ice candidate with no user receive : ${message.sender}`);
        callback(new Error("addIceCandidate failed"));
    }
}


/**
 * 
 * @param {*} userSession 
 * @param {*} sender 
 * @param {*} callback 
 */
function getEndpointForUser(userSession, sender, callback) {

    if (userSession.name === sender.name) { 
        return callback(null, userSession.outgoingMedia);
    }

    let incoming = userSession.incomingMedia[sender.name];
    
    if (incoming == null) {
        console.log(`user : ${userSession.id} create endpoint to receive video from : ${sender.id}`);
        getRoom(userSession.roomName, (error, room) => {
            if (error) {
                console.error(error);
                callback(error);
                return;
            }
            room.pipeline.create('WebRtcEndpoint', (error, incoming) => {
                if (error) {
                    if (Object.keys(room.participants).length === 0) {
                        room.pipeline.release();
                    }
                    console.error('error: ' + error);
                    callback(error);
                    return;
                }

                console.log(`user: ${userSession.name} successfully create pipeline`);
                incoming.setMaxVideoRecvBandwidth(300);
                incoming.setMinVideoRecvBandwidth(100);
                userSession.incomingMedia[sender.name] = incoming;
                

                // add ice candidate the get sent before endpoints is establlished
                let iceCandidateQueue = userSession.iceCandidateQueue[sender.name];
                if (iceCandidateQueue) {
                    while (iceCandidateQueue.length) {
                        let message = iceCandidateQueue.shift();
                        console.log(`user: ${userSession.name} collect candidate for ${message.data.sender}`);
                        incoming.addIceCandidate(message.candidate);
                    }
                }

                incoming.on('OnIceCandidate', event => {
                    // ka ka ka ka ka
                    // console.log(`generate incoming media candidate: ${userSession.id} from ${sender.id}`);
                    let candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
                    userSession.sendMessage({
                        id: 'iceCandidate',
                        name: sender.name,
                        candidate: candidate
                    });
                });

                sender.outgoingMedia.connect(incoming, error => {
                    if (error) {
                        console.log(error);
                        callback(error);
                        return;
                    }
                    callback(null, incoming);
                });
            });
        })
    } else {
        console.log(`user: ${userSession.name} get existing endpoint to receive video from: ${sender.name}`);
        sender.outgoingMedia.connect(incoming, error => {
            if (error) {
                callback(error);
            }
            callback(null, incoming);
        });
    }
}


app.use(express.static(path.join(__dirname, 'static')));