const jwt = require('jsonwebtoken');
const userModel = require('../DB/model/user');

const roles = {
    Admin:"admin",
    User:"user"
}
const auth = (userRole)=>{
    return async(req,res,next)=>{
        const headerToken = req.headers['authorization'];
        console.log(headerToken);

if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith(`${process.env.BearerKey} `)) {
    
res.json({message:'header token error'})


} else {
    
const token = headerToken.split(" ")[1];
    console.log(token);
    if (!token || token == null || token == undefined || token.length < 1) {
        
res.json({message:'in-valid token'})


    } 
    else {
        const decoded = jwt.verify(token , process.env.tokenSignature)
        console.log(decoded);
        const findUser = await userModel.findById(decoded.id).select('name email role')
        if (!findUser) {
            res.json({message:'in-valid loggin user'})
        } else {
            console.log(findUser);
            console.log(userRole);
            if (userRole.includes(findUser.role)) {
                req.user = findUser
                next()
            } else {
                res.json({message:'not authorized user'})
            }
           
        }
    }
}


}


    }



module.exports = {
    auth,
    roles
}