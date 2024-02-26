const express = require("express");
const cors = require("cors");

const app = express();

const cookieParser = require('cookie-parser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlleware for cookies 
app.use(cookieParser())

// Bring in the models
require("./Models/Users");

// Bring in the routes
app.use("/user", require("./Routes/user"));

module.exports = app;
