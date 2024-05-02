const mongoose = require("mongoose");

const RefereeSchema = new mongoose.Schema({
  avatar: String,
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  location: {
    type: String,
  },
  availability: {
    type: String,
  },
  role: {
    type: Number,
  },
});

module.exports = mongoose.model("referee", RefereeSchema);
