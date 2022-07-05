const Joi = require('joi')



const likeProdduct = {

params: Joi.object().required().keys({

id: Joi.string().min(24).max(24)


})


}

const deleteProdductValidation = {

  params: Joi.object().required().keys({
  
  id: Joi.string().min(24).max(24)
  
  
  })
  
  
  }


const commentValidation = {

  body: Joi.object().required().keys({

    commentBody: Joi.string().optional()
      
      
      }),


params: Joi.object().required().keys({

id: Joi.string().min(24).max(24)


})


}

const updateCommentValidation = {

  body: Joi.object().required().keys({

    commentBody: Joi.string().optional()
      
      
      }),


params: Joi.object().required().keys({

commentId: Joi.string().min(24).max(24)


})


}


const deleteCommentValidation = {


params: Joi.object().required().keys({

commentId: Joi.string().min(24).max(24)


})


}


const replyValidation = {

  body: Joi.object().required().keys({

    commentBody: Joi.string().optional()
      
      
      }),


params: Joi.object().required().keys({

id: Joi.string().min(24).max(24),
commentId: Joi.string().min(24).max(24)



})


}

//productTitle, ProductDesc,ProductPrice 


const productValidation = {

  body: Joi.object().required().keys({

    productTitle: Joi.string().required(),
    ProductDesc: Joi.string().required(),
    ProductPrice: Joi.string().required()
      
      
      }),


params: Joi.object().required().keys({

id: Joi.string().min(24).max(24)


})


}














module.exports = {
  likeProdduct,
  commentValidation,
  replyValidation,
  productValidation,
  deleteProdductValidation,
  updateCommentValidation,
  deleteCommentValidation

    
}