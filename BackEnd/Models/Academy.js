const mongoose = require("mongoose");

const AcademySchema = new mongoose.Schema({
  AcademyId: Number,

  AcademyName: {
    type: String,
    require: "AcademyName is required !!",
  },
  Location: {
    type: String,
    require: "Location is required !!",
  },
  Logo: {
    type: String,
    require: "Logo is required !!",
  },
  FoundedYear: {
    type: Date,
    require: "FoundedYear is required !! ",
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

module.exports = mongoose.model("Academy", AcademySchema);
