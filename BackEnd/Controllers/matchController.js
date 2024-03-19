const match = require("../Models/match");
const player = require("../Models/Player");
const tournament = require("../Models/Tournement")

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
  const matche = new match(req.body);
  const Player_id = await player.aggregate([{ $match: { 'card.player': req.body.card.player } }])
  const player_name = await player.findById(Player_id)
  const tournament_name = await tournament.findById(req.body.tournementId)
  if (!req.body.tournementId) {
    matche.tournamentName = null;
}
else
  matche.tournamentName= tournament_name.name 
  matche.card.name = player_name.name
  matche.card.forEach(match => {
    match.name=player_name.name
    match.number=player_name.number
    
    
   })
  
  await matche.save()
 
  res.json(matche)
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




