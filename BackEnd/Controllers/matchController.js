const match = require("../Models/match");
const player = require("../Models/Player");
const tournament = require("../Models/Tournament")

//get all 

async function getAllematch(req, res) {
  const matches = await match.find();
  res.json(matches)
  }
  async function getmatchByTouernement(req, res) {
    const { id } = req.params; 
    const matchet = await match.find({tournementId:id})
     res.json(matchet)
  }

  //get by id 
  async function getmatchById(req, res) {
    const matchById = await match.findById(req.params.id)
    res.json(matchById)
  }
//create 
async function creatematch(req, res) {
  try {
    const { card, ...matchData } = req.body;
    const matche = new match(matchData);
  
    // Populate tournamentName if tournementId exists
    if (req.body.tournementId) {
      const tournamentData = await tournament.findById(req.body.tournementId);
      if (tournamentData) {
        matche.tournamentName = tournamentData.name;
      } else {
        matche.tournamentName = null; // Tournament not found
        
      }
    } else {
      matche.tournamentName = null; // tournementId not provided
    }

    if (req.body.card && req.body.card.length > 0) {
      for (let i = 0; i < req.body.card.length; i++) {
        const cardData = req.body.card[i];
        
        // Fetch player information using the card.player ID
        const playerInfo = await player.findById(cardData.player);
        
        // Populate the card name with player's name and number
        if (playerInfo) {
          cardData.name = playerInfo.name;
          cardData.number = playerInfo.number;
        } else {
          cardData.name = 'Unknown'; // Player not found
          cardData.number = 'Unknown';
        }
        
        // Push the modified card into the newMatch card array
        matche.card.push(cardData);
      }
    } else {
      // No card data provided
      matche.card = []; // or any other default behavior you desire
    }
    
    await matche.save();
 
    res.json(matche);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  // Update match by ID
async function updatematchById(req, res) {
    
      let matchs = await match.findByIdAndUpdate(req.params.id,req.body);
      
      res.json(matchs)
  }

 


  
  // Delete match by ID
  async function deletematchById(req, res) {
    const matchById = await match.findByIdAndDelete(req.params.id)
    res.json(matchById)
  }
    // Update score for team 1 
async function updatescore2ById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.team1Gols += 1;
  
  await TeamMWData.save()
  res.json("Team one  increased by 1 sucessfully",TeamMWData);
  }
  async function updatescore2_ById(req, res) {
    const TeamMWData = await match.findById(req.params.id);
    TeamMWData.team1Gols -= 1;
    
    await TeamMWData.save()
    res.json("Team one  decreased by 1 sucessfully",TeamMWData);
    }
     // Update score for team 2 
async function updatescoreById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.team2Gols += 1;
  
  await TeamMWData.save()
  res.json("Team two  increased by 1 sucessfully",TeamMWData);
  }
  async function updatescore_ById(req, res) {
    const TeamMWData = await match.findById(req.params.id);
    TeamMWData.team2Gols -= 1;
    
    await TeamMWData.save()
    res.json("Team two  decreased by 1 sucessfully",TeamMWData);
    }
  
  module.exports = {
    creatematch,
    getAllematch,
    getmatchById,
    updatematchById,
    deletematchById,
    updatescoreById,
    updatescore2ById,
    updatescore2_ById,
    updatescore_ById,
    getmatchByTouernement
  };




