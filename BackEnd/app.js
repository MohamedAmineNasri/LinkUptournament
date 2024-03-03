const express = require("express");
const cors = require("cors");

//-
var AcademyRouter = require('./Routes/Academy');
var TeamRouter = require('./Routes/Team');

const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");

const match= require("./Routes/match")
const app = express();


app.use(express.json());
app.use(cors());


app.use("/tournement", tournementRouter);
app.use("/player", playerRouter);
app.use("/match",match)

//-
app.use('/academy', AcademyRouter);
app.use('/team', TeamRouter);

module.exports = app;
