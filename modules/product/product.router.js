const { auth } = require('../../middleware/auth')
const validation = require('../../middleware/validation')
const { AddProduct } = require('./controller/addproduct')
const {createComment, replyComment, deleteComment, updateComment} = require('./controller/comment')
const deleteProduct = require('./controller/deleteProd')
const like_Prodduct = require('./controller/likeproduct')
const productList = require('./controller/productList')

const unlike_Prodduct = require('./controller/unlikeproduct')
const endPointProd = require('./product.endpoint')
const validator = require('./product.validation')

const router = require('express').Router()



router.post('/addProduct',validation(validator.productValidation),auth(endPointProd.addProduct),AddProduct)

router.patch('/:id/like',validation(validator.likeProdduct),auth(endPointProd.addProduct),like_Prodduct)

router.patch('/:id/unlike',validation(validator.likeProdduct),auth(endPointProd.addProduct),unlike_Prodduct)

router.patch('/deleteProduct',validation(validator.deleteProdductValidation),auth(endPointProd.addProduct),deleteProduct)

router.get('/',productList)

router.post('/:id/comment',validation(validator.commentValidation),auth(endPointProd.addProduct),createComment)

router.patch('/:id/comment/:commentId/reply',validation(validator.replyValidation),auth(endPointProd.addProduct),replyComment)

router.patch('/comment/:commentId',validation(validator.eleteCommentValidation),auth(endPointProd.addProduct),deleteComment)

router.patch("/updateComment" ,validation(validator.updateCommentValidation),auth(endPointProd.addProduct), updateComment)

module.exports = router