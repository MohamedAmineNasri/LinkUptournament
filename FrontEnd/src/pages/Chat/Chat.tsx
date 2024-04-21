import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb.js';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../../../Features/auth/authSlice.js"; 
import styles from './ChatStyle.module.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { TextField, Button, Typography, Container, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';

const defaultImages = [
    "https://media.gettyimages.com/id/517395905/fr/photo/stade-de-football.jpg?s=2048x2048&w=gi&k=20&c=NxVUwJ0zEeApcUGjS8_PZ3i--ULs-1wMb8L59EoGvpU=",
];

const Chat = () => {
    const user = useSelector(selectCurrentUser);
    const userFullName = user ? `${user.firstName} ${user.lastName}!` : 'Welcome';
    const userRole = user && user.roles;
    const userBio = user ? `Bio : ${user.bio}` : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.';

    const [chatroomName, setChatroomName] = useState("");
    const [chatroomNameError, setChatroomNameError] = useState("");
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
        getChatrooms();
    }, []);

    return (
        <DefaultLayout>
            <Container maxWidth="lg">
                <Breadcrumb pageName="Chat" />
                <Typography variant="h4" style={{ marginBottom: '20px' }}>Chatrooms</Typography>
                {userRole.includes('Admin') && (
                    <Card variant="outlined" style={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>Create New Chatroom</Typography>
                            <TextField
                                fullWidth
                                type="text"
                                name="chatroomName"
                                id="chatroomName"
                                label="Enter Chatroom Name"
                                variant="outlined"
                                value={chatroomName}
                                onChange={(e) => setChatroomName(e.target.value)}
                                error={!!chatroomNameError}
                                helperText={chatroomNameError}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                onClick={createChatroom}
                                style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px' }}
                            >
                                Create
                            </Button>
                        </CardActions>
                    </Card>
                )}

                <Grid container spacing={2}>
                    {chatrooms.map((chatroom, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={chatroom._id}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={defaultImages[index % defaultImages.length]} // Select image based on index
                                    alt="Default Image"
                                />
                                <CardContent>
                                    <Typography variant="h6">{chatroom.name}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={"/chatroom/" + chatroom._id} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px' }}
                                        >
                                            Join
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </DefaultLayout>
    );
};

export default Chat;
