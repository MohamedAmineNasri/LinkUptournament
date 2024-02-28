const mongoose = require("mongoose");

const StaduimSchema = new mongoose.Schema(
  {
    StaduimId: Number,

    name: {
      type: String,
      require ,
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
