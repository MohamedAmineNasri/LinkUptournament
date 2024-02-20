const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: "Name is required!!",
    },
    email: {
      type: String,
      require: "Email is required!!",
    },
    password: {
      type: String,
      require: "Password is required!",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
