const router = require("express").Router();
const {postData, getdata, getAnimal} = require("../Controllers/dataController");

 router
    .route('/data')
    .post(postData);
    // .put()
    // .delete()

//  router
//  .route('/getdata/:objectName')
//  .get(getdata);
 
 router
 .route("/getdata")
 .get(getAnimal);

module.exports= router;
