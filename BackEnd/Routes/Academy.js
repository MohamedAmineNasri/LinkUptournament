var express = require('express')
var router = express.Router();
const academyService = require('../Services/AcademyService')

router.get("/" , academyService.getAllAcademies);

router.post("/addAcademy",academyService.addAcademy);

router.get("/getAcademy/:id" ,academyService.getAcademyById);



router.delete("/deleteAcademy/:id" ,academyService.deleteAcademyById);

router.put("/editAcademy/:id" ,academyService.updateAcademy );
router.put("/updateAcademyforduplicateName/:id" ,academyService.updateAcademyforduplicateName );

router.put("/updateStatustoApproved/:id" ,academyService.updateStatustoApproved );
router.put("/updateStatustoRejected/:id" ,academyService.updateStatustoRejected );


module.exports =router;