import React, { useContext } from 'react';
import { Grid, Typography, Paper, styled } from '@mui/material';
import { SocketContext } from './SocketContext';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from "../../../Features/auth/authSlice.js"; 

const StyledVideo = styled('video')(({ theme }) => ({
  width: '550px',
  [theme.breakpoints.down('xs')]: {
    width: '300px',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const user = useSelector(selectCurrentUser);


  return (
    <Grid container justifyContent="center">
      {stream && (
        <StyledPaper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <StyledVideo playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </StyledPaper>
      )}
      {callAccepted && !callEnded && (
        <StyledPaper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <StyledVideo playsInline ref={userVideo} autoPlay />
          </Grid>
        </StyledPaper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
