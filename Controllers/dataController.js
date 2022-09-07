const Data = require('../Models/dataModels');


exports.postData =async (req,res,next) =>{
   try {

     const {objectName,latitude, longitude} = req.body;
     const data = await Data.create({
        objectName,
        latitude,
        longitude,
     });

     return res.json({status: true, data});

   } catch (error) {
        next(error)
   }
}


 
exports.getAnimal = async (req,res,next) =>{
    try {
        
        const data = await Data.find()

        return res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        next(error);
    }
    
}
