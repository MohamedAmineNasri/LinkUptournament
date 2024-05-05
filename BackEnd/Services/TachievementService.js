const Team =require('../Models/Team')
const Achievement =require('../Models/Achievement');
const Tachievement = require('../Models/Tachievement');


const getAllTeamsAchivements = async (req, res, next) => {
    const Achievements = await Tachievement.find();
    res.json(Achievements);  
};
const addTeamAchiv = async (req, res, next) => {
    const tachievementData = new Tachievement()
    tachievementData.Team = req.body.teamid
    tachievementData.Achievement =req.body.Achievement
    await tachievementData.save()
    return res.json(tachievementData);  
};

const getTeamAchivementsByTeamId = async (req, res, next) => {
    const Achievements = await Tachievement.find({ Team : req.params.idTeam });
    res.json(Achievements);  
};

const getDefaultAchivementsOfTeamByTeamId = async (req, res, next) => {
    var Activeachievements =[]
    var NonActiveachievements =[]
    const TeamData = await Team.findById(req.params.idTeam);
    const TeamAchievementData =await Tachievement.find({ Team : req.params.idTeam });
    for (const tachievement of TeamAchievementData) {
        if (tachievement.Status === "ACTIVE"){
            const DefaultAchivement = await Achievement.findById(tachievement.Achievement)
            Activeachievements.push(DefaultAchivement)
        }
        if (tachievement.Status === "NOTACTIVE"){
            const DefaultAchivement = await Achievement.findById(tachievement.Achievement)
            NonActiveachievements.push(DefaultAchivement)
        }
    }
    return res.json({"Active" :Activeachievements,"NonActive" : NonActiveachievements})
};

const updateTeamAchievementStatus = async (req,res,next)=>{
//we get the team by its id 
const TeamData = await Team.findById(req.params.idTeam);   
//when we enter team interface we get its achievements   
const TeamAchievementData =await Tachievement.find({ Team : req.params.idTeam });

for (const tachievement of TeamAchievementData) {
    //we get the default achivement to compare with milestone and type cuz we dont have them in teamachivement table
const DefaultAchivement = await Achievement.findById(tachievement.Achievement)
    //console.log(DefaultAchivement)
    if(DefaultAchivement.Type === "GOAL" && TeamData.Total_Goals_scored >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE" ){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "WIN" && TeamData.Total_MatchesWon >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "LOSE" && TeamData.Total_MatchesLost >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "DRAW" && TeamData.Total_MatchesDrawn >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "TOURNEMENT_RANK_1" && TeamData.Total_Tournement_win_1 >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "TOURNEMENT_RANK_2" && TeamData.Total_Tournement_second_2 >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "TOURNEMENT_RANK_3" && TeamData.Total_Tournement_third_3 >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
    if(DefaultAchivement.Type === "GAME" && TeamData.Total_MatchesPlayed >= DefaultAchivement.MileStone && tachievement.Status === "NOTACTIVE"){
        tachievement.Status = "ACTIVE"
        await tachievement.save();
    }
}

return res.json("executed with no probleme")

}



module.exports = {getAllTeamsAchivements,getTeamAchivementsByTeamId,addTeamAchiv,updateTeamAchievementStatus,getDefaultAchivementsOfTeamByTeamId};