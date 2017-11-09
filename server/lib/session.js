'use strict';

/**
 *  User session 
 */
export default class Session {

    /**
     * constructor
     * 
     * @param {*} socket 
     * @param {*} userName 
     * @param {*} roomName 
     */
    constructor(socket, userName, roomName) {
        this.id = socket.id;
        this.socket = socket;

        this.name = userName;
        this.roomName = roomName;

        this.outgoingMedia = null;
        this.incomingMedia = {};

        this.iceCandidateQueue = {};
        this.hubPort = null;
    }

    /**
     * ice candidate for this user
     * @param {object} data 
     * @param {object} candidate 
     */
    addIceCandidate(data, candidate) {
        // self
        if (data.sender === this.name) {
            // have outgoing media.
            if (this.outgoingMedia) {
                console.log(` add candidate to self : %s`, data.sender);
                this.outgoingMedia.addIceCandidate(candidate);
            } else {
                // save candidate to ice queue.
                console.error(` still does not have outgoing endpoint for ${data.sender}`);
                this.iceCandidateQueue[data.sender].push({
                    data: data,
                    candidate: candidate
                });
            }
        } else {
            // others
            let webRtc = this.incomingMedia[data.sender];
            if (webRtc) {
                console.log(`%s add candidate to from %s`, this.id, data.sender);
                webRtc.addIceCandidate(candidate);
            } else {
                console.error(`${this.id} still does not have endpoint for ${data.sender}`);
                if (!this.iceCandidateQueue[data.sender]) {
                    this.iceCandidateQueue[data.sender] = [];
                }
                this.iceCandidateQueue[data.sender].push({
                    data: data,
                    candidate: candidate
                });
            }
        }
    }

    /**
     * 
     * @param {*} data 
     */
    sendMessage(data) {
        if (this.socket) {
            this.socket.emit('message', data);
        } else {
            console.error('socket is null');
        }
    }


    /**
     * 
     * setOutgoingMedia
     * 
     * @param {*} outgoingMedia 
     */
    setOutgoingMedia(outgoingMedia) {
        this.outgoingMedia = outgoingMedia;
    }

    /**
     * 
     * @param {*} hubPort 
     */
    setHubPort(hubPort) {
        this.hubPort = hubPort;
    }

}