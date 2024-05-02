const Player = require("../Models/Player");
const Team = require("../Models/Team");
const TeamService = require("../Services/TeamService");

async function createPlayerMi(req, res) {
  const { team } = req.body;
  try {
    console.log(team);
    const targetTeam = await TeamService.getTeamById2(team);
    const player = new Player(req.body);
    await player.save();
    targetTeam.Players.push(player);
    await targetTeam.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Create a player
async function createPlayer(req, res) {
  try {
    const { team } = req.body;
    const player = new Player(req.body);
    await player.save();
    if (team) {
      const foundTeam = await Team.findById(team);
      if (foundTeam) {
        foundTeam.Players.push(player._id);
        await foundTeam.save();
      }
    }
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Controller function for getting all players with pagination
async function getAllPlayers(req, res) {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided

    // Calculate the index to start from
    const startIndex = (page - 1) * limit;

    // Find total count of players
    const totalPlayers = await Player.countDocuments();

    // Find players for the current page and populate their team
    const players = await Player.find().skip(startIndex).limit(limit).populate({
      path: "team",
      select: "TeamName", // Select only the TeamName field
      model: "team",
    });

    return res.status(200).json({
      players,
      currentPage: page,
      totalPages: Math.ceil(totalPlayers / limit),
    });
  } catch (error) {
    console.error("Error fetching players with team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//get player by team
async function getplayerByteam(req, res) {
  const { id } = req.params;
  const player = await Player.find({ team: id });
  res.json(player);
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

// Route to handle player search
async function searchPlayers(req, res) {
  try {
    const { name, position, team, page, limit } = req.query;
    const query = {};
    const pageNumber = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * perPage;

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (position) {
      query.position = position;
    }

    if (team) {
      query.team = team;
    }

    const count = await Player.countDocuments(query);
    const totalPages = Math.ceil(count / perPage);

    const players = await Player.find(query)
      .skip(skip)
      .limit(perPage)
      .populate({
        path: "team",
        select: "TeamName", // Select only the TeamName field
        model: "team",
      });

    res.json({
      players,
      totalPages: totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error searching players:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayerById,
  deletePlayerById,
  getplayerByteam,
  createPlayer,
  createPlayerMi,
  searchPlayers,
};
