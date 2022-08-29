const Data = require('../Models/dataModels');


exports.postData =async (req,res,next) =>{
   try {

     const {latitude, longitude} = req.body;
     const data = await Data.create({
          latitude,
          longitude,
     });

     return res.json({status: true, data});

   } catch (error) {
        next(error)
   }
}

exports.getdata = async (req, res, next) =>{
     try{
        const data = await Data.find();

        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            error: "Sever Error"
        })
    }
}
