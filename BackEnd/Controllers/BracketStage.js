const BracketStage = require("../models/BracketStage");

// Get all bracket stages by tournament ID
const getAllBracketStagesByTournamentId = async (req, res) => {
  const { tournamentId } = req.params;

  try {
    const bracketStages = await BracketStage.find({
      tournament: tournamentId,
    }).populate({
      path: "teams",
      select: "TeamName TeamLogo", // Select only the TeamName field
      model: "team",
    });

    res.json(bracketStages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBracketStagesByTournamentIdAndRound = async (req, res) => {
  const { tournamentId, round } = req.params;

  try {
    const bracketStages = await BracketStage.findOne({
      tournament: tournamentId,
      round: round,
    });

    res.json(bracketStages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new bracket stage
const createBracketStage = async (req, res) => {
  const { tournament, round, teams, scores } = req.body;

  try {
    const bracketStage = new BracketStage({
      tournament,
      round,
      teams,
      scores,
    });

    const savedBracketStage = await bracketStage.save();

    res.status(201).json(savedBracketStage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bracket stages
const getAllBracketStages = async (req, res) => {
  try {
    const bracketStages = await BracketStage.find().populate({
      path: "teams",
      select: "TeamName", // Select only the TeamName field
      model: "team",
    });
    res.json(bracketStages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bracket stage by ID
const getBracketStageById = async (req, res) => {
  const { id } = req.params;

  try {
    const bracketStage = await BracketStage.findById(id).populate({
      path: "teams",
      select: "TeamName TeamLogo", // Select only the TeamName field
      model: "team",
    });

    if (!bracketStage) {
      return res.status(404).json({ message: "Bracket stage not found" });
    }

    res.json(bracketStage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update bracket stage by ID
const updateBracketStageById = async (req, res) => {
  const { id } = req.params;
  const { tournament, round, teams, scores } = req.body;

  try {
    const updatedBracketStage = await BracketStage.findByIdAndUpdate(
      id,
      { tournament, round, teams, scores },
      { new: true }
    );

    if (!updatedBracketStage) {
      return res.status(404).json({ message: "Bracket stage not found" });
    }

    res.json(updatedBracketStage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete bracket stage by ID
const deleteBracketStageById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBracketStage = await BracketStage.findByIdAndDelete(id);

    if (!deletedBracketStage) {
      return res.status(404).json({ message: "Bracket stage not found" });
    }

    res.json({ message: "Bracket stage deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBracketByTournamentId = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    // Find the bracket stages with the specified tournament ID
    const bracketStages = await BracketStage.find({ tournament: tournamentId });

    // Check if any bracket stages were found
    if (bracketStages.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No bracket stages found for the specified tournament ID.",
        });
    }

    // Delete each bracket stage found
    await Promise.all(
      bracketStages.map(async (bracketStage) => {
        await bracketStage.remove();
      })
    );

    return res
      .status(200)
      .json({ success: true, message: "Bracket stages deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error deleting bracket stages.",
        error,
      });
  }
};

// Controller function to find a bracket stage by tournament ID and round

module.exports = {
  createBracketStage,
  getAllBracketStages,
  getBracketStageById,
  updateBracketStageById,
  deleteBracketStageById,
  getAllBracketStagesByTournamentId,
  getAllBracketStagesByTournamentIdAndRound,
  deleteBracketByTournamentId,
};
