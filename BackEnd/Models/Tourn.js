const mongoose = require("mongoose");

const tournSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
    },
  ],
  bracketStages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BracketStage",
    },
  ],
  numGroups: {
    type: Number,
    default: 1,
  },
  numTeamsPerGroup: {
    type: Number,
    default: 4,
  },
  numTeams: {
    type: Number,
    default: 16,
  },
  // Add more fields as needed
});

const Tourn = mongoose.model("Tourn", tournSchema);

module.exports = Tourn;
