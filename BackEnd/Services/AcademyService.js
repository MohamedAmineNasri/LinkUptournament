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


// const getApprovedAcademies =  async (req,res,next)=>{
//     const approvedAcademies = []
//     var i =0
//     const academyData = await academy.find()
//     academyData.forEach(academy => {
//         if(academy.Status =="Approved"){
//             approvedAcademies.push(academy)
//             i++
//         }
//     });
//     res.json(i);
// }


// const getRejectedAcademies =  async (req,res,next)=>{
//     const rejectedAcademies = []
//     var i =0
//     const academyData = await academy.find()
//     academyData.forEach(academy => {
//         if(academy.Status =="Rejected"){
//             rejectedAcademies.push(academy)
//             i++
//         }
//     });
//     res.json(i);
// }


// const getPendingAcademies =  async (req,res,next)=>{
//     const PendingAcademies = []
//     var i =0
//     const academyData = await academy.find()
//     academyData.forEach(academy => {
//         if(academy.Status =="Pending"){
//             PendingAcademies.push(academy)
//             i++
//         }
//     });
//     res.json(i);
// }



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
    academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
    academyData.Status = req.body.Status;
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