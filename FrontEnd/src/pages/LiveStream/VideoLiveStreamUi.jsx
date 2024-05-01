import React, { useState, useRef, useEffect } from 'react';
import { Typography, AppBar, styled } from '@mui/material';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import axios from 'axios'; 
import { SocketContext } from '../Podcast/SocketContext'; 
import './ViewerLiveStreamUi.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { selectCurrentUser } from '../../../Features/auth/authSlice';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';


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
    background: `url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4efebd150179589.62f5014d9f4fa.gif') center/cover no-repeat`,
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

    const user = useSelector(selectCurrentUser);
        const userFullName = user ? `${user.firstName} ${user.lastName}!` : 'Welcome';
        const { id } = useParams();
        const [socket, setSocket] = useState(null);
        const [messages, setMessages] = useState([]);
        const [userId, setUserId] = useState("");
        const messageRef = useRef("");
        const [message, setMessage] = useState("");
        const [showEmojiPicker, setShowEmojiPicker] = useState(false);
        const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
        const setupSocket = () => {
        const newSocket = io("http://localhost:8000", {
            query: {
            token: localStorage.getItem("token"),
            userId: user.id,
            },
        });
        
        newSocket.on("connect", () => {
            console.log("Connected to socket");
        });
        
        newSocket.on("disconnect", () => {
            console.log("Disconnected from socket");
        });
        
        newSocket.on("newMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        
        newSocket.on("allMessages", (allMessages) => {
            setMessages(allMessages);
        });
        
        return newSocket;
        };
        
        const sendMessage = () => {
        const newMessage = {
            id,
            message,
            name: userFullName, 
            userId: user.id, 
        };
        console.log("Sending message:", newMessage);
        
        if (socket) {
            socket.emit("chatroomMessage", newMessage);
            setMessage(""); 
        }
    };
    

    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji); 
    };

        useEffect(() => {
        const newSocket = setupSocket();
        setSocket(newSocket);
        
        if (newSocket && user) {
            newSocket.emit("joinRoom", { id: id });
        }
        
        return () => {
            if (newSocket) {
            newSocket.disconnect();
            }
        };
        }, [user]);
        useEffect(() => {
        if (user) {
            setUserId(user.id);
        }
        }, [user]);

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
                <div className="chat-area" style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {messages.map((message, i) => (
        <div
            key={i}
            className={userId === message.userId ? "message-wrapper reverse" : "message-wrapper"}
        >
            <div className="profile-picture">
                <img
                    src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                    alt=""
                />
            </div>
            <div className="message-content">
                <p className="name">{message.name}</p>
                <div className="message">{message.message}</div>
            </div>
        </div>
    ))}
    {showEmojiPicker && (
            <div
                style={{
                    position: 'absolute',
                    top: 'calc(100% - 550px)', 
                    right: 0,
                    zIndex: 999,
                }}
            >
                <EmojiPicker onEmojiClick={handleEmojiClick} height={400} width="100%" />
            </div>
        )}
</div>





                <div className="chat-typing-area-wrapper">
                    <div className="chat-typing-area">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="chat-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="send-button" onClick={sendMessage}>
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
                        <button className="send-button" onClick={toggleEmojiPicker}>
                            {showEmojiPicker ? "🙂" : "🙂"}
                        </button>
                    
                    </div>
                </div>

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
