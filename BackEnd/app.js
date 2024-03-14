const express = require("express");
const cors = require("cors");
<<<<<<< HEAD

//-
var AcademyRouter = require('./Routes/Academy');
var TeamRouter = require('./Routes/Team');

const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");

const match= require("./Routes/match")
const app = express();

=======
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');
const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");
// const teamRouter = require("./Routes/teamRouter");
const match= require("./Routes/match")
const app = express();

const cookieParser = require('cookie-parser')
>>>>>>> ee6edd1077311b46c19fc873f0e321e7dc5b70a9

app.use(cors());
// i added the {limit: '50mb'} so i can upolad files larger than 100kb
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/tournement", tournementRouter);
app.use("/player", playerRouter);
<<<<<<< HEAD
=======
// app.use("/team", teamRouter);
>>>>>>> ee6edd1077311b46c19fc873f0e321e7dc5b70a9
app.use("/match",match)

//-
app.use('/academy', AcademyRouter);
app.use('/team', TeamRouter);

// Handle options credentials check - before CORS! 
// and fetch cookies credentials requirement
app.use(credentials); 

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlleware for cookies 
app.use(cookieParser())

// Bring in the models
require("./Models/Users");

// Bring in the routes
app.use("/user", require("./Routes/user"));

module.exports = app;
