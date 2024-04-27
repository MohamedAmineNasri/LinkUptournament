var express = require("express");
var router = express.Router();
const tachievementService = require("../Services/TachievementService");

router.get("/", tachievementService.getAllTeamsAchivements);

router.get("/teamAchievs/:idTeam", tachievementService.getTeamAchivementsByTeamId);

router.get("/DefaultteamAchievs/:idTeam", tachievementService.getDefaultAchivementsOfTeamByTeamId);

router.post("/addtachievement", tachievementService.addTeamAchiv);

router.put("/updateTeamAchievementStatus/:idTeam", tachievementService.updateTeamAchievementStatus);

module.exports =router;