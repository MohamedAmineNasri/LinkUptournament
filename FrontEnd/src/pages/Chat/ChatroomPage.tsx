import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb.js';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout.js';
import CoverOne from '../../Dashboard/src/images/cover/cover-01.png';
import userSix from '../../Dashboard/src/images/user/user-06.png';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from "../../../Features/auth/authSlice.js"; 

import styles from './ChatStyle.module.css';

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const ChatroomPage = () => {
    const user = useSelector(selectCurrentUser);
    const userFullName = user ? `${user.firstName} ${user.lastName}!` : 'Welcome';
    const userRole = user ? `Role : ${user.roles}` : 'Welcome';
    const userBio = user ? `Bio : ${user.bio}` : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.';
    // console.log('user'+ user._id)
    // console.log('role'+ userRole)
    const { id } = useParams();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState("");
    const messageRef = useRef("");

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
      
      // Receive all previous messages when joining the chatroom
      newSocket.on("allMessages", (allMessages) => {
        setMessages(allMessages);
      });
    
      return newSocket;
    };
    
    // Function to send message
    const sendMessage = () => {
      const newMessage = {
        id,
        message: messageRef.current.value,
        name: userFullName, // Include the sender's name
        userId: user.id, // Include the sender's ID
      };
      console.log("Sending message:", newMessage);
      
      if (socket) {
        socket.emit("chatroomMessage", newMessage);
        messageRef.current.value = "";
      }
    };
  
    useEffect(() => {
      const newSocket = setupSocket();
      setSocket(newSocket);
    
      // Emit joinRoom event when the socket is connected and the user ID is available
      if (newSocket && user) {
        newSocket.emit("joinRoom", { id: id });
      }
    
      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }, [user]); // Add user as a dependency to re-run the effect when user changes
    

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Chat" />
        <div className={styles.chatroomPage}>
          <div className={styles.chatroomSection}>
            <div className={styles.cardHeader}>Chatroom Name</div>
            <div className="chatroomContent">
              {messages.map((message, i) => (
                <div key={i} className="message">
                  <span
                    className={
                      userId === message.userId ? styles.ownMessage : styles.otherMessage
                    }
                  >
                    {message.name}
                  </span>{" "}
                  {message.message}
                </div>
              ))}
            </div>
            <div className={styles.chatroomActions}>
              <div>
                <input
                  type="text"
                  name="message"
                  placeholder="Say Something !!"
                  ref={messageRef}
                />
              </div>
              <div>
                <button className={styles.join} onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
};

export default ChatroomPage;