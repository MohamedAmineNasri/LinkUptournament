const Group = require('../Models/Group') ; 
const Tournament = require('../Models/Tournament') ; 
const Team = require('../Models/Team') ; 
const Match = require('../Models/match');

const getAllGroups = async (req, res, next) => {
    const groups = await Group.find();
    res.json(groups);  
};

const getGroupsByTournamentId = async (req, res, next) => {
  try {
    const tournamentId = req.params.id;
    const groups = await Group.find({ tournament: tournamentId });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGroup =  async (req, res, next) => {
    const { tournament , name, teams } = req.body;
    const GroupData = new Group({ tournament , name ,teams });
    (await GroupData.save());
    res.json({
        message : "Group sucessfully added ! "
    });
}


const getGroupById =  async (req,res,next)=>{
    const g = await Group.findById(req.params.id);
    res.json(g);
}

const deleteGroupById =  async (req,res,next)=>{
    const g = await Group.findByIdAndDelete(req.params.id);
    res.json("deleted sucessfully" + g);
}
const updateGroup = async (req,res,next)=>{
    try {
      const g = await Group.findByIdAndUpdate(req.params.id , req.body) ;
      if(!g){
        return res.status(404).json({message : 'no group with ${id}'})
      } 
    } catch (error) {
        res.status(500).json({message : error.message})   
    }

   
}


const createGroups = async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id);
  const numGroups = req.params.nbG;
  const numTeams = req.params.nbT;
  let teams;

  switch (tournament.type) {
    case 'Group Stage':
    case 'Group stage and Knockout':
      teams = [...tournament.teams.map(team => team.toString())]; // Convert ObjectId instances to strings

      // Create a map of team performances
      const teamPerformance = new Map();
      for (const teamId of teams) {
        const team = await Team.findById(teamId);
        const performance = team.Total_MatchesPlayed ? team.Total_MatchesWon / team.Total_MatchesPlayed : 0;
        teamPerformance.set(teamId, performance);
      }

      // Sort teams based on the performance map
      teams.sort((teamIdA, teamIdB) => {
        const performanceA = teamPerformance.get(teamIdA) || 0;
        const performanceB = teamPerformance.get(teamIdB) || 0;
        return performanceB - performanceA; // Sort in descending order based on performance
      });

      // Initialize an array of groups
      let groups = Array.from({length: numGroups}, () => []);

      // Distribute teams among groups
      for (let i = 0; i < teams.length; i++) {
        const teamId = teams[i];
        const teamDoc = await Team.findById(teamId);
        const groupIndex = i % numGroups; // Determine which group the team should go to
        groups[groupIndex].push({
          team: teamId,
          TeamName: teamDoc.TeamName,
          TeamLogo : teamDoc.TeamLogo,
          MJ: 0,
          G: 0,
          N: 0,
          P: 0,
          BP: 0,
          BC: 0,
          DB: 0,
          PTS: 0
        });
      }

      // Save the groups
      for (let j = 0; j < numGroups; j++) {
        const groupName = 'Group ' + String.fromCharCode(65 + j);
        const group = new Group({
          name: groupName,
          tournament: tournament,
          teams: groups[j]
        });
        await group.save();
       
      }
      break;

    default:
      res.status(400).json({ message: 'Invalid tournament type' });
      return;
  }

  res.json({
    message: "Groups successfully created!",
    tournament: tournament
  });
};








const updateGrouptri = async (id , req, res , next) => {
  
  const group = await Group.findById(id);
  
  group.teams.sort((a, b) => {
      if (b.PTS - a.PTS !== 0) {
          return b.PTS - a.PTS;
      } else if (b.BP - a.BP !== 0) {
          return b.BP - a.BP;
      } else {
          return a.BC - b.BC;
      }
  });
  await group.save();
  res.json(group);
  
};



const updateGroupAfterMatch = async (req, res, next) => {
  try {
  
      const match = await Match.findById(req.params.matchId);
      if (!match) {
          throw new Error('Match not found');
      }

      const group = await Group.findById(match.group);
  

      const team1 = group.teams.find(team => team.team.toString() === match.team1.toString());
      const team2 = group.teams.find(team => team.team.toString() === match.team2.toString());

      if (!team1 || !team2) {
          throw new Error('Team not found in the group');
      }

      // Update the match played (MJ) for both teams
      team1.MJ += 1;
      team2.MJ += 1;

      // Update the balls played (BP), balls conceded (BC), and difference in balls (DB) for both teams
      team2.BP += match.goal2.length  ;
      team1.BC += match.goal2.length ;
      team2.BC += match.goal1.length ;
      team1.BP += match.goal1.length  ;
      team1.DB = team1.BP - team1.BC;
      team2.DB = team2.BP - team2.BC;

      if (!match.w) {

          team1.PTS += 1;
          team1.N += 1;
          team2.PTS += 1;
          team2.N += 1;
      } else if (match.w.toString() === team1.team.toString()) {
        
          team1.PTS += 3;
          team1.G += 1;
          team2.P += 1;
      } else {

          team2.PTS += 3;
          team2.G += 1;
          team1.P += 1;
      }

      // Sort the teams in the group by PTS, DB, and BP
      group.teams.sort((a, b) => {
          if (b.PTS - a.PTS !== 0) {
              return b.PTS - a.PTS;
          } else if (b.DB - a.DB !== 0) {
              return b.DB - a.DB;
          } else {
              return b.BP - a.BP;
          }
      });

      await group.save();
      res.json(group);
      
  } catch (error) {
      console.error(error);
      next(error);
  }
};





const updateMG = async (groupId, teamId, newpts, req, res, next) => {
  
  const group = await Group.findById(groupId);
  
  const team = group.teams.find(t => t.team.toString() === teamId);
  
  team.PTS = req.body.newpts;
   
  await group.save();
  
  await updateGrouptri(groupId , req, res, next);
  res.json(group)
};






module.exports = {updateGroupAfterMatch ,  addGroup,deleteGroupById,getAllGroups , getGroupById , updateGroup , createGroups  , updateGrouptri , updateMG , getGroupsByTournamentId};