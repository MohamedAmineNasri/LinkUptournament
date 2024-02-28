var express = require("express");
var router = express.Router();
const teamService = require("../Services/TeamService");

router.get("/", teamService.getAllTeams);

router.post("/addTeam", teamService.addTeam);
router.post(
  "/getTeamAndAssaignAcademy",
  teamService.addTeamAndAssaignToAcademy
);

router.get("/getTeam/:id", teamService.getTeamById);

router.delete("/deleteTeam/:id", teamService.deleteTeamById);

router.post("/updateMW/:id", teamService.updateTeamMatchesWon);
router.post("/updateML/:id", teamService.updateTeamMatchesLost);
router.post("/updateMD/:id", teamService.updateTeamMatchesDrawn);
router.post("/updateGoals/:id", teamService.updateGoals_scored);
router.post("/updateGoalsIn/:id", teamService.updateGoals_received);
router.post(
  "/assignPlayerToTeam/:teamId/:playerId",
  teamService.assignPlayerToTeam
);

module.exports = router;
