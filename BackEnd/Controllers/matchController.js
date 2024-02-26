const match = require("../Models/match");
const Player = require("../Models/match");
//get all 

async function getAllematch(req, res) {
  const matches = await match.find();
  res.json(matches)
  }

  //get by id 
  async function getmatchById(req, res) {
    const matchById = await match.findById(req.params.id)
    res.json(matchById)
  }
//create 
async function creatematch(req, res) {
  const matche = new match(req.body);
  await matche.save()
 
  res.json(matche)
  }

  // Update match by ID
async function updatematchById(req, updateFields) {
    
      let matchs = await match.findById(req.params.id);
      match.Date = updateFields.Date ? updateFields.Date : match.Date;
        match.startingTime = updateFields.startingTime ? updateFields.startingTime : match.startingTime;
        match.matchType = updateFields.matchType ? updateFields.matchType : match.matchType;
        match.weatherCondition = updateFields.weatherCondition ? updateFields.weatherCondition : match.weatherCondition;
        match.score = updateFields.score ? updateFields.score : match.score;
        match.injuries = updateFields.injuries ? updateFields.injuries : match.injuries;
        match.card = updateFields.card ? updateFields.card : match.card;
        match.extraTime = updateFields.extraTime ? updateFields.extraTime : match.extraTime;
        match.matchStatus = updateFields.matchStatus ? updateFields.matchStatus : match.matchStatus;



      await matchs.save();
      updateFields.json(matchs);
    
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
  res.json("Team one  increased by 1 sucessfully");
  }
  async function updatescore2_ById(req, res) {
    const TeamMWData = await match.findById(req.params.id);
    TeamMWData.score[0] -= 1;
    
    await TeamMWData.save()
    res.json("Team one  decreased by 1 sucessfully");
    }
     // Update score for team 2 
async function updatescoreById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.score[1] += 1;
  
  await TeamMWData.save()
  res.json("Team two  increased by 1 sucessfully");
  }
  async function updatescore_ById(req, res) {
    const TeamMWData = await match.findById(req.params.id);
    TeamMWData.score[1] -= 1;
    
    await TeamMWData.save()
    res.json("Team two  decreased by 1 sucessfully");
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
    updatescore_ById
  };




