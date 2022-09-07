const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  objectName: {
    type: String,
    required: true
  },
  latitude:{
    type: String,
    required: true
  },
  longitude:{
    type: String,
    required: true
  },  
  createAt: {
        type: Date,
        default: Date.now
    }  
})


module.exports =mongoose.model('Data', DataSchema)
