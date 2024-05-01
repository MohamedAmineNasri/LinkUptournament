var express = require("express");
var router = express.Router();
const achievementService = require("../Services/AchivementService");

router.get("/", achievementService.getAllAchivements);
router.get("/getAchievementByID/:id",achievementService.getAchievementById);
router.post("/addAchievement", achievementService.addAchivementAndAssaignToAllTeams);
router.put(
  "/UpadateAchivement/:id",
  achievementService.updateAchievement
)
router.delete("/deleteAchievement/:id" ,achievementService.deleteAchievementById);
module.exports =router;