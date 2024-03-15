var express = require('express')
var router = express.Router();
const academyService = require('../Services/AcademyService')

router.get("/" , academyService.getAllAcademies);

router.post("/addAcademy",academyService.addAcademy);

router.get("/getAcademy/:id" ,academyService.getAcademyById);

router.delete("/deleteAcademy/:id" ,academyService.deleteAcademyById);

router.put("/editAcademy/:id" ,academyService.updateAcademy );

router.put("/editStatus/:id" ,academyService.updateStatus );


module.exports =router;