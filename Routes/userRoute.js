const router = require("express").Router();
const {sign, login, getUsers, verify} = require('../Controllers/userController')



router
    .route('/sign')
    .post(sign);

router
    .route("/:id/verify/:token")
    .get(verify);    
    
router
    .route('/login')
    .post(login);

router
    .route('/getuser')
    .get(getUsers);    

module.exports= router;