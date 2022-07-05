const Joi = require('joi')








const profile = {

headers: Joi.object().required().keys({

authorization : Joi.string().required()


}).options({allowUnknown: true})



}

const profile2 = {
    body: Joi.object().required().keys({

        name:Joi.string().required()
    })
}


const updatePasswodValid = {
    body: Joi.object().required().keys({


        newpassword:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        confirmPassword:Joi.string().valid(Joi.ref('newpassword')).required()
    })
}

const updateEmail = {
    body: Joi.object().required().keys({

newEmail: Joi.string().email().required(),
password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    })
}

module.exports = {
    profile,
    profile2,
    updatePasswodValid,
    updateEmail
}