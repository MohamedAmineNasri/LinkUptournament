require("dotenv").config();
const Player = require("../Models/Player");
const Team = require("../Models/Team");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);
const assignPlayerToTeam = async (teamId) => {
    try {
        // Find the team by ID
        const team = await Team.findById(teamId);
        if (!team) {
            return;
        }

        // Find all players
        const players = await Player.find();

        // Assign each player to the team
        for (const player of players) {
            player.team = teamId;
            team.Players.push(player._id); // Assuming Players is an array of player IDs in Team model
            await player.save();
        }

        await team.save();
        console.log(`All players assigned to team ${teamId}`);

    } catch (error) {
        console.error("Error assigning players to team:", error);
    }
};

// Call the function with the team ID
assignPlayerToTeam("65ef6d0a8e10fa2e6ddc52ac");
