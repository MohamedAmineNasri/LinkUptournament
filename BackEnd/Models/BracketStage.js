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
