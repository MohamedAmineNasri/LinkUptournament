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
  try{
    const { card, ...matchData } = req.body;
    const matche = new match(matchData);
  //const matche = new match({team1,team2,date,referee,startingTime,extraTime,matchStatus,location,matchType,weatherCondition,tournementId,team1Gols,team2Gols});
 
  
  const tournament_name = await tournament.findById(req.body.tournementId)
  if (!req.body.tournementId) {
    matche.tournamentName = null;
}
else
  {matche.tournamentName= tournament_name.name }

  for (let i = 0; i < req.body.card.length; i++) {
    const card = req.body.card[i];
    
    // Fetch player information using the card.player ID
    const playerInfo = await player.findById(card.player);
    
    // Populate the card name with player's name
    card.name = playerInfo.name;
    card.number=playerInfo.number
    
    // Push the modified card into the newMatch card array
   
    matche.card.push(card);
    
    
   }
  
  await matche.save()
 
  res.json(matche)
  }catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}}

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
  TeamMWData.score[0] += 1;
  
  await TeamMWData.save()
  res.json("Team one  increased by 1 sucessfully",TeamMWData);
  }
  async function updatescore2_ById(req, res) {
    const TeamMWData = await match.findById(req.params.id);
    TeamMWData.score[0] -= 1;
    
    await TeamMWData.save()
    res.json("Team one  decreased by 1 sucessfully",TeamMWData);
    }
     // Update score for team 2 
async function updatescoreById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.score[1] += 1;
  
  await TeamMWData.save()
  res.json("Team two  increased by 1 sucessfully",TeamMWData);
  }
  async function updatescore_ById(req, res) {
    const TeamMWData = await match.findById(req.params.id);
    TeamMWData.score[1] -= 1;
    
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




