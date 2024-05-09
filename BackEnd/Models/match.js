const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var match = new Schema({
  matchTime: Number,
  round: Number,
  matchOrder: Number,
  date: String,
  referee: String,
  tournamentName: String,
  startingtime: String,
  logo: String,
  extratime: Number,
  matchstatus: String,
  location: String,
  matchtype: {
    type: String,
    required: true,
  },
  weathercondition: String,
  team1: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
  team1Gols: Number,
  team2Gols: Number,
  goal1: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  team1goaltime: [Number],
  team2goaltime: [Number],
  goal2: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  tournementId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournement" },
  tournId: { type: mongoose.Schema.Types.ObjectId, ref: "Tourn" },
  card: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      name: String,
      number: Number,
      yellow: Number,
      red: Number,
    },
  ],
  price: Number,
  ticketNumber: Number,
  ticketId: [Number],
  w: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  l: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
});
module.exports = mongoose.model("match", match);
