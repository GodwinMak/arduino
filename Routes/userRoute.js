const router = require("express").Router();
const {sign, login, getUsers} = require('../Controllers/userController')



router
    .route('/sign')
    .post(sign);
    
router
    .route('/login')
    .post(login)

router
    .route('/getuser')
    .get(getUsers)    

module.exports= router;