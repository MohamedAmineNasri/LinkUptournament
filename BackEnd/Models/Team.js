const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    // Ajouter d'autres propriétés si besoin
  });
  
  // Exporter le modèle d'équipe
  module.exports = mongoose.model("Team", TeamSchema);
  