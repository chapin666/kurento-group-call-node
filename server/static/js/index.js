
const socket = io('https://' + location.host);

const participants = {};

let localVideoCurrentId;
let sessionId;
let localVideo;

window.onbeforeunload = function () {
    socket.disconnect();
};

socket.on('connect', () => {
    console.log('ws connect success');
});

socket.on('id', id => {
    sessionId = id;
});

socket.on('message', message => {
    //console.log(message.id);

    switch(message.id) {
       case 'registered':
            disableElements("register");
            break;
        case 'existingParticipants':
            onExistingParticipants(message);
            break;
        case 'newParticipantArrived':
            onNewParticipant(message);
            break;
        case 'receiveVideoAnswer':
            onReceiveVideoAnswer(message);
            break;
        case 'onParticipantLeft':
            onParticipantLeft(message);
            break;
        case 'iceCandidate':
            let participant = participants[message.sessionId];
            if (participant != null) {
                participant.rtcPeer.addIceCandidate(message.candidate, error => {
                    if (error) {
                        if (message.sessionId === sessionId) {
                            console.error(`Error adding candidate to self : ${error}`);
                        } else {
                            console.error(`Error adding candidate : ${error}`);
                        }
                    }
                });
            } else {
                console.error(`still does not establish rtc peer for ${message.sessionId}`);
            }
            break;
        default:
            break;
   }
});



/**
 * register button click
 */
function register() {
    let data = {
        id: 'register',
        name: document.getElementById('userName').value
    };
    sendMessage(data);
}



/**
 * joinRoom button click
 * 
 * @param {string} roomName 
 */
function joinRoom(roomName) {
    disableElements('joinRoom');
    if(typeof roomName == 'undefined'){
        roomName = document.getElementById('roomName').value;
    } else {
        document.getElementById('roomName').value = roomName;
    }

    let data = {
        id: 'joinRoom',
        roomName: roomName
    };

    sendMessage(data);
}

/**
 * Request video from all existing participants
 * 
 * @param {*} message 
 */
function onExistingParticipants(message) {

    let constraints = {
        audio: true,
        video: {
            frameRate: {
                min: 1,
                ideal: 15,
                max: 30
            },
            width: {
                min: 32,
                ideal: 50,
                max: 320
            },
            height: {
                min: 32,
                ideal: 50,
                max: 320
            }
        }
    };

    let localParticipant = new Participant(sessionId);
    participants[sessionId] = localParticipant;
    localVideo = document.getElementById('local_video');

    let video = localVideo;

    let options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: localParticipant.onIceCandidate.bind(localParticipant)
    };

    localParticipant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
        if (error) {
            return console.error(error);
        }

        localVideoCurrentId = sessionId;

        localVideo = document.getElementById('local_video');
        localVideo.src = localParticipant.rtcPeer.localVideo.src;
        localVideo.muted = true;

        this.generateOffer(localParticipant.offerToReceiveVideo.bind(localParticipant));
    });

    for (let i in message.data) {
        receiveVideoFrom(message.data[i]);
    }
}

/**
 * 
 * @param {*} sender 
 */
function receiveVideoFrom(sender) {
    let participant = new Participant(sender);
    participants[sender] = participant;

    let video = createVideoForParticipant(participant);

    let options = {
        remoteVideo: video,
        onicecandidate: participant.onIceCandidate.bind(participant)   // send any ice candidates to the other peer
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
        if (error) {
            return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });
}

/**
 * Create video DOM element
 * 
 * @param {object} participant 
 */
function createVideoForParticipant(participant) {
    let videoId = 'video-' + participant.id;

    let video = document.createElement('video');
    video.autoplay = true;
    video.id = videoId;
    video.poster = 'img/webrtc.png';
    
    document.getElementById('video_list').appendChild(video);
    
    return document.getElementById(videoId);
}


/**
 * 
 * @param {string} message 
 */
function onNewParticipant(message) {
    receiveVideoFrom(message.new_user_id);
}

/**
 *  
 * 
 * @param {object} message 
 */
function onReceiveVideoAnswer(message) {
    // user
    var participant = participants[message.sessionId];
    participant.rtcPeer.processAnswer(message.sdpAnswer, error => {
        if (error) {
            console.error(error);
        } else {
            participant.isAnswer = true;
            while (participant.iceCandidateQueue.length) {
                console.error(`collected: ${participant.id} ice candaiate`);
                let candidate = participant.iceCandidateQueue.shift();
                participant.rtcPeer.addIceCandidate(candidate);
            }
        }
    });
}


/**
 * leaveRoom button click
 */
function leaveRoom() {
    disableElements("leaveRoom");
    var message = {
        id: "leaveRoom"
    };

    participants[sessionId].rtcPeer.dispose();
    sendMessage(message);
    participants = {};

    var myNode = document.getElementById("video_list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

/**
 * 
 * @param {*} message 
 */
function onParticipantLeft(message) {
    var participant = participants[message.sessionId];
    participant.dispose();
    delete participants[message.sessionId];

    console.log("video-" + participant.id);
    // remove video tag
    //document.getElementById("video-" + participant.id).remove();
    var video = document.getElementById("video-" + participant.id);

    // Internet Explorer doesn't know element.remove(), does know this
    video.parentNode.removeChild(video);
}


/**
 *  send message helper
 * @param {object} data 
 */
function sendMessage(data) {
    socket.emit('message', data);
}



/**
 *  elements control
 * 
 * @param {string} functionName 
 */
function disableElements(functionName){
    if(functionName === "register"){
        document.getElementById('userName').disabled = true;
        document.getElementById('register').disabled = true;
        document.getElementById('joinRoom').disabled = false;
        document.getElementById('roomName').disabled = false;
        //document.getElementById('sendInvite').disabled = false;
        //document.getElementById('otherUserName').disabled = false;
    }
    if(functionName === "joinRoom"){
        document.getElementById('roomName').disabled = true;
        document.getElementById('joinRoom').disabled = true;
        //document.getElementById('sendInvite').disabled = false;
        //document.getElementById('otherUserName').disabled = false;
        document.getElementById('leaveRoom').disabled = false;
        //document.getElementById('startRecording').disabled = false;
        //document.getElementById('stopRecording').disabled = false;
    }
    if(functionName === "leaveRoom"){
        document.getElementById('leaveRoom').disabled = true;
        document.getElementById('roomName').disabled = false;
        document.getElementById('joinRoom').disabled = false;
        //document.getElementById('sendInvite').disabled = false;
        //document.getElementById('otherUserName').disabled = false;
        //document.getElementById('startRecording').disabled = true;
        //document.getElementById('stopRecording').disabled = true;
    }
    if(functionName === "call"){
        document.getElementById('roomName').disabled = true;
        document.getElementById('joinRoom').disabled = true;
        document.getElementById('leaveRoom').disabled = false;
    }
}