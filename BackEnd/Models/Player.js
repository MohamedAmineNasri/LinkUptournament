const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  { name:String,
    number:Number,
    legal_guardian: { type: String },
    academic_membership: { type: String },
    position: { type: String },
    skills: [{ type: String }],
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
