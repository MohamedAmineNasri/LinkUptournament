import React, { useState, useRef, useEffect } from 'react';
import { Typography, AppBar, styled } from '@mui/material';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import axios from 'axios'; // Import axios
import { SocketContext } from '../Podcast/SocketContext'; // Import SocketContext

const Wrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  
    '& .MuiAppBar-root': {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
}));

const VideoLiveStream = () => {
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const startStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // Update constraints
            setStream(stream);
            const peer = createPeer();
            stream.getTracks().forEach(track => peer.addTrack(track, stream));
            // Set srcObject after the stream is obtained
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
            const { data } = await axios.post('http://localhost:8000/broadcast', payload); // Update URL
            const desc = new RTCSessionDescription(data.sdp);
            peer.setRemoteDescription(desc);
        } catch (error) {
            console.error('Error handling negotiation needed event:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="" />
            <Wrapper>
                <AppBar position="static">
                    <Typography variant="h6" align="center"> Streaming page</Typography>
                </AppBar>
                <button onClick={startStream}>Start Stream</button>
                <video ref={videoRef} autoPlay />
            </Wrapper>
        </DefaultLayout>
    );
};

export default VideoLiveStream;
