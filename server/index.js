
import path from 'path';
import url from 'url';
import https from 'https';
import fs from 'fs'; 

import express from 'express';
import kurento from 'kurento-client';
import socketIO from 'socket.io';
import minimst from 'minimist';

import { Session, Register } from './lib';

let userRegister = new Register;
let rooms = {};

const argv = minimst(process.argv.slice(2), {
    default: {
        as_uri: 'https://localhost:3000',
        ws_uri: 'ws://127.0.0.1:8888/kurento'
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

let io = socketIO(server).path('/group');
let wsUrl = url.parse(argv.ws_uri).href;

io.on('connection', socket => {
    let userList = '';
    
    for (let userId in userRegister.usersById) {
        userList += ' ' + userId + ',';
    }

    // send id
    socket.emit('id', socket.id);

    // error handle
    socket.on('error', error => {
        console.error(`Connection %s error : %s`, socket.id, error);
        /*leaveRoom(socket.id, () => {
            console.log(`%s leave room`, socket.id);
        });*/
    });

    socket.on('disconnect', data => {
        console.log(`Connection : %s disconnect`, data);
        /*leaveRoom(socket.id, () => {
            let userSession = userRegister.getById(socket.id);
            stop(userSession.id);
        });*/
    });

    socket.on('message', message => {
        console.log(`Connection: %s receive message`, message.id);

        switch (message.id) {
            case 'register':
                console.log(`registering ${socket.id}`);
                register(socket, message.name, (error) => {
                    console.log();
                });
                break;
            case 'joinRoom':
                console.log(`${socket.id} joinRoom : ${message.roomName}`);
                joinRoom(socket, message.roomName, err => {
                    if (err) {
                        console.log(`join Room error ${err}`);
                    }
                });
                break;
            case 'receiveVideoFrom':
                receiveVideoFrom(socket, message.sender, message.sdpOffer, () => {

                });
                break;
            case 'leaveRoom':
                leaveRoom(socket.id);
                break;
            case 'call':
                break;
            case 'startRecording':
                 break;
            case 'stopRecording':
                break;
            case 'onIceCandidate':
                addIceCandidate(socket, message);
                break;
            default:
                socket.emit({id: 'error', message: `Invalid message %s. `, message});
        }
    });

});


/**
 * 
 * @param {object} socket 
 * @param {string} name 
 */
function register(socket, name, callback) {
    let userSession = new Session(socket.id, socket);
    userSession.name = name;
    userRegister.register(userSession);
    userSession.sendMessage({
        id: 'registered',
        data: `Successfully register ${socket.id}`
    });
    console.log(userRegister);
    callback();
}

/**
 * 
 * @param {*} socket 
 * @param {*} roomName 
 */
function joinRoom(socket, roomName, callback) {
    getRoom(roomName, (error, room) => {
        if (error) {
            callback(error);
        }
        join(socket, room, (err, user) => {
            console.log(`join success : ${user.id}`);
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

                pipeline.create('Composite', (error, composite) => {
                    if (error) {
                        return callback(error);
                    }
                    room = {
                        name: roomName,
                        pipeline: pipeline,
                        participants: {},
                        kurentoClient: kurentoClient,
                        composite: composite
                    };

                    rooms[roomName] = room;
                    callback(null, room);
                });
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
 * @param {object} socket 
 * @param {object} room 
 * @param {function} callback 
 */
function join(socket, room, callback) {
    let userSession = userRegister.getById(socket.id);
    userSession.setRoomName(room.name);

    room.pipeline.create('WebRtcEndpoint', (error, outgoingMedia) => {
        if (error) {
            console.error('no participant in room');
            if (Object.keys(room.participants).length === 0) {
                room.pipeline.release();
            }
            return callback(error);
        }

        // else
        outgoingMedia.setMaxVideoRecvBandwidth(100);
        outgoingMedia.setMinVideoRecvBandwidth(20);
        userSession.outgoingMedia = outgoingMedia;
    

        // add ice candidate the get sent before endpoint is established
        // socket.id : room iceCandidate Queue
        let iceCandidateQueue = userSession.iceCandidateQueue[socket.id];
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
                sessionId: userSession.id,
                candidate: candidate
            });
        });

        // notify other user that new user is joing
        let data = {
            id: 'newParticipantArrived',
            new_user_id: userSession.id
        };
        let usersInRoom = room.participants;
        for (let i in usersInRoom) {
            usersInRoom[i].sendMessage(data);
        }

        let existingUserIds = [];
        for (let i in room.participants) {
            existingUserIds.push(usersInRoom[i].id);
        }

        // send list of current user in the room to current participant
        userSession.sendMessage({
            id: 'existingParticipants',
            data: existingUserIds,
            roomName: room.name
        });

        // register user to room
        room.participants[userSession.id] = userSession;

        room.composite.createHubPort((error, hubPort) => {
            if (error) {
                return callback(error);
            }
            userSession.setHubPort(hubPort);
            userSession.outgoingMedia.connect(userSession.hubPort);

            callback(null, userSession);
        });
    });
}


// receive video from sender
function receiveVideoFrom(socket, senderId, sdpOffer, callback) {
    let userSession = userRegister.getById(socket.id);
    let sender = userRegister.getById(senderId);

    getEndpointForUser(userSession, sender, (error, endpoint) => {
        if (error) {
            callback(error);
        }
        console.log("endpint-----", endpoint);

        endpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
            console.log(`process offer from ${senderId} to ${userSession.id}`);
            if (error) {
                return callback(error);
            }
            let data = {
                id: 'receiveVideoAnswer',
                sessionId: sender.id,
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
function leaveRoom(sessionId, callback) {
    var userSession = userRegistry.getById(sessionId);

    if (!userSession) {
        return;
    }

    var room = rooms[userSession.roomName];

    if(!room){
        return;
    }

    console.log('notify all user that ' + userSession.id + ' is leaving the room ' + room.name);
    var usersInRoom = room.participants;
    delete usersInRoom[userSession.id];
    userSession.outgoingMedia.release();
    // release incoming media for the leaving user
    for (var i in userSession.incomingMedia) {
        userSession.incomingMedia[i].release();
        delete userSession.incomingMedia[i];
    }

    var data = {
        id: 'participantLeft',
        sessionId: userSession.id
    };
    for (var i in usersInRoom) {
        var user = usersInRoom[i];
        // release viewer from this
        user.incomingMedia[userSession.id].release();
        delete user.incomingMedia[userSession.id];

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
    console.log(wsUrl);
    kurento(wsUrl, (error, kurentoClient) => {
        if (error) {
            let message = `Could not find media server at address ${wsUrl}`;
            return callback(`${message} . Exiting with error ${error}`);
        }
        callback(null, kurentoClient);
    });
}

/**
 * Add ICE candidate, required for WebRTC calls
 * 
 * @param {object} socket 
 * @param {object} message 
 */
function addIceCandidate(socket, message) {
    let user = userRegister.getById(socket.id);
    if (user != null) {
        // assign type to IceCandidate
        let candidate = kurento.register.complexTypes.IceCandidate(message.candidate);
        user.addIceCandidate(message, candidate);
    } else {
        console.error(`ice candidate with no user receive : ${socket.id}`);
    }
}


function getEndpointForUser(userSession, sender, callback) {

    if (userSession.id === sender.id) {   
        return callback(null, userSession.outgoingMedia);
    }

    let incoming = userSession.incomingMedia[sender.id];
    
    if (incoming == null) {
        console.log(`user : ${userSession.id} create endpoint to receive video from : ${sender.id}`);
        getRoom(userSession.roomName, (error, room) => {
            if (error) {
                return callback(error);
            }
            room.pipeline.create('WebRtcEndpoint', (error, incomingMedia) => {
                if (error) {
                    if (Object.keys(room.participants).length === 0) {
                        room.pipeline.release();
                    }
                    return callback(error);
                }

                console.log(`user: ${userSession.id} successfully create pipeline`);
                incomingMedia.setMaxVideoRecvBandwidth(100);
                incomingMedia.setMinVideoRecvBandwidth(20);
                userSession.incomingMedia[sender.id] = incomingMedia;
                

                // add ice candidate the get sent before endpoints is establlished
                let iceCandidateQueue = userSession.iceCandidateQueue[sender.id];
                if (iceCandidateQueue) {
                    while (iceCandidateQueue.length) {
                        let message = iceCandidateQueue.shift();
                        console.log(`user: ${userSession.id} collect candidate for ${message.data.sender}`);
                        incomingMedia.addIceCandidate(message.candidate);
                    }
                }

                incomingMedia.on('OnIceCandidate', event => {
                    // ka ka ka ka ka
                    // console.log(`generate incoming media candidate: ${userSession.id} from ${sender.id}`);
                    let candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
                    userSession.sendMessage({
                        id: 'iceCandidate',
                        sessionId: sender.id,
                        candidate: candidate
                    });
                });

                sender.hubPort.connect(incomingMedia);

                callback(null, incomingMedia);

                /*sender.outgoingMedia.connect(incomingMedia, error => {
                    if (error) {
                        callback(error);
                    }
                    callback(null, incomingMedia);
                });*/
            });
        })
    } else {
        console.log(`user: ${userSession.id} get existing endpoint to receive video from: ${sender.id}`);
        sender.outgoingMedia.connect(incoming, error => {
            if (error) {
                callback(error);
            }
            callback(null, incoming);
        });
    }
}


app.use(express.static(path.join(__dirname, 'static')));