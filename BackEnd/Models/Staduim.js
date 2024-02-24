const mongoose = require("mongoose");

const StaduimSchema = new mongoose.Schema(
  {
    StaduimId: Number,

    name: {
      type: String,
      required : [true , "Staduim Name is required !!"],
    },
    location: {
      type: String,
      required : [true ,  "Location is required !!"],
    },
    
  }, {
         timestamps :true
    } , 
);

module.exports = mongoose.model("stadium", StaduimSchema);
