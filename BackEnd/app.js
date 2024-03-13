const express = require("express");
const cors = require("cors");

//-
var AcademyRouter = require('./Routes/Academy');
var TeamRouter = require('./Routes/Team');

const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");

const match= require("./Routes/match")
const app = express();


app.use(cors());
// i added the {limit: '50mb'} so i can upolad files larger than 100kb
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/tournement", tournementRouter);
app.use("/player", playerRouter);
app.use("/match",match)

//-
app.use('/academy', AcademyRouter);
app.use('/team', TeamRouter);

module.exports = app;
