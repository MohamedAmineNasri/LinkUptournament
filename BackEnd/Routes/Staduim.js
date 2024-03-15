var express = require('express')
var router = express.Router();
const staduimService = require('../Services/StaduimService')


router.get('/', staduimService.getAllStaduims); 
router.post('/add', staduimService.addStaduim ) ;
router.get('/:id', staduimService.getStaduimById);
router.delete('/delete/:id', staduimService.deleteStaduimById) 
router.put('/update/:id' , staduimService.updateStaduim) 
module.exports = router;