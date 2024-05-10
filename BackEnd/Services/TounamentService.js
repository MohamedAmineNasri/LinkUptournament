
const Tournament = require('../Models/Tournament') ; 

const addTournament = async (req, res, next) => {
  const { name, logo ,  type, rules, status, winner, date_debut, date_fin, teams } = req.body;
  const td = new Tournament({ name,logo , type, rules, status, winner, date_debut, date_fin, teams });

  const savedTournament = await td.save();
  res.json({
      message : "Tournament successfully added!",
      tournament: savedTournament // Return the newly created tournament data
  });
}; 

// Update a tournament
const updateTournament = async (req, res, next) => {
    const { id } = req.params;
    const updatedTournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      message: "Tournament successfully updated!",
      tournament: updatedTournament
    });
  };
  
  // Delete a tournament
  const deleteTournament = async (req, res, next) => {
    const { id } = req.params;
    await Tournament.findByIdAndDelete(id);
    res.json({
      message: "Tournament successfully deleted!"
    });
  };
  
  // Get all tournaments
  const getAllTournaments = async (req, res, next) => {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  };
  
  // Get a tournament by ID
  const getTournamentById = async (req, res, next) => {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);
    console.log(tournament) ; 
    res.json({
      message: "Successfully retrieved the tournament!",
      tournament: tournament
    });
  };

  const getTournamentByName = async (req, res, next) => {
    const searchString = req.params.searchString; // Get the search string from request parameters
    try {
        // Use a regular expression to search for teams by name containing the provided string
        const tournaments = await Tournament.find({ name: { $regex: searchString, $options: 'i' } });
        res.json(tournaments);
    } catch (error) {
        console.error("Error getting tournaments by name:", error);
        res.status(500).json("Internal server error");
    }
};

  
  module.exports = { getTournamentByName ,addTournament, updateTournament, deleteTournament, getAllTournaments, getTournamentById };
  