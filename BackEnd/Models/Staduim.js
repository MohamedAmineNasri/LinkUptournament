const mongoose = require("mongoose");

const StaduimSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      require ,
    },
    capacity: {
      type:Number,
    },
    location: {
      type: String,
      require ,
    },
    
  }, {
         timestamps :true
    } , 
);

module.exports = mongoose.model("stadium", StaduimSchema);
