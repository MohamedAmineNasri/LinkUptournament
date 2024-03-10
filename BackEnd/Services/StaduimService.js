const Staduim = require("../Models/Staduim")

const getAllStaduims = async (req, res, next) => {
    const staduims = await Staduim.find();
    res.json(staduims);  
};


const addStaduim =  async (req, res, next) => {
    const { name, location } = req.body;
    const StaduimData = new Staduim({ name ,location });
    (await StaduimData.save());
    res.json({
        message : "Team sucessfully added ! "
    });
}

const getStaduimById =  async (req,res,next)=>{
    const s = await Staduim.findById(req.params.id);
    res.json(s);
}

const deleteStaduimById =  async (req,res,next)=>{
    const s = await Staduim.findByIdAndDelete(req.params.id);
    res.json("deleted sucessfully" + s);
}
const updateStaduim = async (req,res,next)=>{ 
    try {
      const s = await Staduim.findByIdAndUpdate(req.params.id , req.body) ;
      if(!s){
        return res.status(404).json({message : 'no stadium with ${id}'})
      } 
    } catch (error) {
        res.status(500).json({message : error.message})   
    }

   
}

module.exports = {getAllStaduims, addStaduim , getStaduimById, deleteStaduimById , updateStaduim};