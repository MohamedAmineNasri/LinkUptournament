const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    legal_guardian: { type: String },
    academic_membership: { type: String },
    position: { type: String },
    skills: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
