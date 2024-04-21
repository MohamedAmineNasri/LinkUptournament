
const Player = require("../Models/Player");

const Team =require('../Models/Team')
const Academy =require('../Models/Academy')
const academyService = require('../Services/AcademyService')

const getAllTeams = async (req, res, next) => {
        const teams = await Team.find().populate("Players");
        res.json(teams);
        console.log(teams);
};



const addTeam =  async (req, res, next) => {
    const { TeamName, TeamLogo  } = req.body; 
    const TeamData = new Team({ TeamName,TeamLogo });
    (await TeamData.save());
    res.json({
        message : "Team sucessfully added ! "
    });
}

const updateTeam = async (req,res,next)=>{
    const {TeamName} = req.body;
    try {
    const existingTeam = await Team.findOne({TeamName});
    if (existingTeam) {
        return res.json(false);
    }     
    const TeamData = await Team.findById(req.params.id);
    TeamData.TeamName = req.body.TeamName;
    TeamData.TeamLogo = req.body.TeamLogo;
    await TeamData.save()
    return res.json(true);
    }catch (error) {
        console.error("Error updating team :", error);
        res.status(500).json( "Internal server error" );
    }
}
const updateTeamSameName = async (req,res,next)=>{
    const TeamData = await Team.findById(req.params.id);
    TeamData.TeamName = req.body.TeamName;
    TeamData.TeamLogo = req.body.TeamLogo;
    await TeamData.save()
    return res.json("success");
    
}


const addTeamAndAssaignToAcademy = async (req, res, next) => {
    const { TeamName, TeamLogo, academy } = req.body;
    try {   
        const existingTeam = await Team.findOne({ TeamName });
        if (existingTeam) {
            return res.json(false);
        }     
        const TeamData = new Team({ TeamName,TeamLogo,academy });
        await TeamData.save();
        const targetAcademy = await academyService.getAcademyByIdParam(academy)
        targetAcademy.teams.push(TeamData);
        await targetAcademy.save();
        return res.json(true);
    } catch (error) {
        console.error("Error adding team and assigning to academy:", error);
        res.status(500).json( "Internal server error" );
    }
}




const getTeamById =  async (req,res,next)=>{
    const TeamData = await Team.findById(req.params.id);
    res.json(TeamData);
}
const getTeamById2 =   async (id)=>{
    const TeamData = await Team.findById(id);
    return TeamData;
}


const getTeamByAcademyId = async (req, res, next) => {
    try {
        const targetAcademy = await academyService.getAcademyByIdParam(req.params.id);
        console.log('Target Academy:', targetAcademy);

        const teamData = []; 

        // Check if the academy has teams
        if (targetAcademy.teams.length > 0 ) {
            for (const teamId of targetAcademy.teams) {
                const team = await Team.findById(teamId); 
                if (team) { // Check if team is found
                    teamData.push(team);
                } else {
                    console.log(`Team with ID ${teamId} not found`);
                }
            }
        } else {
            console.log('No teams found for the academy');
        }

        console.log('Team Data:', teamData);
        res.json(teamData);
    } catch (error) {
        console.error("Error adding team and assigning to academy:", error);
        res.status(500).json( "Internal server error" );
    }
}




const deleteTeamByIdandFromAcademy =  async (req,res,next)=>{
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
          return res.status(404).send('Team not found');
        }
    
        // Updating the corresponding academy's list of team IDs
        const academy = await Academy.findOneAndUpdate(
          { _id: team.academy },
          { $pull: { teams: team._id } },
          { new: true }
        );
    
        res.status(200).send('Team deleted successfully');
      } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).send('Internal Server Error');
      }
}



const updateTeamMatchesWon = async (req,res,next)=>{
    
    const TeamMWData = await Team.findById(req.params.id);
    //stats
    TeamMWData.Total_MatchesWon +=  1;
    TeamMWData.Total_MatchesPlayed +=  1;
    //Group stage
    TeamMWData.GS_MatchesWon += 1 
    TeamMWData.GS_MatchesPlayed +=1 
    TeamMWData.GS_Points += 3
    await TeamMWData.save()
    res.json(TeamMWData)
}



const cancelTeamMatchesWon = async (req,res,next)=>{

    const TeamMWData = await Team.findById(req.params.id);
    if(TeamMWData.Total_MatchesWon == 0 || TeamMWData.Total_MatchesPlayed == 0 || TeamMWData.GS_MatchesPlayed ==0  || TeamMWData.GS_MatchesWon ==0){
        res.json("you can't decrease further  ")
    }else{
        //stats
        TeamMWData.Total_MatchesWon -= 1;
        TeamMWData.Total_MatchesPlayed -= 1;
        //Group stage
        TeamMWData.GS_MatchesWon -= 1 ;
        TeamMWData.GS_MatchesPlayed -=1 ;
        TeamMWData.GS_Points -= 3
        await TeamMWData.save()
        res.json(TeamMWData)
    }
}



const updateTeamMatchesLost = async (req,res,next)=>{
   
    const TeamMLData = await Team.findById(req.params.id);
    //stats
    TeamMLData.Total_MatchesLost +=  1;
    TeamMLData.Total_MatchesPlayed += 1;
    //Group stage
    TeamMLData.GS_MatchesLost +=  1;
    TeamMLData.GS_MatchesPlayed += 1;
    TeamMLData.GS_Points += 0

    await TeamMLData.save()
    res.json(TeamMLData)
}



const cancelTeamMatchesLost = async (req,res,next)=>{

    const TeamMLData = await Team.findById(req.params.id);
    if(TeamMLData.Total_MatchesLost == 0 || TeamMLData.Total_MatchesPlayed == 0 || TeamMLData.GS_MatchesPlayed ==0 || TeamMLData.GS_MatchesLost ==0){
        res.json("you can't decrease further  ")
    }else{

        //stats
        TeamMLData.Total_MatchesLost -= 1;
        TeamMLData.Total_MatchesPlayed -= 1;
        
        //Group stage
        TeamMLData.GS_MatchesLost -=  1;
        TeamMLData.GS_MatchesPlayed -= 1;
        
        await TeamMLData.save()
        res.json(TeamMLData)
    }
}



const updateTeamMatchesDrawn = async (req,res,next)=>{

    const TeamMDData = await Team.findById(req.params.id);
    //stats
    TeamMDData.Total_MatchesDrawn += 1;
    TeamMDData.Total_MatchesPlayed += 1;
    //Group stage
    TeamMDData.GS_MatchesDrawn+= 1;
    TeamMDData.GS_MatchesPlayed += 1;
    TeamMDData.GS_Points += 1
    await TeamMDData.save()
    res.json(TeamMDData)
}



const cancelTeamMatchesDrawn = async (req,res,next)=>{
    const TeamMDData = await Team.findById(req.params.id);
    if(TeamMDData.Total_MatchesDrawn  == 0 || TeamMDData.Total_MatchesPlayed == 0 || TeamMDData.GS_MatchesPlayed ==0||TeamMDData.GS_MatchesDrawn ==0 ){
        res.json("you can't decrease further  ")
    }else{
        //stats
        TeamMDData.Total_MatchesDrawn -= 1;
        TeamMDData.Total_MatchesPlayed -= 1;
        //Group stage
        TeamMDData.GS_MatchesDrawn -= 1;
        TeamMDData.GS_MatchesPlayed -= 1;
        TeamMDData.GS_Points -= 1
        await TeamMDData.save()
        res.json(TeamMDData)
    }
}



const updateGoals_scored = async (req,res, next) => {
    
        const TeamData = await Team.findById(req.params.id);
        //stats
        TeamData.Total_Goals_scored += 1; 
        //Group Stage
        TeamData.GS_Goals_scored += 1; 
        TeamData.GS_Goals_difference = TeamData.GS_Goals_scored - TeamData.GS_Goals_received; 
        await TeamData.save();
        res.json(TeamData)
   
};



const cancelGoals_scored = async (req,res, next) => {
    
        const TeamData = await Team.findById(req.params.id);
        if(TeamData.Total_Goals_scored ==0 || TeamData.GS_Goals_scored ==0){
            res.json("you can't decrease further")
        }else{
        //stats
        TeamData.Total_Goals_scored -= 1;
        //Group Stage
        TeamData.GS_Goals_scored -= 1; 
        TeamData.GS_Goals_difference = TeamData.GS_Goals_scored - TeamData.GS_Goals_received;
        await TeamData.save();
        res.json(TeamData)
        }
};



const updateGoals_received = async (req,res, next) => {
    
        const TeamData = await Team.findById(req.params.id);
        //stats
        TeamData.Total_Goals_received += 1; 
        //Group stage
        TeamData.GS_Goals_received += 1; 
        TeamData.GS_Goals_difference = TeamData.GS_Goals_scored - TeamData.GS_Goals_received;
        await TeamData.save();
        res.json(TeamData)
   
};

const deleteTeamById = async (req, res, next) => {
  const teamData = await Team.findByIdAndDelete(req.params.id);
  res.json("deleted sucessfully" + teamData);
};



const cancelGoals_received = async (req,res, next) => {
    
        const TeamData = await Team.findById(req.params.id);
        if(TeamData.Total_Goals_received == 0 || TeamData.GS_Goals_received ==0){
            res.json("you can't decrease further")
        }else{
            //stats
            TeamData.Total_Goals_received -= 1; 
            //Group stage
            TeamData.GS_Goals_received -= 1;  
            TeamData.GS_Goals_difference = TeamData.GS_Goals_scored - TeamData.GS_Goals_received;
        await TeamData.save();
        res.json(TeamData)
        }
};

const resetGroupStageData = async (req,res, next) => {
    
  const TeamData = await Team.findById(req.params.id);
  TeamData.GS_MatchesWon = 0;
  TeamData.GS_MatchesLost = 0;
  TeamData.GS_MatchesDrawn = 0;
  TeamData.GS_MatchesPlayed = 0;
  TeamData.GS_Goals_scored = 0;
  TeamData.GS_Goals_difference = 0;
  TeamData.GS_Goals_received = 0;
  TeamData.GS_Points = 0;  
  await TeamData.save();
  res.json(TeamData)
  
};
//  i added this for testing  ------------------------------------------------------
const getPlayersByTeamId = async (req, res, next) => {
    try {
        const targetTeam = await getTeamById2(req.params.idTeam);
        console.log('Target team:', targetTeam);
  
        const playerData = []; 
  
        // Check if the academy has teams
        if (targetTeam.Players.length > 0 ) {
            for (const playerId of targetTeam.Players) {
                const player = await Player.findById(playerId); 
                if (player) { // Check if team is found
                  playerData.push(player);
                } else {
                    console.log(`player with ID ${playerId} not found`);
                }
            }
        } else {
            console.log('No teams found for the academy');
        }
  
        console.log('player Data:', playerData);
        res.json(playerData);
    } catch (error) {
        console.error("Error", error);
        res.status(500).json( "Internal server error" );
    }
  }
  
  // -----------------------------------------------------------------------------


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

const getTeamsByName = async (req, res, next) => {
    const searchString = req.params.searchString; // Get the search string from request parameters
    try {
        // Use a regular expression to search for teams by name containing the provided string
        const teams = await Team.find({ TeamName: { $regex: searchString, $options: 'i' } });
        res.json(teams);
    } catch (error) {
        console.error("Error getting teams by name:", error);
        res.status(500).json("Internal server error");
    }
};




module.exports = {getTeamsByName , getAllTeams,getTeamById2,getPlayersByTeamId, addTeam, deleteTeamById, getTeamById,updateTeamMatchesWon,updateTeamMatchesLost,updateTeamMatchesDrawn,updateGoals_scored,updateGoals_received,addTeamAndAssaignToAcademy,cancelTeamMatchesWon,cancelTeamMatchesLost,cancelTeamMatchesDrawn,cancelGoals_received,cancelGoals_scored,resetGroupStageData ,deleteTeamByIdandFromAcademy,getTeamByAcademyId,updateTeam,assignPlayerToTeam,updateTeamSameName};
