var express = require('express')
var router = express.Router();
const groupService = require('../Services/GroupService')


router.get('/', groupService.getAllGroups); 
router.post('/add', groupService.addGroup) ;
router.post('/addGroupsTournament/:id', groupService.createGroupsRandom) ;
router.get('/:id', groupService.getGroupById);
router.put('/:groupId/team/:teamId/updateMG', async (req, res, next) => {
    console.log('PUT /:groupId/team/:teamId/updateMG called');
    const { groupId, teamId } = req.params;
    const { newMG } = req.body;
    console.log('Parameters:', groupId, teamId, newMG);
    try {
        await groupService.updateMG(groupId, teamId, newMG, req, res, next);
        res.json({ message: 'L\'attribut MG de l\'équipe a été mis à jour avec succès.' });
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
});
router.put("/updatetri/:id", groupService.updateGrouptri)
router.delete('/delete/:id', groupService.deleteGroupById) 
router.put('/update/:id' , groupService.updateGroup) 
router.put('/updateg/:id' , groupService.updateGrouptri) 
module.exports = router;