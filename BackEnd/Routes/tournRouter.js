const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournController');

// Create tournament
router.post('/', tournamentController.createTournament);

// Get all tournaments
router.get('/', tournamentController.getAllTournaments);

// Get a tournament by ID
router.get('/:id', tournamentController.getTournamentById);

// Update a tournament
router.patch('/:id', tournamentController.updateTournament);

// Delete a tournament
router.delete('/:id', tournamentController.deleteTournament);

module.exports = router;
