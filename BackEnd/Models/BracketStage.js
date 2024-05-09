const mongoose = require("mongoose");

const bracketStageSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourn",
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  scores: {
    type: [Number], // Define scores as an array of numbers
    default: [], // Default value is an empty array
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
    },
  ],
  // Add more fields as needed
});

const BracketStage = mongoose.model("BracketStage", bracketStageSchema);

module.exports = BracketStage;
