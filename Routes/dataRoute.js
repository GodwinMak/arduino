const router = require("express").Router();
const {postData, getdata} = require("../Controllers/dataController");

 router
    .route('/data')
    .post(postData);
    // .put()
    // .delete()

 router
 .route('/getdata')
 .get(getdata);    

module.exports= router;
