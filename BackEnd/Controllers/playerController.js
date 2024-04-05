const Player = require("../Models/Player");

const Team =require('../Models/Team')
const Academy =require('../Models/Academy')
const TeamService = require('../Services/TeamService')



async function createPlayer(req, res) {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
}
// Create a player
async function createPlayerMi(req, res) {
  const { team } = req.body;
  try {
    console.log(team)
    const targetTeam = await TeamService.getTeamById2(team)
    const player = new Player(req.body);
    await player.save();
    targetTeam.Players.push(player);
    await targetTeam.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Get all players
async function getAllPlayers(req, res) {
  try {
    // Find all players and populate their team
    const players = await Player.find().populate({
      path: "team",
      select: "TeamName",
    });

    return res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players with team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get player by ID
async function getPlayerById(req, res) {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update player by ID
async function updatePlayerById(req, res) {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Delete player by ID
async function deletePlayerById(req, res) {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayerById,
  deletePlayerById,
  createPlayerMi
};
