const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");


const animalControlUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        index: true,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    password:{
        type: String,
        required: true,
        min: 8,
    }
    
});

animalControlUserSchema.methods.generateAuthToken = () =>{
    const token = jwt.sign(
        {
            _id: this._id, 
            email: this.email, 
            username: this.username
        }, 
        process.env.JWTPRIVATEKEY,{expiresIn: "7d"}
    );
    return token;
}

const AnimalControlUser = mongoose.model("animalControlUser",animalControlUserSchema);

const validate = (data)=>{
    const schema = Joi.object({
        username: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = {
    AnimalControlUser,
    validate,
}
