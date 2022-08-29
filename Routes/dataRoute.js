const router = require("express").Router();
const {postData, getdata} = require("../Controllers/dataController");

 router
    .route('/data')
    .post(postData)
    .get(getdata);
    // .put()
    // .delete()

module.exports= router;
