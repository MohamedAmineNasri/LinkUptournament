const express = require("express");
const router = express.Router();
const teamController = require("../Controllers/teamController");

router.post("/", teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.patch("/:id", teamController.updateTeamById);
router.delete("/:id", teamController.deleteTeamById);

module.exports = router;
