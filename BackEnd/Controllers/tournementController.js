const Tournement = require("../Models/Tournement.js");

// Create a tournament
async function createTournament(req, res) {
  try {
    const tournament = new Tournement(req.body);
    await tournament.save();
    res.status(201).send(tournament);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Get all tournaments
async function getAllTournaments(req, res) {
  try {
    const tournaments = await Tournement.find();
    res.send(tournaments);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get tournament by ID
async function getTournamentById(req, res) {
  try {
    const tournament = await Tournement.findById(req.params.id);
    if (!tournament) {
      return res.status(404).send();
    }
    res.send(tournament);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update tournament by ID
async function updateTournamentById(req, res) {
  try {
    const tournament = await Tournement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tournament) {
      return res.status(404).send();
    }
    res.send(tournament);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Delete tournament by ID
async function deleteTournamentById(req, res) {
  try {
    const tournament = await Tournement.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).send();
    }
    res.send(tournament);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createTournament,
  getAllTournaments,
  getTournamentById,
  updateTournamentById,
  deleteTournamentById,
};
