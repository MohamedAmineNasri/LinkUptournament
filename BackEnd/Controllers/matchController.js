const match = require("../Models/match");
const Player = require("../Models/match");
//get all 

async function getAllematch(req, res) {
    try {
      const matchs = await match.find();
      res.send(matchs);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  //get by id 
  async function getmatchById(req, res) {
    try {
      const match = await match.findById(req.params.id);
      if (!match) {
        return res.status(404).send();
      }
      res.send(match);
    } catch (error) {
      res.status(500).send(error);
    }
  }
//create 
async function creatematch(req, res) {
    try {
      const match = new match(req.body);
      await match.save();
      res.status(201).send(match);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // Update player by ID
async function updatematchById(req, res) {
    try {
      const match = await match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!match) {
        return res.status(404).send();
      }
      res.send(match);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  // Delete match by ID
  async function deletematchById(req, res) {
    try {
      const match = await Player.findByIdAndDelete(req.params.id);
      if (!match) {
        return res.status(404).send();
      }
      res.send(match);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  module.exports = {
    creatematch,
    getAllematch,
    getmatchById,
    updatematchById,
    deletematchById,
  };




