const Joi = require('joi')




const signupValidate = {
    body: Joi.object().required().keys({

        name: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required().messages({
            'string.pattern.base':"plz follow our naming rules",
            'string.empty':'plz fuill in u name',
            'any.required':'plz send u name'
        }),
   
email: Joi.string().email().required(),
password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
cPassword:Joi.string().valid(Joi.ref('password')).required()
    })
}

const confirmEmail = {
    params: Joi.object().required().keys({

    token: Joi.string().required(),

    })
}

const loginValidate = {
    body: Joi.object().required().keys({

email: Joi.string().email().required(),
password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),

    })
}

const forgetPass = {
    body: Joi.object().required().keys({

        email: Joi.string().email().required(),
        newPassword:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword:Joi.string().valid(Joi.ref('newPassword')).required(),
        code:Joi.number().required
            })
}

/*const changePass = {
    body: Joi.object().required().keys({

        email: Joi.string().email().required(),
        Password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newPassword:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword:Joi.string().valid(Joi.ref('newPassword')).required()
            })

}*/













module.exports = {
    signupValidate,
    confirmEmail,
    loginValidate,
    forgetPass,
  //  changePass
    
}