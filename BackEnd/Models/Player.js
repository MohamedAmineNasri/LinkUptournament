const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    avatar: String,
    name: String,
    number: Number,
    age: Number,
    legal_guardian: { type: String },
    academic_membership: { type: String },
    position: { type: String },
    skills: [{ type: String }],
    team: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
