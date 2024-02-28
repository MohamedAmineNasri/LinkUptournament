const Group = require('../Models/Group') ; 

const getAllGroups = async (req, res, next) => {
    const groups = await Group.find();
    res.json(groups);  
};

const addGroup =  async (req, res, next) => {
    const { tournament , name, teams } = req.body;
    const GroupData = new Group({ tournament , name ,teams });
    (await GroupData.save());
    res.json({
        message : "Group sucessfully added ! "
    });
}

const getGroupById =  async (req,res,next)=>{
    const g = await Group.findById(req.params.id);
    res.json(g);
}

const deleteGroupById =  async (req,res,next)=>{
    const g = await Group.findByIdAndDelete(req.params.id);
    res.json("deleted sucessfully" + g);
}
const updateGroup = async (req,res,next)=>{
    try {
      const g = await Group.findByIdAndUpdate(req.params.id , req.body) ;
      if(!g){
        return res.status(404).json({message : 'no group with ${id}'})
      } 
    } catch (error) {
        res.status(500).json({message : error.message})   
    }

   
}

module.exports = {addGroup,deleteGroupById,getAllGroups , getGroupById , updateGroup};