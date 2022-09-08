const AnimalControlUser = require("../Models/userModel");
const brcypt = require("bcrypt");


// @desc  sign user
// @route POST /api/v1/user
// @access Public

exports.sign = async (req,res,next) =>{
    try {

        const {username, email, password} = req.body;
        const usenameCheck = await animalControlUser.findOne({username});

        if(usenameCheck){
            return res.json({msg: " user name already exist", status: false});
        }

        const hashedPassword = await brcypt.hash(password, 10);

        const animalControlUser = await AnimalControlUser.create({
            username,
            email,
            password: hashedPassword,
        });

        delete animalControlUser.password;
        return res.json({status: true, animalControlUser});

    } catch (error) {
        next(error);
    }
}

// @desc  login user
// @route POST /api/v1/user
// @access Public
exports.login = async (req, res, next) =>{

    try{
        const {username, password} = req.body;
        const animalControlUser = await AnimalControlUser.findOne({username});
        if(!animalControlUser){
            return res.json({msg: "incorrect username or password", status: false});
        }
        const isPasswordValid = await brcypt.compare(password, animalControlUser.password);
        if(!isPasswordValid){
            return res.json({msg: "incorrect username or password", status: false});
        }
        delete animalControlUser.password
        
        return res.json({status: true, animalControlUser});
    }catch(error){
        next(error);
    }
}

// @desc  get user
// @route POST /api/v1/user
// @access Public
exports.getUsers = async (req, res, next)=>{
    try{
        const animalControlUser = await AnimalControlUser.find();

        return res.status(200).json({
            success: true,
            count: animalControlUser.length,
            data: animalControlUser
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            error: "Sever Error"
        })
    }
}