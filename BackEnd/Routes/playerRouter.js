const express = require("express");
const router = express.Router();
const playerController = require("../Controllers/playerController");

router.post("/", playerController.createPlayer);
router.get("/", playerController.getAllPlayers);
router.get('/search',playerController.searchPlayers)
router.get("/:id", playerController.getPlayerById);
router.patch("/:id", playerController.updatePlayerById);
router.delete("/:id", playerController.deletePlayerById);
router.get("/team/:id",playerController.getplayerByteam)
router.post("/addPlayer", playerController.createPlayerMi); // do not delete


module.exports = router;
