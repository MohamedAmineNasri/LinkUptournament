const express = require("express");
const cors = require("cors");

const app = express();



const groupRoutes = require('./Routes/Group');
const staduimRoutes = require('./Routes/Staduim');
const tournamentRoutes = require('./Routes/Tournament');
const teamRoutes = require('./Routes/Team')


app.use(cors());
app.use(express.json());

app.use('/group', groupRoutes);
app.use('/staduim', staduimRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/team',teamRoutes); 
 


module.exports = app;
