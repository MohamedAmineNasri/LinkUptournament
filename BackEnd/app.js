const express = require("express");
const cors = require("cors");
const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");
const teamRouter = require("./Routes/Team");
const match= require("./Routes/match")
const app = express();

app.use(cors());

app.use(express.json());
app.use("/tournement", tournementRouter);
app.use("/player", playerRouter);
app.use("/team", teamRouter);
app.use("/match",match)


module.exports = app;
