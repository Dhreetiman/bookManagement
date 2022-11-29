const bookModel = require("../models/bookModel")
const authorization = async function(req,res,next){
    try{
        const id = req.id
        const userId1 = req.params.blogId
        const data = await bookModel.findById(userId1)
        const dataId  =  data.userId
        if(dataId!=id) return res.status(403).send({status:false,msg:"Unauthorised user"})
        next()
    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}
module.exports.authorization=authorization