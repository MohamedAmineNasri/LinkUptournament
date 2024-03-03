const express = require("express");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');
const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");
// const teamRouter = require("./Routes/teamRouter");
const match= require("./Routes/match")
const app = express();

const cookieParser = require('cookie-parser')

app.use(express.json());
app.use("/tournement", tournementRouter);
app.use("/player", playerRouter);
// app.use("/team", teamRouter);
app.use("/match",match)


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
