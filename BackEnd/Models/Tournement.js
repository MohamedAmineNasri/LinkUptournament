const mongoose = require("mongoose");

const tournementSchema = new mongoose.Schema(
  {
    name: { type: String },
    rules: { type: String },
    status: { type: Boolean, default: false },
    winner: { type: String },
    date_debut: { type: Date },
    end_date: { type: Date },
  },
  { timestamps: true }
);

const Tournement = mongoose.model("Tournement", tournementSchema);

module.exports = Tournement;
