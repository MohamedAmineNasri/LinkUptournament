const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    require: "Logo is required !!",
  },
  type: {
    type: String,
    enum: ['Group Stage', 'Knockout' , 'Group stage and Knockout'],
    required: true
  },
  rules: {
    type: String,
   
   },  
   status: {
    type: String,
  
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  date_debut: {
    type: Date,
   required: true
  },
  date_fin: {
    type: Date,
   required: true
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }] ,
  winners: [{
    type: mongoose.Schema.Types.ObjectId,
  }] ,
  nbphase :{
    type: Number , 
  }
  
}, 
{ timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
