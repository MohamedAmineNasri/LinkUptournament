const express = require('express');
const router = express.Router();
const matchController = require("../Controllers/matchController");




router.post("/", matchController.creatematch);
router.get("/", matchController.getAllematch);
router.get("/:id", matchController.getmatchById);
router.put("/:id", matchController.updatematchById);
router.delete("/:id", matchController.deletematchById);
router.put("/score1/:id", matchController.updatescoreById);
router.put("/score2/:id", matchController.updatescore2ById);
router.put("/score1min/:id", matchController.updatescore2_ById);
router.put("/score2min/:id", matchController.updatescore_ById);

module.exports = router;