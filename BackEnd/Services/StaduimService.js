const Staduim = require('../Models/Stadium') ; 

const getAllStaduims = async (req, res, next) => {
    const staduims = await Staduim.find();
    res.json(staduims);  
};

const addStaduim =  async (req, res, next) => {
    try {

        const staduim = await Staduim.create(req.body)
        res.status(200).json(staduim);
        
    } catch (error) {
    res.status(500).json({message : error.message})
    }
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
      const s = await Stadium.findByIdAndUpdate(req.params.id , req.body) ;
      if(!s){
        return res.status(404).json({message : 'no stadium with ${id}'})
      } 
    } catch (error) {
        res.status(500).json({message : error.message})   
    }

   
}

module.exports = {getAllStaduims, addStaduim , getStaduimById, deleteStaduimById , updateStaduim};