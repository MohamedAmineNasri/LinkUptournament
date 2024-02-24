const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String },
    winning_maches: { type: Number },
    losing_lost: { type: Number },
    drawn_maches: { type: Number },
    total_matches_played: { type: Number },
    goals_scored: { type: Number },
    goals_conceded: { type: Number },
    goals_difference: { type: Number },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
