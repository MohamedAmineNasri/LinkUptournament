  import React from 'react';
  import { Typography, AppBar, styled } from '@mui/material';
  import VideoPlayer from './VideoPlayer';
  import Options from './Options';
  import Notifications from './Notifications';
  import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
  import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
  import { useSelector } from 'react-redux';
  import { selectCurrentToken, selectCurrentUser } from "../../../Features/auth/authSlice.js"; 


  const Wrapper = styled('div')(({ theme }) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    
      '& .MuiAppBar-root': {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',
        [theme.breakpoints.down('xs')]: {
          width: '90%',
        },
      },
    }));

  const VideoPodcast = () => {
      const user = useSelector(selectCurrentUser);
      const userFullName = user ? `${user.firstName} ${user.lastName}!` : 'Welcome';
      const userRole = user ? `Role : ${user.roles}` : 'Welcome';
      const userBio = user ? `Bio : ${user.bio}` : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.';
      console.log('user'+ user)
      console.log('role'+ userRole)
  return (
      <DefaultLayout>
      <Breadcrumb pageName="VideoPodcast" />
      <Wrapper>
        <AppBar position='static' color='inherit'>
          <Typography variant='h2' align='center'>Video Chat</Typography>
        </AppBar>
        <VideoPlayer />
        <Options >
          <Notifications />
        </Options>
      </Wrapper>
    </DefaultLayout>
  );
  };

  export default VideoPodcast;
