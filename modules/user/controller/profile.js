const userModel = require("../../../DB/model/user")
var QRCode = require('qrcode')

const displayProfile = async(req,res)=>{
try {
    console.log(req.user._id);
    const user = await userModel.findById(req.user._id)
res.json({message:'done',user})
}
catch (error) {
    res.json({message:'catch error',error})
}
}

const profilePic = async(req,res)=>{
    try {

        if (req.fileErr) {
            res.json({message:'invalid file type',error})
        } 
        else {
            const imgURL = `${req.findDistenation}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id, {profilePic:imgURL}, {new:true})
            res.json({message:'done',user})
        }
    }
    catch (error) {
        res.json({message:'catch error',error})
    }
    }

const coverPic = async(req,res)=>{
        try {
    
            if (req.fileErr) {
                res.json({message:'invalid file type',error})
            } 
            else {
                const URLS = []
                req.files.forEach(file => {
                    URLS.push(`${req.findDistenation}/${file.filename}`)
                });
                const user = await userModel.findByIdAndUpdate(req.user._id, {coverPic:URLS}, {new:true})
                res.json({message:'done',user})
            }
        }
        catch (error) {
            res.json({message:'catch error',error})
        }
        }


const qrcode = async(req,res)=>{

const user = await userModel.findOne({_id:req.user._id}).select('name email')

QRCode.toDataURL(`${req.protocol}://${req.headers.host}/user/profile/${user._id}  `, function (err, url) {
    if (err) {
        res.status(404).json({message:"qr code is error"})
    } else {
        res.status(200).json({message:"done",url})
    }

  })

        }

module.exports = {
    displayProfile,
    profilePic,
    coverPic,
    qrcode
}