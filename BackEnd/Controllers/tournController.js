const Tourn = require("../models/Tourn");

// Create tournament
exports.createTournament = async (req, res) => {
  try {
    const tourn = await Tourn.create(req.body);
    res.status(201).json(tourn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tournaments
exports.getAllTournaments = async (req, res) => {
  try {
    const tourns = await Tourn.find().populate({
      path: "teams",
      select: "TeamName", // Select only the TeamName field
      model: "team",
    });
    res.json(tourns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a tournament by ID
exports.getTournamentById = async (req, res) => {
  try {
    const tourn = await Tourn.findById(req.params.id).populate({
      path: "teams",
      select: "TeamName", // Select only the TeamName field
      model: "team",
    });

    if (tourn === null) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.json(tourn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a tournament
exports.updateTournament = async (req, res) => {
  try {
    const updatedTourn = await Tourn.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTourn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    const tourn = await Tourn.findById(req.params.id);
    if (!tourn) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    await Tourn.deleteOne({ _id: tourn._id }); // Use deleteOne directly on the model
    res.json({ message: "Tournament deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tournament" });
  }
};
