import React, { useEffect, useRef } from 'react';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { SocketContext } from '../Podcast/SocketContext'; 

const ViewerLiveStream = () => {
    const { stream } = React.useContext(SocketContext);
    const videoRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            const peer = createPeer();
            peer.addTransceiver("video", { direction: "recvonly" }); 
            peer.addTransceiver("audio", { direction: "recvonly" });
        };

        init();

        return () => {
            // Cleanup function if needed
        };
    }, []);

    const createPeer = () => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

        return peer;
    };

    const handleNegotiationNeededEvent = async (peer) => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            const payload = {
                sdp: peer.localDescription
            };

            const { data } = await axios.post('http://localhost:8000/consumer', payload);
            const desc = new RTCSessionDescription(data.sdp);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        } catch (error) {
            console.error('Error handling negotiation needed event:', error);
        }
    };

    const handleTrackEvent = (e) => {
        if (e.streams && e.streams.length > 0) {
            const stream = e.streams[0];
            if (stream.getVideoTracks().length > 0 && videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                const audioElement = document.createElement('audio');
                audioElement.srcObject = stream;
                audioElement.autoplay = true;
                audioElement.play();
            }
        }
    };
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Stream" />

            <header style={{ padding: '0.75em 0' }}>
                <h1 style={{ fontSize: '1.75em' }}>Stream</h1>
            </header>

            <main style={{ display: 'flex', flexDirection: 'column' }}>
                <section className="video-section" style={{ position: 'relative', flex: 1 }}>
                    <video ref={videoRef} id="videoplayer" autoPlay muted style={{ width: '100%', border: '1px solid #E8E8E8' }}></video>

                    <div className="controls" style={{ position: 'absolute', top: '0.5em', right: '1em' }}>
                        <button id="sound" type="button" style={{ backgroundColor: '#4CAF50', padding: '0.5em 1em', border: '1px solid #ccc' }}>Unmute</button>
                    </div>
                </section>

                <section className="livechat" style={{ color: '#000', padding: '1em', flex: 1 }}>
                    <h5 style={{ paddingTop: 0, marginTop: 0 }}>Viewers in chat: <span id="viewerCount">0</span></h5>

                    <div className="messages" id="messages" style={{ height: '7em', overflowY: 'scroll' }}>
                        <ul id="message-list" style={{ paddingTop: '1px', listStyle: 'none', paddingLeft: 0 }}></ul>
                    </div>

                    <div className="chat-input-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input type="text" id="chat-input" placeholder="Type away!" style={{ flex: 3, marginBottom: 0, width: '100%', padding: '0.5em' }} />
                        <button type="submit" style={{ flex: 1, marginLeft: '1em', width: '100%', backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: '0.5em 1em' }}>Chat</button>
                    </div>
                </section>
            </main>
        </DefaultLayout>
    );
};

export default ViewerLiveStream;
