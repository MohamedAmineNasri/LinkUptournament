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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Group", GroupSchema);
