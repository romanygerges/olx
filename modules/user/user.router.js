const { auth } = require('../../middleware/auth')
const validation = require('../../middleware/validation')
const { myMulter, fileValidation } = require('../../services/multer')
const { displayProfile, profilePic, coverPic, qrcode } = require('./controller/profile')
const updatePassword = require('./controller/updatePass')
const updateProfile = require('./controller/updateprofile')
const { endPoint } = require('./user.endpoint')
const validators = require('../user/user.validation')
const userList = require('./controller/userList')
const router = require('express').Router()


router.get('/user',validation(validators.profile),auth(endPoint.profile),displayProfile)

router.patch('/user/profile/pic',validation(validators.profile),myMulter('user/profilepic',fileValidation.Image).single('image'),validation(validators.profile2),auth(endPoint.profile),profilePic)

router.patch('/user/cover/pic',auth(endPoint.profile),validation(validators.profile),myMulter('user/coverPics',fileValidation.Image).array('image',10),coverPic)

router.patch("/updatePassword" ,validation(validators.updatePasswodValid),auth(endPoint.update), updatePassword)

router.patch("/updateProfile" ,validation(validators.updateEmail),auth(endPoint.update), updateProfile)

router.get('/user',validation(validators.profile),auth(endPoint.profile),displayProfile)

router.get('/profile/qr',auth(endPoint.profile),qrcode)
module.exports = router