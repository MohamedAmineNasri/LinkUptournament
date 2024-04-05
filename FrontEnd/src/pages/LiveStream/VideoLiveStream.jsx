import React, { useState, useRef, useEffect } from 'react';
import { Typography, AppBar, styled } from '@mui/material';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import axios from 'axios'; 
import { SocketContext } from '../Podcast/SocketContext'; 

const Wrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
}));

const VideoContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    border: '1px solid #E8E8E8',
    marginBottom: '1em',
}));

const VideoPlayer = styled('video')(({ theme }) => ({
    width: '100%',
}));

const Button = styled('button')(({ theme }) => ({
    padding: '0.5em 1em',
    fontSize: '1em',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#45a049',
    },
}));

const VideoLiveStream = () => {
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const startStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); 
            setStream(stream);
            const peer = createPeer();
            stream.getTracks().forEach(track => peer.addTrack(track, stream));
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error starting stream:', error);
        }
    };

    const createPeer = () => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
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
            const { data } = await axios.post('http://localhost:8000/broadcast', payload); 
            const desc = new RTCSessionDescription(data.sdp);
            peer.setRemoteDescription(desc);
        } catch (error) {
            console.error('Error handling negotiation needed event:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Video Live Stream" />
            <Wrapper>
                <AppBar position="static">
                    <Typography variant="h6" align="center"> Streaming page</Typography>
                </AppBar>
                <Button onClick={startStream}>Start Stream</Button>
                <VideoContainer>
                    <VideoPlayer ref={videoRef} autoPlay />
                </VideoContainer>
            </Wrapper>
        </DefaultLayout>
    );
};

export default VideoLiveStream;
