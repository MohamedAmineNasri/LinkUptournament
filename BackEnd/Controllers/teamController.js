const Team = require("../Models/Team");

createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).send(team);
  } catch (error) {
    res.status(400).send(error);
  }
};

getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
};

getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send();
    }
    res.send(team);
  } catch (error) {
    res.status(500).send(error);
  }
};

updateTeamById = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) {
      return res.status(404).send();
    }
    res.send(team);
  } catch (error) {
    res.status(400).send(error);
  }
};

deleteTeamById = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).send();
    }
    res.send(team);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
