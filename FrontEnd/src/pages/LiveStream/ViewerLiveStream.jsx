import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import Breadcrumb from "../../Dashboard/src/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { SocketContext } from "../Podcast/SocketContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Features/auth/authSlice";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { io } from "socket.io-client";
import styles from "../../pages/Chat/ChatStyle.module.css";
import EmojiPicker from "emoji-picker-react";

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

    return () => {};
  }, []);

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
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
        sdp: peer.localDescription,
      };

      const { data } = await axios.post(
        "http://localhost:8000/consumer",
        payload
      );
      const desc = new RTCSessionDescription(data.sdp);
      peer.setRemoteDescription(desc).catch((e) => console.log(e));
    } catch (error) {
      console.error("Error handling negotiation needed event:", error);
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
        const audioElement = document.createElement("audio");
        audioElement.srcObject = stream;
        audioElement.autoplay = true;
        audioElement.play();
      }
    }
  };

  const user = useSelector(selectCurrentUser);
  const userFullName = user ? `${user.firstName} ${user.lastName}!` : "Welcome";
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
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
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

  {
    /** yassine changes */
  }
  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
    recognition.lang = "en-US"; // Set language to English (United States)

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript; // Get the recognized speech
      setMessage(speechResult); // Update the message state with the recognized speech
    };

    recognition.start(); // Start speech recognition
  };
  {
    /** yassine changes */
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Stream" />

      <header style={{ padding: "0.75em 0" }}>
        <h1 style={{ fontSize: "1.75em" }}>Stream</h1>
      </header>

      <main style={{ display: "flex", flexDirection: "column" }}>
        <section
          className="video-section"
          style={{ position: "relative", flex: 1 }}
        >
          <video
            ref={videoRef}
            id="videoplayer"
            autoPlay
            muted
            style={{ width: "100%", border: "1px solid #E8E8E8" }}
          ></video>

          <div
            className="controls"
            style={{ position: "absolute", top: "0.5em", right: "1em" }}
          >
            <button
              id="sound"
              type="button"
              style={{
                backgroundColor: "#4CAF50",
                padding: "0.5em 1em",
                border: "1px solid #ccc",
              }}
            >
              Unmute
            </button>
          </div>
        </section>
        <section
          className="livechat"
          style={{ color: "#000", padding: "1em", flex: 1 }}
        >
          <h5 style={{ paddingTop: 0, marginTop: 0 }}>Chat Section :</h5>
          <div
            className="chatroomContent"
            style={{ height: "7em", overflowY: "scroll" }}
          >
            <ul
              id="message-list"
              style={{ paddingTop: "1px", listStyle: "none", paddingLeft: 0 }}
            >
              {messages.map((message, i) => (
                <li key={i} className="message" style={{ color: "red" }}>
                  <span
                    className={
                      userId === message.userId
                        ? styles.ownMessage
                        : styles.otherMessage
                    }
                  >
                    {message.name}:
                  </span>{" "}
                  {message.message}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="chat-input-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/**yassine changes */}
            <div
              className="relative"
              style={{
                flex: 3,
                marginBottom: 0,
                width: "100%",
                padding: "0.5em",
              }}
            >
              <input
                type="text"
                id="chat-input"
                placeholder="Say Something !!"
                value={message}
                style={{
                  flex: 3,
                  marginBottom: 0,
                  width: "100%",
                  padding: "0.5em",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="text-white absolute right-5  top-3 p-1  bg-[#4CAF50] rounded-md"
                onClick={handleSpeechRecognition}
              >
                speech
              </button>
            </div>
            {/**yassine changes */}
            <button
              className={styles.emojiButton}
              onClick={toggleEmojiPicker}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "0.5em 1em",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {showEmojiPicker ? "🙂" : "🙂"}
            </button>
            {showEmojiPicker && (
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                height={400}
                width="100%"
              />
            )}
            <button
              type="submit"
              style={{
                flex: 1,
                marginLeft: "1em",
                width: "100%",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "0.5em 1em",
                borderRadius: "5px",
              }}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default ViewerLiveStream;
