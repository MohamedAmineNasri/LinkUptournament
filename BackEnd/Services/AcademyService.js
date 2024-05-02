const academy = require('../Models/Academy')
const user =require('../Models/Users');
const Team = require('../Models/Team');
const { sendAcademyStatusEmail } = require('./AcademyStatusEmailSender');


const getAllAcademies = async (req, res, next) => {
  const academies = await academy
    .find()
    .populate({ path: "teams", select: "TeamName", model: "team" });
  res.json(academies);
};

const addAcademyAndAssaignToManager = async (req, res, next) => {
  const { AcademyName } = req.body;
  try {
    const existingAcademy = await academy.findOne({ AcademyName });
    if (existingAcademy) {
      return res.json({ status: false });
    }
    const academyData = new academy();
    academyData.AcademyName = req.body.AcademyName;
    academyData.Location = req.body.Location;
    academyData.Logo = req.body.Logo;
    academyData.FoundedYear = req.body.FoundedYear;
    academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
    academyData.user = req.body.ManagerID;
    await academyData.save();
    return res.json({
      id: academyData._id,
      message: "Academy sucessfully added ! ",
      status: true,
    });
  } catch (error) {
    console.error("Error adding academy:", error);
    res.status(500).json("Internal server error");
  }
};

const updateAcademy = async (req, res, next) => {
  const { AcademyName } = req.body;
  try {
    const existingAcademy = await academy.findOne({ AcademyName });
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
    await academyData.save();
    return res.json(true);
  } catch (error) {
    console.error("Error updating academy a:", error);
    res.status(500).json("Internal server error");
  }
};

const updateAcademyforduplicateName = async (req, res, next) => {
  const academyData = await academy.findById(req.params.id);
  academyData.AcademyName = req.body.AcademyName;
  academyData.Location = req.body.Location;
  academyData.Logo = req.body.Logo;
  academyData.FoundedYear = req.body.FoundedYear;
  academyData.LegitimacyDocuments = req.body.LegitimacyDocuments;
  academyData.Status = req.body.Status;
  await academyData.save();
  return res.json("success");
};

const getAcademyById = async (req, res, next) => {
  const academyData = await academy
    .findById(req.params.id)
    .populate({ path: "teams", select: "TeamName", model: "team" });
  res.json(academyData);
};

const getAcademyByMangerId = async (req, res, next) => {
  try {
    const academyData = await academy
      .findOne({ user: req.params.idmanger })
      .populate({ path: "teams", select: "TeamName", model: "team" });
    if (!academyData) {
      // return res.status(404).json({ message: 'Academy not found for the given user ID' });
      return res.json(false);
    }
    res.json(academyData);
} catch (error) {
  console.error("Error fetching academy:", error);
  res.status(500).json({ message: "Internal server error" });
}
};
  



const getAcademyByIdParam =  async (Aid)=>{
    const academyData = await academy.findById(Aid);
    return academyData;
}



const deleteAcademyById = async (req, res, next) => {
    try {
        const academyId = req.params.id;

        const academyData = await academy.findById(academyId);

        if (!academyData) {
            return res.status(404).json({ message: "Academy not found" });
        }

        if (academyData.teams && academyData.teams.length > 0) {
            await Promise.all(academyData.teams.map(teamId => Team.findByIdAndDelete(teamId)));
        }

        await academy.findByIdAndDelete(academyId);

        res.json({ message: "Academy and associated teams deleted successfully" });

    } catch (error) {
        next(error); 
    }
};



   





// admin ---------------------------------------------
const updateStatustoApproved = async (req, res, next) => {
  const academyData = await academy.findById(req.params.id);
  academyData.Status = "Approved";
  await academyData.save();
  //we retrive the manger  from academy's user id
  const mangerData = await user.findById(academyData.user);
  await sendAcademyStatusEmail(
    mangerData.email,
    mangerData.firstName,
    mangerData.lastName,
    academyData.Status
  );
  res.json("Academy's Status updated sucessfully");
};
const updateStatustoRejected = async (req, res, next) => {
  const academyData = await academy.findById(req.params.id);
  academyData.Status = "Rejected";
  await academyData.save();
  //we retrive the manger  from academy's user id
  const mangerData = await user.findById(academyData.user);
  await sendAcademyStatusEmail(
    mangerData.email,
    mangerData.firstName,
    mangerData.lastName,
    academyData.Status
  );
  res.json("Academy's Status updated sucessfully");
};
//---------------------------------------------

module.exports = {
  getAllAcademies,
  addAcademyAndAssaignToManager,
  getAcademyByMangerId,
  deleteAcademyById,
  getAcademyById,
  getAcademyByIdParam,
  updateAcademy,
  updateStatustoApproved,
  updateStatustoRejected,
  updateAcademyforduplicateName,
};
