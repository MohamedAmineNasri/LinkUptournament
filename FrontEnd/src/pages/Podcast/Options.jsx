import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, TextField, Grid, Typography, Paper, styled, Container } from '@mui/material';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { SocketContext } from './SocketContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('xs')]: {
    width: '80%',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px 20px',
  border: '2px solid black',
}));

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <StyledContainer>
      <StyledPaper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Make a Call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Options;
