const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var match = new Schema({
    Date: Date,
    startingTime: String,
    matchType: String,
    weatherCondition: String,
    score: [Number],    
    injuries:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',}],
    card:{playername:String,playernumber:Number,red:Number,yellow:Number},
    extraTime:Number,
    matchStatus:String,
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        // required: true
      },
      team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        // required: true
      }
});
module.exports = mongoose.model('match', match)