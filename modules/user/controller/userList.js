const userModel = require("../../../DB/model/user")


const userList = async(req,res)=>{


    const user = await userModel.find({}).populate({

    path:'wishList',
    match:{isDeleted:false}
    },
    )
    
    
    
    
   
    
    
    res.status(200).json({message:"done", user})
    
    
    
    
    
    }

module.exports = userList