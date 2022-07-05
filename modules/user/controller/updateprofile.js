var bcrypt = require('bcryptjs');
const userModel = require('../../../DB/model/user');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../../services/sendmail');

const updateProfile = async (req, res) => {
    try {
      const { email } = req.user
      const { newemail, password } = req.body
      const userEmail = await userModel.findOne({ email })
      if (userEmail) {
        const match = bcrypt.compare(password, userEmail.password)
        if (match) {
          const user = await userModel.findOneAndUpdate({ email },{ email: newemail })
          const token = jwt.sign({_id: user._id,email: user.email,role: user.role},process.env.tokenSignature)
          const message = `<p><a href="${req.protocol}://${req.headers.host}/confirmEmail/${token}">Click here to confirm</a><p>`
          sendEmail(email, message)
          res.status(200).json({ message:'done' })
        } else {
          res.status(404).json({ message: 'email not exist' })
        }
      } else {
        res.status(404).json({ message: 'email not exist' })
      }
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'cath error' })
    }
  }



  module.exports = updateProfile