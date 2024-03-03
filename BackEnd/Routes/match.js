const express = require('express');
const router = express.Router();
const matchController = require("../Controllers/matchController");




router.post("/", matchController.creatematch);
router.get("/", matchController.getAllematch);
router.get("/:id", matchController.getmatchById);
router.put("/:id", matchController.updatematchById);
router.delete("/:id", matchController.deletematchById);
router.put(":id/score1/", matchController.updatescoreById);
router.put("/:id/score2", matchController.updatescore2ById);
router.put("/:id/score1min", matchController.updatescore2_ById);
router.put("/:id/score2min", matchController.updatescore_ById);

module.exports = router;