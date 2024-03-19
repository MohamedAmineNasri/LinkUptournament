const academy = require('../Models/Academy')



const getAllAcademies = async (req, res, next) => {
        const academies = await academy.find();
        res.json(academies);  
};



const addAcademy =  async (req, res, next) => {
    const academyData = new academy()
    academyData.AcademyName = req.body.AcademyName;
    academyData.Location = req.body.Location;
    academyData.Logo = req.body.Logo;
    academyData.FoundedYear = req.body.FoundedYear;
    academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
    await academyData.save()
    res.json({
            id:academyData._id,
            message : "Academy sucessfully added ! "
        });
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



const updateAcademy = async (req,res,next)=>{
    const academyData = await academy.findById(req.params.id);
    academyData.AcademyName = req.body.AcademyName;
    academyData.Location = req.body.Location;
    academyData.Logo = req.body.Logo;
    academyData.FoundedYear = req.body.FoundedYear;
    await academyData.save()
    res.json("Academy updated sucessfully");
}




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



module.exports = { getAllAcademies,addAcademy, deleteAcademyById, getAcademyById,getAcademyByIdParam,updateAcademy,updateStatustoApproved,updateStatustoRejected};