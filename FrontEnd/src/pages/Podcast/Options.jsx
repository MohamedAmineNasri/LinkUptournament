import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, TextField, Grid, Typography, Paper, Container } from '@mui/material';
import { Assignment, Phone, PhoneDisabled, StopScreenShare, ScreenShare } from '@mui/icons-material';
import { SocketContext } from './SocketContext';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../Features/auth/authSlice';

const Options = ({ children }) => {
  const { me, callAccepted, setName, callEnded, leaveCall, callUser, setStream } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const user = useSelector(selectCurrentUser);
  const defaultName = `${user.firstName} ${user.lastName}`;
  const [screenSharing, setScreenSharing] = useState(false);

  const handleScreenShare = async () => {
    setScreenSharing(!screenSharing);
    if (screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia();
        setStream(prevStream => ({
          ...prevStream,
          screenStream: screenStream,
        }));
        callUser(idToCall, screenStream); // Call with screenStream
      } catch (error) {
        console.error('Error getting screen stream:', error);
        // Handle permission errors or other issues
      }
    } else {
      // Stop sharing screen
      setStream(prevStream => ({
        ...prevStream,
        screenStream: null,
      }));
      // Restore the original camera stream (implementation needed)
    }
  };

  return (
    <Container maxWidth="md" style={{ width: '600px', margin: '35px 0', padding: 0 }}>
      <Paper elevation={3} style={{ padding: '10px 20px', border: '2px solid black' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h6">Account Info</Typography>
            <TextField label="Name" value={defaultName} onChange={e => setName(e.target.value)} fullWidth />
            <CopyToClipboard text={me}>
              <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                Copy Your ID
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h6">Make a Call</Typography>
            <TextField label="ID to call" value={idToCall} onChange={e => setIdToCall(e.target.value)} fullWidth />
            {/* <Button
              variant="contained"
              color={screenSharing ? 'secondary' : 'primary'}
              fullWidth
              onClick={handleScreenShare}
              startIcon={screenSharing ? <StopScreenShare fontSize="large" /> : <ScreenShare fontSize="large" />}
            >
              {screenSharing ? 'Stop Sharing' : 'Share Screen'}
            </Button> */}
            {callAccepted && !callEnded ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth
                onClick={leaveCall}
              >
                Hang Up
              </Button>
            ) : (
              <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                Call
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
      {children}
    </Container>
  );
};

export default Options;