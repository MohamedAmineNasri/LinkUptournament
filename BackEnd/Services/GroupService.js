const Group = require('../Models/Group') ; 
const Tournament = require('../Models/Tournament') ; 
const Team = require('../Models/Team') ; 

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
const createGroups = async (req, res , next) => {
  const tournament = await Tournament.findById(req.params.id);
  let teamsChunks = [];

  switch(tournament.type) {
    case 'Group Stage Tournament':
      const numGroups = Math.ceil(tournament.teams.length/ 4);
      for (let i = 0; i < tournament.teams.length; i += 4) {
        teamsChunks.push(tournament.teams.slice(i, i + 4).map(team => ({
          team: team,
          MJ: 0,
          G: 0,
          N: 0,
          P: 0,
          BP: 0,
          BC: 0,
          DB: 0,
          PTS: 0
        })));
      }
      for (let j = 0; j < numGroups; j++) {
            const groupName = 'Group ' + String.fromCharCode(65 + j);
            const group = new Group({
              name: groupName,
              tournament: tournament,
              teams: teamsChunks[j]
            });
            await group.save();
           }
      break;
    case 'Round Robin Tournament':
      const group = new Group({
        name: 'Group A',
        tournament: tournament,
        teams: tournament.teams.map(team => ({
          team: team,
          MJ: 0,
          G: 0,
          N: 0,
          P: 0,
          BP: 0,
          BC: 0,
          DB: 0,
          PTS: 0
        }))
      });
      await group.save();
      break;
    default:
      res.status(400).json({ message: 'Invalid tournament type' });
      return;
  }

  // Save the groups back to the tournament and save it
  //tournament.groups = teamsChunks;
  //await tournament.save();

  res.json({
    message : "Groups successfully created!",
    tournament: tournament
  });
};




// const createGroupsStage = async (req, res , next) => {
//   // Trouver le tournoi par son identifiant et attendre le résultat avec le mot-clé await
//   const tournament = await Tournament.findById(req.params.id);
//   // Créer un tableau pour stocker les groupes
//   const groups = [];
//   // Obtenir le nombre d'équipes
//   const numTeams = tournament.teams.length;
//   // Calculer le nombre de groupes nécessaires
//   const numGroups = Math.ceil(numTeams / 4);
//   // Diviser le tableau des équipes en sous-tableaux de taille 4
//   const teamsChunks = [];
//   for (let i = 0; i < numTeams; i += 4) {
//     teamsChunks.push(tournament.teams.slice(i, i + 4).map(team => ({
//       team: team,
//       MJ: 0,
//       G: 0,
//       N: 0,
//       P: 0,
//       BP: 0,
//       BC: 0,
//       DB: 0,
//       PTS: 0
//     })));
//   }
//   // Créer un groupe pour chaque sous-tableau
//   for (let j = 0; j < numGroups; j++) {
//     const groupName = 'Group ' + String.fromCharCode(65 + j);
//     const group = new Group({
//       name: groupName,
//       tournament: tournament,
//       teams: teamsChunks[j]
//     });
//     // Ajouter le groupe au tableau
//     await group.save();
//     res.json({
//        message : "Group sucessfully added ! "
//     });
//   }
//   // Afficher le résultat
//   console.log('Les groupes ont été créés avec succès.');
// };
const updateGrouptri = async (id , req, res , next) => {
  console.log('updateGrouptri called');
  const group = await Group.findById(id);
  console.log('Group found:', group);
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
  console.log('Group updated and saved');
};

const updateMG = async (groupId, teamId, newpts, req, res, next) => {
  console.log('updateMG called with groupId, teamId, newMG:', groupId, teamId, newpts);
  const group = await Group.findById(groupId);
  console.log('Group found:', group);
  const team = group.teams.find(t => t.team.toString() === teamId);
  console.log('Team found:', team);
  team.PTS = req.body.newpts;
  console.log(team.PTS) ; 
  await group.save();
  console.log('Group with updated MG saved');
  await updateGrouptri(groupId , req, res, next);
  res.json(group)
};






module.exports = {addGroup,deleteGroupById,getAllGroups , getGroupById , updateGroup , createGroups  , updateGrouptri , updateMG , getGroupsByTournamentId};