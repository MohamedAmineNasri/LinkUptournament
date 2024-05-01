const mongoose = require("mongoose");

const AchievementsSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: "Name is required !!",
      unique: true
    },
    Description: {
      type: String,
      require: "Description is required !!",
    },
    Icon: {
      type: String,  
    },
    Type: {
      type: String,
            enum: [
                "TOURNEMENT_RANK_1",
                "TOURNEMENT_RANK_2",
                "TOURNEMENT_RANK_3",
                "GAME",
                "GOAL",
                "WIN",
                "LOSE",
                "DRAW",
            ],
      require : "type required !"
    },
    MileStone: {
      type: Number,
      default: 0
    },
    Reward: {
      type: String,
            enum: [
                "NOTHING",
                "DISCOUNT_10%",
                "DISCOUNT_20%",
                "DISCOUNT_30%",
            ],
      default: "NOTHING"
    },
    // Status: {
    //   type: [String],
    //         enum: [
    //             "ACTIVE",
    //             "NOTACTIVE",
    //         ],
    //   default: 'NOTACTIVE'
    // },
  },
);

module.exports = mongoose.model("Achievements", AchievementsSchema);