const match = require("../Models/match");
const player = require("../Models/Player");
const Tourn = require("../models/Tourn");
const tournament = require("../Models/Tournament");

const Filter = require("bad-words");
const filter = new Filter();
filter.addWords("zebi", "3asba", "fack", "mnayik", "fack");

//get all

async function getAllematch(req, res) {
  const matches = await match.find();

  res.json(matches);
}
async function getAllematchByNameTeam(req, res) {
  const matches = await match
    .find()
    .populate("team1", "TeamName TeamLogo")
    .populate("team2", "TeamName TeamLogo");
  res.json(matches);
}

async function getmatchByTouernement(req, res) {
  const { id } = req.params;
  const matchet = await match.find({ tournementId: id });
  res.json(matchet);
}
async function getmatchBygroup(req, res) {
  const { id } = req.params;
  const matchet = await match.find({ group: id });
  res.json(matchet);
}
const findMatchesByTournId = async (req, res) => {
  const { id } = req.params; // Assuming tournId is passed as a parameter in the URL
  try {
    const matches = await match.find({ tournId: id });
    res.status(200).send(matches);
  } catch (error) {
    console.error("Error finding matches by tournId:", error);
    res.status(500).send("Error finding matches by tournId");
  }
};
async function getmatchBygroup(req, res) {
  const { id } = req.params;
  const matchet = await match.find({ group: id });
  res.json(matchet);
}
//get ticket id

async function verifyTicket(req, res) {
  try {
    // Find the match by its ID
    const matchh = await match.findById(req.params.id);

    // Check if the match exists
    if (!matchh) {
      return { success: false, message: "Match not found" };
    }

    // Check if the ticket ID is already in the ticketID array
    if (matchh.ticketId.includes(req.params.ticket)) {

      return res.json("Ticket already used");
    }

    // Add the ticket ID to the ticketID array
    matchh.ticketId.push(req.params.ticket);

    // Save the match
    await matchh.save();

    return res.json("Ticket verified and added successfully");
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while verifying the ticket",
    };
  }
}

//get by id
async function getmatchById(req, res) {
  const matchById = await match.findById(req.params.id);
  res.json(matchById);
}

//create
async function creatematch(req, res) {
  try {
    let matchTime = 0;

    // Update match time every minute
    setInterval(() => {
      matchTime++; // Increment match time by 1 minute
    }, 60000); // 60000 ms = 1 minute

    const { card, ...matchData } = req.body;
    const matche = new match(matchData);

    // Filter out bad words from the referee variable
    matche.referee = filter.clean(matche.referee);

    // Populate tournamentName if tournamentId exists
    if (req.body.tournId) {
      const tourn = await Tourn.findById(req.body.tournId);
      matche.tournamentName = tourn.name;
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
          cardData.name = "Unknown"; // Player not found
          cardData.number = "Unknown";
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
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update match by ID
async function updatematchById(req, res) {
  let matchs = await match.findByIdAndUpdate(req.params.id, req.body);

  res.json(matchs);
}

// Delete match by ID
async function deletematchById(req, res) {
  const matchById = await match.findByIdAndDelete(req.params.id);
  res.json(matchById);
}
// Update score for team 1
async function updatescore2ById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.team1Gols += 1;

  await TeamMWData.save();
  res.json("Team one  increased by 1 sucessfully", TeamMWData);
}
async function updatescore2_ById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.team1Gols -= 1;

  await TeamMWData.save();
  res.json("Team one  decreased by 1 sucessfully", TeamMWData);
}
// Update score for team 2
async function updatescoreById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.team2Gols += 1;

  await TeamMWData.save();
  res.json("Team two  increased by 1 sucessfully", TeamMWData);
}
async function updatescore_ById(req, res) {
  const TeamMWData = await match.findById(req.params.id);
  TeamMWData.team2Gols -= 1;

  await TeamMWData.save();
  res.json("Team two  decreased by 1 sucessfully", TeamMWData);
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
  getmatchByTouernement,
  verifyTicket,
  findMatchesByTournId,
  getmatchBygroup,

  getAllematchByNameTeam,
};
