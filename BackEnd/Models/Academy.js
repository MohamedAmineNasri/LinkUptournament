const mongoose = require("mongoose");

const AcademySchema = new mongoose.Schema(
  {
    AcademyName: {
      type: String,
      require: "AcademyName is required !!",
      unique: true
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
      default: "Pending" //Approved //Rejected
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        
    },
  },
);

module.exports = mongoose.model("academy", AcademySchema);