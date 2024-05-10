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

// Middleware to cascade delete associated BracketStage documents
tournSchema.pre("deleteOne", { document: true }, async function (next) {
  const tourn = this;
  const bracketStagesToDelete = tourn.bracketStages;

  // Delete associated BracketStage documents
  await mongoose
    .model("BracketStage")
    .deleteMany({ _id: { $in: bracketStagesToDelete } });

  next();
});

const Tourn = mongoose.model("Tourn", tournSchema);

module.exports = Tourn;
