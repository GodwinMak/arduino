const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'animalControlUser',
        required: true,
        unique: true,
    },
    token:{
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }  
});

module.exports= mongoose.model('token', tokenSchema);
