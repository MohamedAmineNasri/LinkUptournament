const express = require('express');
const router = express.Router();
const matchController = require("../Controllers/matchController");
const mail = require("../Controllers/registerController");



router.post("/", matchController.creatematch);
router.get("/", matchController.getAllematch);
router.get("/getAllematchByNameTeam", matchController.getAllematchByNameTeam);
router.get("/:id", matchController.getmatchById);
router.get("/tournement/:id", matchController.getmatchByTouernement)
router.get("/tourn/:id", matchController.findMatchesByTournId)
router.get("/group/:id", matchController.getmatchBygroup);
router.put("/:id", matchController.updatematchById);
router.delete("/:id", matchController.deletematchById);
router.put(":id/score1/", matchController.updatescoreById);
router.put("/:id/score2", matchController.updatescore2ById);
router.put("/:id/score1min", matchController.updatescore2_ById);
router.put("/:id/score2min", matchController.updatescore_ById);
router.get("/verif/:id/:ticket",matchController.verifyTicket)
router.get("/paymentmail/:email/:firstName/:lastName",mail.handlePaymentConfirmation)

module.exports = router;