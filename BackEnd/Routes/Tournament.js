var express = require('express')
var router = express.Router();
const tournamentService = require("../Services/TounamentService");

// Route to add a tournament
router.post('/add', tournamentService.addTournament);

// Route to update a tournament
router.put('/update/:id', tournamentService.updateTournament);

// Route to delete a tournament
router.delete('/delete/:id', tournamentService.deleteTournament);

// Route to get all tournaments
router.get('/all', tournamentService.getAllTournaments);

// Route to get a tournament by ID
router.get('/:id', tournamentService.getTournamentById);

module.exports = router;
