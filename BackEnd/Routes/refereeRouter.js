const express = require("express");
const router = express.Router();
const refereeController = require("../Controllers/refereeController");

router.post("/", refereeController.createReferee);
router.get("/", refereeController.getAllReferees);
router.get('/available',refereeController.getRefereesForMatch)
router.get('/search',refereeController.searchReferees)
router.get("/:id", refereeController.getRefereeById);
router.patch("/:id", refereeController.updateRefereeById);
router.delete("/:id", refereeController.deleteRefereeById);

module.exports = router;
