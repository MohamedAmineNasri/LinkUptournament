
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var match = new Schema({
    // matchTime :Number,
    date: String,
    referee:String,
    tournamentName: String,
    startingtime: String,   
    logo:String,     
    extratime:Number,    
    matchstatus:String,
    location:String,
    matchtype: String,
    weathercondition: String,
    team1:{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    team2:{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    team1Gols:Number,
    team2Gols:Number,
    tournementId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournement'},
    card:[{player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},name:String,number:Number,yellow:Number,red:Number}],
   
});
module.exports = mongoose.model('match', match)
