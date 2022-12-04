const { AnimalControlUser, validate} = require("../Models/userModel");
const brcypt = require("bcrypt");
const Joi = require("joi");
const Token = require("../Models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc  sign user
// @route POST /api/v1/user
// @access Public

exports.sign = async (req,res) =>{
    try {
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }

        const usenameCheck = await AnimalControlUser.findOne({username: req.body.username});
        let emailCheck = await AnimalControlUser.findOne({email: req.body.email});

        if(usenameCheck){
            return res.status(409).send({message: "User with given name already exist"});
        };

        if(emailCheck){
            return res.status(409).send({message: "User with given Email already exist"});
        }
        
        
        const salt = await brcypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await brcypt.hash(req.body.password, salt);


       emailCheck = await new AnimalControlUser({...req.body, password: hashedPassword}).save();

       const token = await new Token({
        userId: emailCheck._id,
        token: crypto.randomBytes(32).toString("hex"),
       }).save();

       const url = `${process.env.BASE_URL}api/v1/${emailCheck._id}/verify/${token.token}`;

       await sendEmail(emailCheck.email, "Verify Email", url);
        res.status(201).send({message: "An Email sent to your account please verify"});

    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

exports.verify = async (req, res)=>{
    try {
        const user = await AnimalControlUser.findOne({_id: req.params.id});
        if(!user){
            return res.status(400).send({message: "Invalid link"});
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if(!token){
            return res.status(400).send({message: "Invalid link"})
        }

        await AnimalControlUser.updateOne({_id: user._id, verified: true});
        await token.remove()

        res.status(200).send({message: "Email verified Successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

// @desc  login user
// @route POST /api/v1/user
// @access Public
exports.login = async (req, res, next) =>{

    try{
        const {error} = validation(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        // const {username, password} = req.body;
        const animalControlUser = await AnimalControlUser.findOne({username: req.body.username});
        if(!animalControlUser){
            // return res.json({msg: "incorrect username or password", status: false});
            return res.status(401).send({message: "Invalid User Name or password"});
        }
        const isPasswordValid = await brcypt.compare(req.body.password, animalControlUser.password);
        if(!isPasswordValid){
            // return res.json({msg: "incorrect username or password", status: false});
            return res.status(401).send({message: "Invalid User Name or password"});
        }
        // delete animalControlUser.password
        if(!animalControlUser.verified){
            let token = await Token.findOne({userId: animalControlUser._id});
            if(!token){
                token = await new Token({
                    userId: emailCheck._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save()
                const url = `${process.env.BASE_URL}api/v1/${emailCheck._id}/verify/${token.token}`;

                await sendEmail(emailCheck.email, "Verify Email", url);
            }
            return res.status(400).send({message: "An Email sent to your account please verify"})
        }
        const token = animalControlUser.generateAuthToken();
        
        // return res.json({status: true, animalControlUser});
        res.status(200).send({data: token, message: "Logged in successfully"});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

const validation = (data) =>{
    const schema = Joi.object({
        username:Joi.string().required().label("User Name"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
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