import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer/simplepeer.min.js';

const SocketContext = createContext();

const socket = io('http://localhost:8000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState({ cameraStream: null, screenStream: null });
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream((prevStream) => ({
          ...prevStream,
          cameraStream: currentStream,
        }));
        if (myVideo && myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream: stream.cameraStream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

const callUser = (id) => {
  const peer = new Peer({ initiator: true, trickle: false, stream: stream.cameraStream });

  peer.on('signal', (data) => {
    socket.emit('callUser', { userToCall: id, signalData: data, from: me, name, screenStream: stream.screenStream }); // Add screenStream
  });

  peer.on('stream', (currentStream) => {
    userVideo.current.srcObject = currentStream;
    if (currentStream.getVideoTracks().length === 0) {
      stream.screenStream = currentStream;
      socket.emit('shareScreen', currentStream); // Emit for sharing
    }
  });

  socket.on('callAccepted', (signal) => {
    setCallAccepted(true);

    peer.signal(signal);
  });

  connectionRef.current = peer;
};


  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      setStream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };