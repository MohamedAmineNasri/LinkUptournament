const Team =require('../Models/Team')
const academyService = require('../Services/AcademyService')

const getAllTeams = async (req, res, next) => {
        const teams = await Team.find();
        res.json(teams);  
};

const addTeam =  async (req, res, next) => {
    const { TeamName, TeamLogo  } = req.body;
    const TeamData = new Team({ TeamName,TeamLogo });
    (await TeamData.save());
    res.json({
        message : "Team sucessfully added ! "
    });
}
const addTeamAndAssaignToAcademy =  async (req, res, next) => {
    const { TeamName, TeamLogo,academy  } = req.body;
    const TeamData = new Team({ TeamName,TeamLogo,academy });
    (await TeamData.save());
    res.json({
        message : "Team sucessfully added ! "
    });
}


const getTeamById =  async (req,res,next)=>{
    const TeamData = await Team.findById(req.params.id);
    res.json(TeamData);
}

const deleteTeamById =  async (req,res,next)=>{
    const teamData = await Team.findByIdAndDelete(req.params.id);
    res.json("deleted sucessfully" + teamData);
}




const updateTeamMatchesWon = async (req,res,next)=>{
    const TeamMWData = await Team.findById(req.params.id);
    TeamMWData.Total_MatchesWon = TeamMWData.Total_MatchesWon + 1;
    TeamMWData.Total_MatchesPlayed = TeamMWData.Total_MatchesPlayed + 1;
    await TeamMWData.save()
    res.json("Team victory increased by 1 sucessfully");
}



const updateTeamMatchesLost = async (req,res,next)=>{
    const TeamMLData = await Team.findById(req.params.id);
    TeamMLData.Total_MatchesLost = TeamMLData.Total_MatchesLost + 1;
    TeamMLData.Total_MatchesPlayed = TeamMLData.Total_MatchesPlayed + 1;
    await TeamMLData.save()
    res.json("Team Lost increased by 1 sucessfully");
}




const updateTeamMatchesDrawn = async (req,res,next)=>{
    const TeamMDData = await Team.findById(req.params.id);
    TeamMDData.Total_MatchesDrawn = TeamMDData.Total_MatchesDrawn + 1;
    TeamMDData.Total_MatchesPlayed = TeamMDData.Total_MatchesPlayed + 1;
    await TeamMDData.save()
    res.json("Team draw increased by 1 sucessfully");
}



const updateGoals_scored = async (req,res, next) => {
    
        const TeamData = await Team.findById(req.params.id);
        TeamData.Total_Goals_scored += 2; // test
        await TeamData.save();
        res.json("Goals numbers increased sucessfully");
   
};

const updateGoals_received = async (req,res, next) => {
    
        const TeamData = await Team.findById(req.params.id);
        TeamData.Total_Goals_received += 2; 
        await TeamData.save();
        res.json("Goals received  numbers increased sucessfully");
   
};






module.exports = { getAllTeams,addTeam, deleteTeamById, getTeamById,updateTeamMatchesWon,updateTeamMatchesLost,updateTeamMatchesDrawn,updateGoals_scored,updateGoals_received,addTeamAndAssaignToAcademy };