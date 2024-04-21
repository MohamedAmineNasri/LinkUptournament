var express = require('express')
var router = express.Router();
const tournamentService = require("../Services/TounamentService");

const multer = require('multer');
const path = require('path');
const Player = require('../Models/Player');

const { sendSMS } = require('../Controllers/smsController');
const Tournament = require('../Models/Tournament');


router.post('/add', tournamentService.addTournament);

router.put('/update/:id', tournamentService.updateTournament);

router.delete('/:id', tournamentService.deleteTournament);

router.get('/all', tournamentService.getAllTournaments);
router.get('/search/:searchString', tournamentService.getTournamentByName);

router.get('/:id', tournamentService.getTournamentById);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
  });
  
  // Initialize upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 8000000 }, // Limit file size to 1MB
  }).single('logo'); // 'logo' should match the name attribute in your form input field
  
  // POST route to handle file upload
  router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'File upload failed' });
      } else {
        if (!req.file) {
          res.status(400).json({ message: 'No file uploaded' });
        } else {
          // File uploaded successfully, return the file path
          res.json({ filePath: req.file.path });
        }
      }
    });
  });


  router.post('/sendSMS/:tournamentId/:playerId', async (req, res) => {
    const { playerId, tournamentId } = req.params;
  
    try {
      // Retrieve player's phone number using the playerId
      const player = await Player.findById(playerId);
      const playerPhoneNumber = "+216"+ player.number;
      const tournament = await Tournament.findById(tournamentId) // Assuming phoneNumber is the field storing the player's phone number
  
      // Calculate time remaining until the tournament start date
      const currentDate = new Date();
      const startDate = new Date(tournament.date_debut);
      const timeRemainingMs = startDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor((timeRemainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
      // Compose the message
      const message = `The tournament ${tournament.name} will start in ${daysRemaining} days and ${hoursRemaining} hours. Get yourself Ready !`;
  
      // Send the SMS
      await sendSMS(playerPhoneNumber, message);
  
      res.status(200).send('SMS sent successfully');
    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).send('Failed to send SMS');
    }
  });
  




module.exports = router;
