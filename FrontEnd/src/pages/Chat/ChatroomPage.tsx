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

import EmojiPicker from 'emoji-picker-react';


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
    const [message, setMessage] = useState("");
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
                    {message.name } :
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
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={styles.inputField}
                            />
                            <EmojiPicker onEmojiClick={handleEmojiClick} height={400} width={300}/>
              </div>
              <div>
                <button className={styles.sendButton} onClick={sendMessage}>
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