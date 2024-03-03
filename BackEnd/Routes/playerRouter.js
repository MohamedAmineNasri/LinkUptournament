const express = require("express");
const router = express.Router();
const playerController = require("../Controllers/playerController");

router.post("/", playerController.createPlayer);
router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.patch("/:id", playerController.updatePlayerById);
router.delete("/:id", playerController.deletePlayerById);

module.exports = router;
