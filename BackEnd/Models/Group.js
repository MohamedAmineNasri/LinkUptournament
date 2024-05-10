const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true
    },
    name: {
      type: String,
      required: [true, "Group Name is required !!"],
    },
    teams: [{
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      },
      TeamName: String,
      TeamLogo : String, // Add this line
      MJ: Number,
      G: Number,
      N: Number,
      P: Number,
      BP: Number,
      BC: Number,
      DB: Number,
      PTS: Number
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Group", GroupSchema);
