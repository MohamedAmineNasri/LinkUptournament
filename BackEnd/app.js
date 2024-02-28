const express = require("express");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');
const app = express();

const cookieParser = require('cookie-parser')


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
