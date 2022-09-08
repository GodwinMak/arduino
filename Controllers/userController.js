const AnimalControlUser = require("../Models/userModel");
const brcypt = require("bcrypt");


// @desc  sign user
// @route POST /api/v1/user
// @access Public

exports.sign = async (req,res,next) =>{
    try {

        const {username, email, password} = req.body;
        const usenameCheck = await Users.findOne({username});

        if(usenameCheck){
            return res.json({msg: " user name already exist", status: false});
        }

        const hashedPassword = await brcypt.hash(password, 10);

        const animalControlUser = await AnimalControlUser.create({
            username,
            email,
            password: hashedPassword,
        });

        delete user.password;
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
        const user = await Users.findOne({username});
        if(!user){
            return res.json({msg: "incorrect username or password", status: false});
        }
        const isPasswordValid = await brcypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({msg: "incorrect username or password", status: false});
        }
        delete user.password
        
        return res.json({status: true, user});
    }catch(error){
        next(error);
    }
}

// @desc  get user
// @route POST /api/v1/user
// @access Public
exports.getUsers = async (req, res, next)=>{
    try{
        const user = await Users.find();

        return res.status(200).json({
            success: true,
            count: user.length,
            data: user
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            error: "Sever Error"
        })
    }
}