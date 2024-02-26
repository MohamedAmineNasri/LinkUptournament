const express = require("express");
const cors = require("cors");

//-
var AcademyRouter = require('./Routes/Academy');
var TeamRouter = require('./Routes/Team');

const app = express();


app.use(express.json());
app.use(cors());

//-
app.use('/academy', AcademyRouter);
app.use('/team', TeamRouter);

module.exports = app;
