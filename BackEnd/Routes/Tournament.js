var express = require('express')
var router = express.Router();
const tournamentService = require("../Services/TounamentService");
const multer = require('multer');
const path = require('path');


router.post('/add', tournamentService.addTournament);

router.put('/update/:id', tournamentService.updateTournament);

router.delete('/delete/:id', tournamentService.deleteTournament);

router.get('/all', tournamentService.getAllTournaments);

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
  




module.exports = router;
