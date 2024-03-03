const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var match = new Schema({
    Date: Date,
    startingTime: String,
    matchType: String,
    weatherCondition: String,
    score: [Number],    
    injuries:[{playername:String,playernumber:Number}],
    card:{playername:String,playernumber:Number,red:Number,yellow:Number},
    extraTime:Number,
    matchStatus:String
});
module.exports = mongoose.model('match', match)