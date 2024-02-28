const Team = require("../Models/Team");
const Player = require("../Models/Player");
const academyService = require("../Services/AcademyService");

const getAllTeams = async (req, res, next) => {
  const teams = await Team.find().populate("Players");
  res.json(teams);
};

const addTeam = async (req, res, next) => {
  const { TeamName, TeamLogo } = req.body;
  const TeamData = new Team({ TeamName, TeamLogo });
  await TeamData.save();
  res.json({
    message: "Team sucessfully added ! ",
  });
};
const addTeamAndAssaignToAcademy = async (req, res, next) => {
  const { TeamName, TeamLogo, academy } = req.body;
  const TeamData = new Team({ TeamName, TeamLogo, academy });
  await TeamData.save();
  res.json({
    message: "Team sucessfully added ! ",
  });
};

const getTeamById = async (req, res, next) => {
  const TeamData = await Team.findById(req.params.id);
  res.json(TeamData);
};

const deleteTeamById = async (req, res, next) => {
  const teamData = await Team.findByIdAndDelete(req.params.id);
  res.json("deleted sucessfully" + teamData);
};

const updateTeamMatchesWon = async (req, res, next) => {
  const TeamMWData = await Team.findById(req.params.id);
  TeamMWData.Total_MatchesWon = TeamMWData.Total_MatchesWon + 1;
  TeamMWData.Total_MatchesPlayed = TeamMWData.Total_MatchesPlayed + 1;
  await TeamMWData.save();
  res.json("Team victory increased by 1 sucessfully");
};

const updateTeamMatchesLost = async (req, res, next) => {
  const TeamMLData = await Team.findById(req.params.id);
  TeamMLData.Total_MatchesLost = TeamMLData.Total_MatchesLost + 1;
  TeamMLData.Total_MatchesPlayed = TeamMLData.Total_MatchesPlayed + 1;
  await TeamMLData.save();
  res.json("Team Lost increased by 1 sucessfully");
};

const updateTeamMatchesDrawn = async (req, res, next) => {
  const TeamMDData = await Team.findById(req.params.id);
  TeamMDData.Total_MatchesDrawn = TeamMDData.Total_MatchesDrawn + 1;
  TeamMDData.Total_MatchesPlayed = TeamMDData.Total_MatchesPlayed + 1;
  await TeamMDData.save();
  res.json("Team draw increased by 1 sucessfully");
};

const updateGoals_scored = async (req, res, next) => {
  const TeamData = await Team.findById(req.params.id);
  TeamData.Total_Goals_scored += 2; // test
  await TeamData.save();
  res.json("Goals numbers increased sucessfully");
};

const updateGoals_received = async (req, res, next) => {
  const TeamData = await Team.findById(req.params.id);
  TeamData.Total_Goals_received += 2;
  await TeamData.save();
  res.json("Goals received  numbers increased sucessfully");
};

const assignPlayerToTeam = async (req, res) => {
  const playerId = req.params.playerId;
  const teamId = req.params.teamId;
  try {
    // Find the player by ID
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Find the team by ID
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Assign the player to the team
    player.team = teamId;
    team.Players = [...team.Players, playerId];
    await player.save();
    await team.save();

    return res
      .status(200)
      .json({ message: "Player assigned to team successfully" });
  } catch (error) {
    console.error("Error assigning player to team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllTeams,
  addTeam,
  deleteTeamById,
  getTeamById,
  updateTeamMatchesWon,
  updateTeamMatchesLost,
  updateTeamMatchesDrawn,
  updateGoals_scored,
  updateGoals_received,
  addTeamAndAssaignToAcademy,
  assignPlayerToTeam,
};
