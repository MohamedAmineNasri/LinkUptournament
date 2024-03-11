const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    TeamName: {
      type: String,
      require: "AcademyName is required !!",
    },
    TeamLogo: {
      type: String,
      require: "Logo is required !!",
    },
    Total_MatchesWon: {
      type: Number,
      default: 0
    },
    Total_MatchesLost: {
      type: Number,
      default: 0
    },
    Total_MatchesDrawn: {
      type: Number,
      default: 0
    },
    Total_MatchesPlayed: {
      type: Number,
      default: 0
    },
    Total_Goals_scored: {
      type: Number,
      default: 0
    },
    Total_Goals_received: {
      type: Number,
      default: 0
    },

    // Group stage data-------------------------------------------------------------------
    GS_MatchesWon: {
      type: Number,
      default: 0
    },
    GS_MatchesLost: {
      type: Number,
      default: 0
    },
    GS_MatchesDrawn: {
      type: Number,
      default: 0
    },
    GS_MatchesPlayed: {
      type: Number,
      default: 0
    },
    GS_Goals_scored: {
      type: Number,
      default: 0
    },
    GS_Goals_received: {
      type: Number,
      default: 0
    },
    GS_Goals_difference: {
      type: Number,
      default: 0
    },
    GS_Points: {
      type: Number,
      default: 0
    },
  },
);

module.exports = mongoose.model("team", TeamSchema);
