const mongoose = require("mongoose");


const animalControlUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        index: true,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        index: true,
    },
    password:{
        type: String,
        required: true,
        min: 8,
    }
    
})


module.exports=mongoose.model("AnimalControlUser",animalControlUserSchema);