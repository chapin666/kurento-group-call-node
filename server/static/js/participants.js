
class Participant {

    constructor(id) {
        this.id = id;
        this.rtcPeer = null;
        this.iceCandidateQueue = [];
    }

    offerToReceiveVideo(error, offerSdp) {
        if (error) {
            return console.error('sdp offer error');
        }

        let msg = {
            id: 'receiveVideoFrom',
            sender: this.id,
            sdpOffer: offerSdp
        };

        sendMessage(msg);
    }


    onIceCandidate(candidate) {
        let message = {
            id: 'onIceCandidate',
            candidate: {
                candidate: candidate.candidate,
                sdpMid: candidate.sdpMid,
                sdpMLineIndex: candidate.sdpMLineIndex
            },
            sender: this.id
        };

        sendMessage(message);
    }


    dispose() {
        this.rtcPeer.dispose();
        this.rtcPeer = null;
    }

}