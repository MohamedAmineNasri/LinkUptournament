const mongoose = require("mongoose");


const TachievementSchema = new mongoose.Schema(
    {
    Team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    //   required: true
    },
    Achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
    //   required: true
    },
    Status: {
      type: String,
      enum: ["ACTIVE", "NOTACTIVE"],
      default: "NOTACTIVE"
    },
    
    // dateAchieved: {
    //   type: Date,
    //   default: null
    // },
  },
);
  
  module.exports = mongoose.model("tachievement", TachievementSchema);
  