const express = require("express");
const cors = require("cors");

const app = express();



const groupRoutes = require('./Routes/Group');
const staduimRoutes = require('./Routes/Staduim');


app.use(cors());
app.use(express.json());

app.use('/group', groupRoutes);
app.use('/staduim', staduimRoutes);
 


module.exports = app;
