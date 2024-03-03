const express = require("express");
const router = express.Router();
const tournementController = require("../Controllers/tournementController");

router.post("/", tournementController.createTournament);
router.get("/", tournementController.getAllTournaments);
router.get("/:id", tournementController.getTournamentById);
router.put("/:id", tournementController.updateTournamentById);
router.delete("/:id", tournementController.deleteTournamentById);

module.exports = router;
