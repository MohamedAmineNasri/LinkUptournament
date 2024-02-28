var express = require('express')
var router = express.Router();
const groupService = require('../Services/GroupService')


router.get('/', groupService.getAllGroups); 
router.post('/add', groupService.addGroup) ;
router.get('/:id', groupService.getGroupById);
router.delete('/delete/:id', groupService.deleteGroupById) 
router.put('/update/:id' , groupService.updateGroup) 
module.exports = router;