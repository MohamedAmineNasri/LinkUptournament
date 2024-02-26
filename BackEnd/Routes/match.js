var express = require('express');
var router = express.Router();
const matchController = require("../Controllers/matchController");




router.post("/", matchController.creatematch);
router.get("/", matchController.getAllematch);
router.get("/:id", matchController.getmatchById);
router.patch("/:id", matchController.updatematchById);
router.delete("/:id", matchController.deletematchById);

module.exports = router;