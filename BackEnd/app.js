const express = require("express");
const cors = require("cors");

//-
var AcademyRouter = require('./Routes/Academy');
var TeamRouter = require('./Routes/Team');
const groupRoutes = require('./Routes/Group');
const staduimRoutes = require('./Routes/Staduim');
const tournamentRoutes = require('./Routes/Tournament');
const match= require("./Routes/match")
var AchievementRouter = require('./Routes/Achievement');




const app = express();

const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');
// const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");
const chatroomRouter = require("./Routes/chatroom");
const webrtc = require("wrtc");
const bodyParser = require("body-parser");









// app.use(cors());
// app.use(express.json());






const cookieParser = require('cookie-parser')

// i added the {limit: '50mb'} so i can upolad files larger than 100kb
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// app.use("/tournement", tournementRouter);

// Handle options credentials check - before CORS! 
// and fetch cookies credentials requirement
// Handle options credentials check - before CORS! 
// and fetch cookies credentials requirement
app.use(credentials); 

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors(corsOptions));





// app.use(credentials); 

// Cross Origin Resource Sharing
//  app.use(cors(corsOptions));
// app.use("/tournement", tournementRouter);
// app.use("/team", teamRouter);



// Handle options credentials check - before CORS! 
// and fetch cookies credentials requirement
// app.use(credentials); 
// app.use(cors(corsOptions));
// Cross Origin Resource Sharing



// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlleware for cookies 
app.use(cookieParser())

// Bring in the models
require("./Models/Users");
require("./Models/Chatroom");

// Bring in the routes :

// Users Route :
app.use("/user", require("./Routes/user"));
app.use("/chatroom", require("./Routes/chatroom"));


app.use("/player", playerRouter);


app.use('/group', groupRoutes);
app.use('/staduim', staduimRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/team', TeamRouter);   
app.use("/match",match)
app.use('/academy', AcademyRouter);
app.use('/achievement', AchievementRouter);



// WebRTC endpoints
app.post("/consumer", async (req, res) => {
    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    const desc = new webrtc.RTCSessionDescription(req.body.sdp);
    await peer.setRemoteDescription(desc);
    senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    } 

    res.json(payload);
});

app.post('/broadcast', async (req, res) => { 
    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(req.body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }

    res.json(payload);
});


function handleTrackEvent(e, peer) {
    senderStream = e.streams[0];
}


module.exports = app;
