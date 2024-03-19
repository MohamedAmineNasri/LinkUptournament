var express = require('express')
var router = express.Router();
const academyService = require('../Services/AcademyService')

router.get("/" , academyService.getAllAcademies);

router.post("/addAcademy",academyService.addAcademy);

router.get("/getAcademy/:id" ,academyService.getAcademyById);
// router.get("/getApprovedAcademies" ,academyService.getApprovedAcademies);
// router.get("/getRejectedAcademies" ,academyService.getRejectedAcademies);
// router.get("/getPendingAcademies" ,academyService.getPendingAcademies);

router.delete("/deleteAcademy/:id" ,academyService.deleteAcademyById);

router.put("/editAcademy/:id" ,academyService.updateAcademy );

router.put("/updateStatustoApproved/:id" ,academyService.updateStatustoApproved );
router.put("/updateStatustoRejected/:id" ,academyService.updateStatustoRejected );


module.exports =router;