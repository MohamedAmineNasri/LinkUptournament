import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb.js';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout.js';
import CoverOne from '../../Dashboard/src/images/cover/cover-01.png';
import userSix from '../../Dashboard/src/images/user/user-06.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from "../../../Features/auth/authSlice.js"; 

import styles from './ChatStyle.module.css';
import { useEffect, useState } from 'react';
import axios from "axios";



const Chat = () => {
    const user = useSelector(selectCurrentUser);
    const userFullName = user ? `${user.firstName} ${user.lastName}!` : 'Welcome';
    const userRole = user ? `Role : ${user.roles}` : 'Welcome';
    const userBio = user ? `Bio : ${user.bio}` : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.';
    // console.log('user'+ user)
    // console.log('role'+ userRole)
    const [chatroomName, setChatroomName] = useState("");

    const setupSocket = () => {
        // Implement your socket setup logic here
        // For example:
        // const socket = io('http://localhost:8000');
        // socket.on('connect', () => console.log('Connected to socket'));
        // return socket;
    };

    const [chatrooms, setChatrooms] = useState([]);
    const getChatrooms = () => {
        axios
            .get("http://localhost:8000/chatroom", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setChatrooms(response.data);
            })
            .catch((err) => {
                // Properly handle errors here
                console.error(err);

                // Use setTimeout correctly
                setTimeout(getChatrooms, 3000);
            });
    };

    const createChatroom = () => {
        // Send a POST request to the server to create a new chatroom
        axios
          .post(
            "http://localhost:8000/chatroom",
            { name: chatroomName }, // Pass the chatroom name in the request body
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            // If chatroom creation is successful, fetch the updated chatroom list
            getChatrooms();
            // Reset the chatroom name input
            setChatroomName("");
          })
          .catch((err) => {
            // Properly handle errors here
            console.error(err);
          });
      };

    useEffect(() => {
        // Call setupSocket here
        const socket = setupSocket();
        getChatrooms();

        // Cleanup function to close socket on component unmount
        return () => {
            // Close socket connection here if needed
        };
    }, []);

return (
    <DefaultLayout>
    <Breadcrumb pageName="Chat" />
    <div className={styles.card}>
            <div className={styles.cardHeader}>Chatrooms</div>
            <div className={styles.cardBody}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel} htmlFor="chatroomName">Chatroom Name</label>
                    <input
                        type="text"
                        className={styles.inputField}
                        name="chatroomName"
                        id="chatroomName"
                        placeholder="Enter Chatroom Name"
                        onChange={(e) => setChatroomName(e.target.value)}
                    />
                </div>
                <button className={styles.chatButton} onClick={createChatroom}>Create ChatRoom</button>

            </div>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className={styles.joinLink}>Join</div>
            </Link>

          </div>
        ))}
      </div>
    </div>

    </DefaultLayout>
);
};

export default Chat;
