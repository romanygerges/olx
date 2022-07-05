const userModel = require('../../../DB/model/user');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sendEmail = require("../../../services/sendmail");


const signup = async (req,res)=>{
    try {
        const {name, email, password} = req.body;
    const newUser = new userModel({name, email, password});
    const savedUser = await newUser.save()
    const token = jwt.sign({id:savedUser._id},process.env.emailTokenSecret,{expiresIn:5*60})
    const URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
    const URL2 = `${req.protocol}://${req.headers.host}/api/v1/auth/resend token/${savedUser._id}`
    const message = `<a href="${URL}"><b>plz follow me to confim email</b></a> <br>
    <a href="${URL2}"><b>refresh token</b></a> `
    await sendEmail(savedUser.email, message)
    res.json({message:"done", savedUser})
    
    } 
    catch (error) {
        
        if(error.keyValue){
            if(error.keyValue.email){
                res.json({message:"email exist"})
            }
           
        }else{
            res.json({message:"catch sign up error",error })
        }
    }
    
    
    }

const confirmEmail = async (req,res)=>{
    try {
        const token = req.params.token
    
        const decoded = jwt.verify(token,process.env.emailTokenSecret)
        if (!decoded) {
            res.status(400).json({message:"unvalid decoded token"}) 
        } else {
            const findUser = await userModel.findById(decoded.id).select('confirmEmail')
    
            if (!findUser) {
                res.status(400).json({message:"unvalid account"}) 
            } else {
                if (findUser.confirmEmail) {
                    res.status(400).json({message:"account already confirm login"}) 
                } else {
                    await userModel.findOneAndUpdate({_id:findUser.id},{confirmEmail:true},{new:true})
                    res.status(200).json({message:"done"}) 
                }
            }
        }
    
    } 
    
    catch (error) {
        res.status(500).json({message:"catchch error"}) 
    }
    
    
    }

    const resendToken = async(req,res)=>{

const {id} = req.params
const user = await userModel.findById(id)

if (user.confirmEmail) {
    res.status(409).json({message:"already confirm"})
} else {
    const token = jwt.sign({id:user._id},process.env.emailTokenSecret,{expiresIn:2*60})
    const URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
    const URL2 = `${req.protocol}://${req.headers.host}/api/v1/auth/resend token/${user._id}`
    const message = `<a href="${URL}"><b>plz follow me to confim email</b></a> <br>
    <a href="${URL2}"><b>refresh token</b></a> `

    sendEmail(user.email, message)

    res.status(200).json({message:"done confirm your eamil"})
}

    }
    
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email , confirmEmail: true, isDeleted:false })
        if (!user) {
            res.json({ message: "in-valid email" })
        } else {
               
            if (!user.confirmEmail) {
                res.status(400).json({message:"please confirm your email"})
            } else {
                const match = await bcrypt.compare(password, user.password)
            if (match) {
                const token = jwt.sign({ id: user._id, isLoggedIn: true ,},
                    process.env.tokenSignature, { expiresIn: '24h' })

                res.json({ message: "Done", token })
            } else {
                res.json({ message: "in-valid email or password" })
            }
        }
            }


            
    } catch (error) {
        console.log(error)
        res.json({ message: "catch err ", error })

    }

}

const sendCode = async(req,res)=>{

try {
    const {email} = req.body;
const user = await userModel.findOne({email})

if (!user) {
    res.status(404).json({message:"account not exist"})
} else {
    const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    message = `<p>use this code : ${code}</p>`
    await userModel.findByIdAndUpdate(user._id , {code})
    sendEmail(email, message)
    
}
} catch (error) {
    res.status(404).json({message:"catch error"})
}


}

const forgetPassword = async(req,res)=>{
try {
    const {email, code , newPassword} = req.body;

const user = await userModel.findOne({email})
if (!user) {
    res.status(404).json({message:"invalid account"})
} else {
    if (user.code.toString() != code.toString()) {
        res.status(409).json({message:"wrong code"})
    } else {
        const hashPassword = await bcrypt.hash(newPassword , parseInt(process.env.saltRound))
        await userModel.findByIdAndUpdate(user._id , {password : hashPassword, code:""})
        res.status(200).json({message:"saved password"})
    }
}
} catch (error) {
    res.status(404).json({message:"catch error"})
}



}




const deleteEmail = async (req, res) => {
    try {
      const { email } = req.body
      const user = await userModel.findOneAndUpdate({ email },{ isDeleted: true },{ new: true })
      res.status(200).json({ message: 'deleted success',  user})
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'catch delete error' })
    }
  }

  const blockEmail = async (req, res) => {
    try {
      const { email } = req.body
      const user = await userModel.findOneAndUpdate({ email },{ Blocked: true },{ new: true })
      res.status(200).json({ message: 'deleted success',  user})
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'catch delete error' })
    }
  }
  
  













module.exports = {
    signup,
    login,
    confirmEmail,
    resendToken,
    sendCode,
    forgetPassword,
    deleteEmail,
    blockEmail
}