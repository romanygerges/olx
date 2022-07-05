var bcrypt = require('bcryptjs');
const userModel = require('../../../DB/model/user');


const updatePassword = async (req,res) =>{

    //try {
        const { email } = req.user
        const { newpassword, confirmPassword } = req.body
        if (newpassword === confirmPassword) {
          
          const hashPassword = await bcrypt.hash(newpassword, parseInt(process.env.saltRound))
          const newUser = await userModel.findOneAndUpdate({ email },{ password: hashPassword },{new : true}
          )
          res.json({ message: 'Done', user: newUser })
    
        } else {
          res.json({ message: 'password not match confirm password' })
        }
      /*}catch (error) {
        console.log(error)
        res.json({ message: 'catch error' })
      }*/




  }
  
module.exports = updatePassword