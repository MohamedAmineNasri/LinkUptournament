import React, { useState, useRef, useEffect } from 'react';
import { Typography, AppBar, styled } from '@mui/material';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import axios from 'axios'; 
import { SocketContext } from '../Podcast/SocketContext'; 
import './ViewerLiveStreamUi.css'

const Wrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
}));

const VideoContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%', // Set the height to 100%
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


const VideoLiveStreamUi = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [rightSideVisible, setRightSideVisible] = useState(false);
    
    // Toggle dark mode
    const toggleDarkMode = () => {
        console.log("ddd")
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };
    
    // Close right side panel
    const closeRightSide = () => {
        setRightSideVisible(false);
    };
    
    // Expand right side panel
    const expandRightSide = () => {
        setRightSideVisible(true);
    };

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
        <div>
        {/* <Breadcrumb pageName="Stream" /> */}
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <button className="mode-switch" onClick={toggleDarkMode}>
            <svg
                className="sun"
                fill="none"
                stroke="#fbb046"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
                viewBox="0 0 24 24"
            >

                <defs />
                <circle cx="12" cy="12" r="5" />
                <path
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
                </svg>

                <svg
                    className="moon"
                    fill="none"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <defs />
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            </button>
           
            <div className="app-main">
                <div className="video-call-wrapper">
                    {/* <div className="video-participant">
                        <div className="participant-action">
                        <button className="btn-mute"></button>
                        <button className="btn-camera"></button>
                        </div>
                        <a href="#" className="name-tag">Andy Will</a>
                        <img
                        src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt="participant"
                        />
                    </div>
                    <div className="video-participant">
                        <div className="participant-action">
                        <button className="btn-mute"></button>
                        <button className="btn-camera"></button>
                        </div>
                        <a href="#" className="name-tag">Emmy Lou</a>
                        <img
                        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        alt="participant"
                        />
                    </div>
                    <div className="video-participant">
                        <div className="participant-action">
                        <button className="btn-mute"></button>
                        <button className="btn-camera"></button>
                        </div>
                        <a href="#" className="name-tag">Tim Russel</a>
                        <img
                        src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                        alt="participant"
                        />
                    </div>
                    <div className="video-participant">
                        <div className="participant-action">
                        <button className="btn-mute"></button>
                        <button className="btn-camera"></button>
                        </div>
                        <a href="#" className="name-tag">Jessica Bell</a>
                        <img
                        src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
                        alt="participant"
                        />
                    </div>
                    <div className="video-participant">
                        <div className="participant-action">
                        <button className="btn-mute"></button>
                        <button className="btn-camera"></button>
                        </div>
                        <a href="#" className="name-tag">Ryan Patrick</a>
                        <img
                        src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                        alt="participant"
                        />
                    </div>
                    <div className="video-participant">
                        <div className="participant-action">
                        <button className="btn-mute"></button>
                        <button className="btn-camera"></button>
                        </div>
                        <a href="#" className="name-tag">Tina Cate</a>
                        <img
                        src="https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                        alt="participant"
                        />
                    </div> */}
                <VideoContainer>
                    <VideoPlayer ref={videoRef} autoPlay />
                </VideoContainer>
                </div>

                <div className="video-call-actions">
                <button className="video-action-button mic"></button>
                <button className="video-action-button camera"></button>
                <button className="video-action-button maximize"></button>
                <button className="video-action-button endcall" onClick={startStream}>Start</button>
                <button className="video-action-button endcall">Leave</button>
                <button className="video-action-button magnifier">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                    className="feather feather-zoom-in"
                    viewBox="0 0 24 24"
                    >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>

                    <span>100%</span>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                    className="feather feather-zoom-out"
                    >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </button>
                </div>
            </div>

            <div className={`right-side ${rightSideVisible ? 'show' : ''}`}>
            <button className="btn-close-right" onClick={closeRightSide}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                    className="feather feather-x-circle"
                    viewBox="0 0 24 24"
                >
                    <defs></defs>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M15 9l-6 6M9 9l6 6"></path>
                </svg>
                </button>
                <div className="chat-container">
                <div className="chat-header">
                    <button className="chat-header-button">Live Chat</button>
                </div>
                <div className="chat-area">
                    <div className="message-wrapper">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Ryan Patrick</p>
                        <div className="message">Helloo team!😍</div>
                    </div>
                    </div>
                    <div className="message-wrapper">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Andy Will</p>
                        <div className="message">
                        Hello! Can you hear me?🤯 <a className="mention">@ryanpatrick</a>
                        </div>
                    </div>
                    </div>
                    <div className="message-wrapper">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Jessica Bell</p>
                        <div className="message">Hi team! Let's get started it.</div>
                    </div>
                    </div>
                    <div className="message-wrapper reverse">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Emmy Lou</p>
                        <div className="message">Good morning!🌈</div>
                    </div>
                    </div>
                    <div className="message-wrapper">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Tim Russel</p>
                        <div className="message">New design document⬇️</div>
                        <div className="message-file">
                        <div className="icon sketch">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            >
                            <path
                                fill="#ffd54f"
                                d="M96 191.02v-144l160-30.04 160 30.04v144z"
                            />
                            <path
                                fill="#ffecb3"
                                d="M96 191.02L256 16.98l160 174.04z"
                            />
                            <path fill="#ffa000" d="M0 191.02l256 304 256-304z" />
                            <path fill="#ffca28" d="M96 191.02l160 304 160-304z" />
                            <g fill="#ffc107">
                                <path d="M0 191.02l96-144v144zM416 47.02v144h96z" />
                            </g>
                            </svg>
                        </div>
                        <div className="file-info">
                            <div className="file-name">NewYear.sketch</div>
                            <div className="file-size">120 MB</div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="message-wrapper">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Ryan Patrick</p>
                        <div className="message">Hi team!❤️</div>
                        <div className="message">
                        I downloaded the file <a className="mention">@timrussel</a>
                        </div>
                    </div>
                    </div>

                    <div className="message-wrapper reverse">
                    <div className="profile-picture">
                        <img
                        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        alt=""
                        />
                    </div>
                    <div className="message-content">
                        <p className="name">Emmy Lou</p>
                        <div className="message">Woooww! Awesome❤️</div>
                    </div>
                    </div>
                </div>
                <div className="chat-typing-area-wrapper">
                    <div className="chat-typing-area">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="chat-input"
                    />
                    <button className="send-button">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2"
                        className="feather feather-send"
                        viewBox="0 0 24 24"
                        >
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                    </div>
                </div>
                </div>
                <div className="participants">
                <div className="participant profile-picture">
                    <img
                    src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                    alt=""
                    />
                </div>
                <div className="participant profile-picture">
                    <img
                    src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt=""
                    />
                </div>
                <div className="participant profile-picture">
                    <img
                    src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
                    alt=""
                    />
                </div>
                <div className="participant profile-picture">
                    <img
                    src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                    alt=""
                    />
                </div>
                <div className="participant-more">2+</div>
                </div>
            </div>
            <button className="expand-btn" onClick={expandRightSide}>
                <svg
                xmlns="http://www.w3.org/2000/svg"  
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
                className="feather feather-message-circle"
                >
                <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                />
                </svg>
            </button>
            </div>
            
        </div>
        </DefaultLayout>
    );
};

export default VideoLiveStreamUi;
