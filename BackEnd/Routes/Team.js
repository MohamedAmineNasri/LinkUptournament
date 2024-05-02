var express = require("express");
var router = express.Router();
const teamService = require("../Services/TeamService");

router.get("/", teamService.getAllTeams);
router.get("/search", teamService.searchTeams);

router.post("/addTeam", teamService.addTeam);
router.post(
  "/getTeamAndAssaignAcademy",
  teamService.addTeamAndAssaignToAcademy
);
router.get("/ofTeam/:idTeam", teamService.getPlayersByTeamId);
router.post(
  "/assignPlayerToTeam/:teamId/:playerId",
  teamService.assignPlayerToTeam
);

router.get("/getTeam/:id", teamService.getTeamById);
router.get("/getTeambyAcademyId/:id", teamService.getTeamByAcademyId);

router.delete("/deleteTeam/:id", teamService.deleteTeamById);
//By yassine
router.put("/:id", teamService.updateTeamById);

router.put("/updateTeam/:id", teamService.updateTeam);
router.put("/updateTeamSameName/:id", teamService.updateTeamSameName);

router.post("/updateMW/:id", teamService.updateTeamMatchesWon);
router.post("/cancelMW/:id", teamService.cancelTeamMatchesWon);

router.post("/updateML/:id", teamService.updateTeamMatchesLost);
router.post("/cancelML/:id", teamService.cancelTeamMatchesLost);

router.post("/updateMD/:id", teamService.updateTeamMatchesDrawn);
router.post("/cancelMD/:id", teamService.cancelTeamMatchesDrawn);

router.post("/updateGoals/:id", teamService.updateGoals_scored);
router.post("/cancelGoals/:id", teamService.cancelGoals_scored);

router.post("/updateGoalsIn/:id", teamService.updateGoals_received);
router.post("/cancelGoalsIn/:id", teamService.cancelGoals_received);

router.post("/resetGSdata/:id", teamService.resetGroupStageData);

router.delete("/deleteTeamByIdandFromAcademy/:id",teamService.deleteTeamByIdandFromAcademy);
router.put("/removePlayerFromTeam/:idt/:idp",teamService.removePlayerFromTeam);
router.post(
  "/addTeamAndAssaignAcademy",
  teamService.addTeamAndAssaignToAcademy
);

router.delete(
  "/deleteTeamByIdandFromAcademy/:id",
  teamService.deleteTeamByIdandFromAcademy
);

router.get("/teams/search/:searchString", teamService.getTeamsByName);

router.post("/UpdateTeamsStatsFromFinishedMatches",teamService.UpdateTeamsStatsFromFinishedMatches);

module.exports = router;
