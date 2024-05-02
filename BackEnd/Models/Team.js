const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  avatar: String,
  TeamName: {
    type: String,
    require: "AcademyName is required !!",
    unique: true,
  },
  TeamLogo: {
    type: String,
    require: "Logo is required !!",
  },
  Total_MatchesWon: {
    type: Number,
    default: 0,
  },
  Total_MatchesLost: {
    type: Number,
    default: 0,
  },
  Total_MatchesDrawn: {
    type: Number,
    default: 0,
  },
  Total_MatchesPlayed: {
    type: Number,
    default: 0,
  },
  Total_Goals_scored: {
    type: Number,
    default: 0,
  },
  Total_Goals_received: {
    type: Number,
    default: 0,
  },
  Total_Tournement_win_1: {
    type: Number,
    default: 0,
  },
  Total_Tournement_second_2: {
    type: Number,
    default: 0,
  },
  Total_Tournement_third_3: {
    type: Number,
    default: 0,
  },
  academy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Academy",
    // required: true
  },
  Players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  Achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tachievement",
    },
  ],

  // Group stage data-------------------------------------------------------------------
  GS_MatchesWon: {
    type: Number,
    default: 0,
  },
  GS_MatchesLost: {
    type: Number,
    default: 0,
  },
  GS_MatchesDrawn: {
    type: Number,
    default: 0,
  },
  GS_MatchesPlayed: {
    type: Number,
    default: 0,
  },
  GS_Goals_scored: {
    type: Number,
    default: 0,
  },
  GS_Goals_received: {
    type: Number,
    default: 0,
  },
  GS_Goals_difference: {
    type: Number,
    default: 0,
  },
  GS_Points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("team", TeamSchema);
