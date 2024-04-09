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
    const userRole = user && user.roles;
    const userBio = user ? `Bio : ${user.bio}` : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.';
    console.log('role'+userRole)
    const [chatroomName, setChatroomName] = useState("");
    const [chatroomNameError, setChatroomNameError] = useState("");

    const setupSocket = () => {
      
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
                console.error(err);
                setTimeout(getChatrooms, 3000);
            });
    };

    const createChatroom = () => {
        if (validateChatroomName()) {
            axios
                .post(
                    "http://localhost:8000/chatroom",
                    { name: chatroomName }, 
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    getChatrooms();
                    setChatroomName("");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const validateChatroomName = () => {
        if (chatroomName.trim() === "") {
            setChatroomNameError("Chatroom name is required");
            return false;
        } else {
            setChatroomNameError("");
            return true;
        }
    };

    useEffect(() => {
        const socket = setupSocket();
        getChatrooms();
        return () => {
        };
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Chat" />
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', margin: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Chatrooms</div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }} htmlFor="chatroomName">Chatroom Name</label>
                    <input
                        type="text"
                        name="chatroomName"
                        id="chatroomName"
                        placeholder="Enter Chatroom Name"
                        value={chatroomName}
                        onChange={(e) => setChatroomName(e.target.value)}
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={createChatroom}>Create ChatRoom</button>
                    {chatroomNameError && <div style={{ color: 'red' }}>{chatroomNameError}</div>}
                </div>
                <div>
                    {chatrooms.map((chatroom) => (
                        <div key={chatroom._id} style={{ marginBottom: '10px' }}>
                            <div>{chatroom.name}</div>
                            <Link to={"/chatroom/" + chatroom._id} style={{ textDecoration: 'none' }}>
                                <div style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', textAlign: 'center' }}>Join</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>    
        </DefaultLayout>
    );
};

export default Chat;
