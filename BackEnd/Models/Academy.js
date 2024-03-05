const mongoose = require("mongoose");

const AcademySchema = new mongoose.Schema(
  {
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
    LegitimacyDocuments: {
      type: String,
      require: "Doc is required !!",
    },
    FoundedYear: {
      type: Date,
      require: "FoundedYear is required !! ",
    },
    Status: {
      type: String,
      default: "Not Verified"
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }]
  },
);

module.exports = mongoose.model("academy", AcademySchema);
