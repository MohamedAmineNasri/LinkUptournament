const academy = require('../Models/Academy')



const getAllAcademies = async (req, res, next) => {
        const academies = await academy.find();
        res.json(academies);  
};

const addAcademy =  async (req, res, next) => {
    const { AcademyName } = req.body;
    try {   
    const existingAcademy = await academy.findOne({AcademyName});
    if (existingAcademy) {
        return res.json({status : false});
    }     
        const academyData = new academy()
        academyData.AcademyName = req.body.AcademyName;
        academyData.Location = req.body.Location;
        academyData.Logo = req.body.Logo;
        academyData.FoundedYear = req.body.FoundedYear;
        academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
        await academyData.save()
    return res.json({
            id:academyData._id,
            message : "Academy sucessfully added ! ",
            status : true
        });
    }catch (error) {
        console.error("Error adding academy:", error);
        res.status(500).json( "Internal server error" );
    }}


const updateAcademy = async (req,res,next)=>{
    const { AcademyName } = req.body;
    try {   
    const existingAcademy = await academy.findOne({AcademyName});
    if (existingAcademy) {
        return res.json(false);
    }     
    const academyData = await academy.findById(req.params.id);
    academyData.AcademyName = req.body.AcademyName;
    academyData.Location = req.body.Location;
    academyData.Logo = req.body.Logo;
    academyData.FoundedYear = req.body.FoundedYear;
    academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
    academyData.Status = req.body.Status;
    await academyData.save()
    return res.json(true);
    }catch (error) {
        console.error("Error updating academy a:", error);
        res.status(500).json( "Internal server error" );
    }}

const updateAcademyforduplicateName = async (req,res,next)=>{
    const academyData = await academy.findById(req.params.id);
    academyData.AcademyName = req.body.AcademyName;
    academyData.Location = req.body.Location;
    academyData.Logo = req.body.Logo;
    academyData.FoundedYear = req.body.FoundedYear;
    academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
    academyData.Status = req.body.Status;
    await academyData.save()
    return res.json("success");
    }
    


const getAcademyById =  async (req,res,next)=>{
    const academyData = await academy.findById(req.params.id);
    res.json(academyData);
}




const getAcademyByIdParam =  async (Aid)=>{
    const academyData = await academy.findById(Aid);
    return academyData;
}



const deleteAcademyById =  async (req,res,next)=>{
    const academyData = await academy.findByIdAndDelete(req.params.id);
    res.json("deleted sucessfully" + academyData);
}






// admin ---------------------------------------------
const updateStatustoApproved = async (req,res,next)=>{
    const academyData = await academy.findById(req.params.id);
    academyData.Status = "Approved";
    await academyData.save()
    res.json("Academy's Status updated sucessfully");
}
const updateStatustoRejected = async (req,res,next)=>{
    const academyData = await academy.findById(req.params.id);
    academyData.Status = "Rejected";
    await academyData.save()
    res.json("Academy's Status updated sucessfully");
}
//---------------------------------------------



module.exports = { getAllAcademies,addAcademy, deleteAcademyById, getAcademyById,getAcademyByIdParam,updateAcademy,updateStatustoApproved,updateStatustoRejected,updateAcademyforduplicateName};