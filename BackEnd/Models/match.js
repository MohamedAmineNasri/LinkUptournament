
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var match = new Schema({
    date: String,
    referee:String,
    tournamentName: String,
    startingTime: String,   
        
    card:[{player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},name:String,number:Number,yellow:Number,red:Number}],
    extraTime:Number,    
    matchStatus:String,
    location:String,
    matchType: String,
    weatherCondition: String,
    team1:{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    team2:{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    team1Gols:Number,
    team2Gols:Number,
    tournementId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournement'},
   
});
module.exports = mongoose.model('match', match)
