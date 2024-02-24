const express = require("express");
const cors = require("cors");
const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/tournement", tournementRouter);
app.use("/player", playerRouter);

module.exports = app;
