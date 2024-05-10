const express = require("express");
const router = express.Router();
const bracketStageController = require("../controllers/bracketStage");

// Route to create a new bracket stage
router.post("/", bracketStageController.createBracketStage);

// Route to get all bracket stages
router.get("/", bracketStageController.getAllBracketStages);

// Route to get a bracket stage by ID
router.get("/:id", bracketStageController.getBracketStageById);

// Route to update a bracket stage by ID
router.put("/:id", bracketStageController.updateBracketStageById);

// Route to delete a bracket stage by ID
router.delete("/:id", bracketStageController.deleteBracketStageById);

router.get(
  "/tournament/:tournamentId",
  bracketStageController.getAllBracketStagesByTournamentId
);
router.delete("/tournament/:tournamentId", bracketStageController.deleteBracketByTournamentId);
router.get(
  "/tournament/:tournamentId/:round",
  bracketStageController.getAllBracketStagesByTournamentIdAndRound
);

module.exports = router;
