
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
    goal1:[{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    goal2:[{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    tournementId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournement'},
    card:[{player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},name:String,number:Number,yellow:Number,red:Number}],
    price:Number,
    ticketNumber:Number,
    ticketID:[Number],
    w:{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
   
});
module.exports = mongoose.model('match', match)
