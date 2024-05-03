import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb.js';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../../../Features/auth/authSlice.js"; 
import styles from './ChatStyle.module.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { TextField, Button, Typography, Container, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import Challenges from './challenge.js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
    const [activeTab, setActiveTab] = useState('Ongoing');
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
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

    // State for opening and closing the form dialog
    const [openDialog, setOpenDialog] = useState(false);


    // Function to handle opening the form dialog
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    // Function to handle closing the form dialog
    const handleClose = () => {
        setOpenDialog(false);
    };

    // Function to handle creating a new chatroom
    const handleCreateChatroom = () => {
        // if (validateChatroomName()) {
        //     // Implement your logic to create a new chatroom here
        //     console.log("Creating chatroom:", chatroomName);
        //     // Reset the chatroom name field and close the dialog
        //     setChatroomName("");
        //     handleClose();
        // }
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
                setChatroomName("");
                handleClose();
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <DefaultLayout>

                <main className="flex-grow container mx-auto space-y-12">
                    <div >
                        <div className="px-4 md:px-8">
                            <h1 className="text-3xl font-bold text-left mb-6 mb-1.5 text-2xl font-semibold text-black dark:text-white">Browse ChatRooms :</h1>
                        </div>
                    </div>
                    {/*search */}
                    {userRole.includes('Admin') && (
                    <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
                        <div className="relative shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                                <div className="w-full md:w-1/2">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <svg aria-hidden="true"
                                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="simple-search"
                                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Search"
                                                value={searchQuery}
                                                onChange={handleSearchInputChange}
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>

                                <div className="flex items-center mb-4">
                                <Button
                                    onClick={handleClickOpen}
                                    style={{ backgroundColor: '#007bff', color: 'white' }} // Inline style for background color
                                    className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create ChatRoom
                                </Button>
                            </div>
                    
                            </div>
                        </div>
                    </div>
                    )}
                    {/* Tabs */}
                    <div>
                        <div className="flex space-x-4 mb-4">
                        </div>

                        <div>
                    {activeTab === 'Ongoing' && <div><h1 className="text-xl font-bold my-4"></h1> <Challenges status="Ongoing"  searchQuery={searchQuery}/></div>}
                            {activeTab === 'Completed' && <div><h1 className="text-xl font-bold my-4">Completed Challenges</h1> <Challenges status="Completed" /></div>}
                            {activeTab === 'Upcoming' && <div><h1 className="text-xl font-bold my-4">Upcoming Challenges</h1> <Challenges status="Upcoming" /></div>}
                        </div>
                    </div>

        

                    <div className="mx-auto max-w-screen-2xl py-12 px-4 md:px-8">
                        
                        {/* Render other content here */}
                    </div>

                </main> 
                <Dialog open={openDialog} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#262a42' } }}>
                <DialogTitle>Create New Chatroom</DialogTitle>
                <DialogContent>
                <DialogContentText style={{ color: 'white' }}>
                Enter the name for the new chatroom :
                </DialogContentText>

                    <TextField
                    autoFocus
                    margin="dense"
                    id="chatroomName"
                    label="Chatroom Name"
                    type="text"
                    fullWidth
                    value={chatroomName}
                    onChange={(e) => setChatroomName(e.target.value)}
                    error={!!chatroomNameError}
                    helperText={chatroomNameError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateChatroom} variant="contained" color="primary">Create</Button>
                </DialogActions>
                </Dialog>

        </DefaultLayout>
    );
};

export default Chat;