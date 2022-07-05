const router = require('express').Router()
const { auth } = require('../../middleware/auth')
const validation = require('../../middleware/validation')
const endPointuser = require('./auth.endpoint')
const validators = require('./auth.validation') 
const controller = require('./controller/registration')




router.post('/signup',validation(validators.signupValidate),controller.signup)

router.get('/confirmEmail/:token',validation(validators.confirmEmail),controller.confirmEmail)

router.get('/resendToken/:id',controller.resendToken)

router.post('/login',validation(validators.loginValidate),controller.login)

router.post('/sendCode',controller.sendCode)

router.patch('/forgetpassword', validation(validators.forgetPass),controller.forgetPassword)

router.patch('/deleteUser',auth(endPointuser.deleteUser),controller.deleteEmail)

router.patch('/blockUser',auth(endPointuser.deleteUser),controller.deleteEmail)




module.exports = router