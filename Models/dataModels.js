const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
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

// DataSchema.index({Data: 1}, {unique: true})

module.exports =mongoose.model('Data', DataSchema)
