const Team =require('../Models/Team')
const Achievement =require('../Models/Achievement');
const Tachievement = require('../Models/Tachievement');

const getAllAchivements = async (req, res, next) => {
    const Achievements = await Achievement.find();
    res.json(Achievements);  
};

const addAchivementAndAssaignToAllTeams =  async (req, res, next) => {
const { Name } = req.body;
try {   
const existingAchievement = await Achievement.findOne({Name});
if (existingAchievement) {
    return res.json("failure , existing achivement name");
}   //CReate achievement
    const achievementData = new Achievement()
    achievementData.Name = req.body.Name;
    achievementData.Description = req.body.Description;
    achievementData.Icon = req.body.Icon;
    achievementData.Type = req.body.Type;
    achievementData.MileStone = req.body.MileStone;
    achievementData.Reward = req.body.Reward;
    // academyData.Status = req.body.Status ---> default NOTACTIVE
    await achievementData.save()
    //we extract all teams and assagin the new trophy in unlocked state to all of them 
    const allTeams = await Team.find();
for (const team of allTeams) {
    //insert achivement in team achivement list 
    team.Achievements.push(achievementData);
    await team.save();
    //insert into Tachivement table 
    const newTachievement = new Tachievement({
        Team: team._id,
        Achievement: achievementData._id, 
      });
      await newTachievement.save();
}

return res.json({status:true});
}catch (error) {
    console.error("Error adding achivement:", error);
    res.status(500).json( "Internal server error" );
}}


const updateAchievement = async (req,res,next)=>{
const { Name } = req.body;
try {   
const existingAchievement = await Achievement.findOne({Name});
if (existingAchievement) {
    return res.json({status : false});
}     
const AchievementData = await Achievement.findById(req.params.id);
AchievementData.Name = req.body.Name;
AchievementData.Description = req.body.Description;
AchievementData.Icon = req.body.Icon;
AchievementData.Type = req.body.Type;
AchievementData.MileStone = req.body.MileStone;
AchievementData.Reward = req.body.Reward;
AchievementData.Status = req.body.Status;
await AchievementData.save()
return res.json({status: true});
}catch (error) {
    console.error("Error updating achievement a:", error);
    res.status(500).json( "Internal server error" );
}}





const getAchievementById =  async (req,res,next)=>{
const Achievement = await Achievement.findById(req.params.id);
res.json(Achievement);
}


const getAchievementByIdParam =  async (Aid)=>{
const AchievementData = await Achievement.findById(Aid);
return AchievementData;
}



const deleteAchievementById =  async (req,res,next)=>{
const AchievementData = await Achievement.findByIdAndDelete(req.params.id);
const allTeams = await Team.find();
for (const team of allTeams) {
    team.Achievements = team.Achievements.filter(
        (aid) => aid.toString() !== req.params.id
      );
      await team.save(); 
    
}
// deleting all tachivements from db when achivement is deleted
const deletedTachievements = await Tachievement.deleteMany({
    Achievement: req.params.id,
  });
res.json("deleted sucessfully" + AchievementData);
}


module.exports = {addAchivementAndAssaignToAllTeams,updateAchievement,deleteAchievementById, getAchievementById,getAchievementByIdParam,getAllAchivements,};