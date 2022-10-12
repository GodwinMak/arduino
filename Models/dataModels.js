const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  objectName: {
    type: String,
    required: [true, "please name is requred"]
  },
  latitude:{
    type: Number,
    required: [true, 'please latitude is required']
  },
  longitude:{
    type: Number,
    required: [true, 'please longitude is required']
  },
  speed:{
    type: Number,
    required: [true, 'please speed is required']
  },
  altitude: {
    type: Number,
    required: [true, 'please altitude is required']
  },  
  createAt: {
        type: Date,
        default: Date.now
    }  
})


module.exports =mongoose.model('Data', DataSchema)
