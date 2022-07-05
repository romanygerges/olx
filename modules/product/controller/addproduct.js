const productModel = require("../../../DB/model/product")
const userModel = require("../../../DB/model/user")



const  AddProduct = async (req, res) => {
    try {
      const { _id } = req.user
      const { productTitle, ProductDesc,ProductPrice } = req.body
      const user = await userModel.findById(_id)
      if (!user) {
        res.status(404).json({message:"invalid product"})
    } else {
       /* const newComment = new commentModel({commentBody, createdBy:req.user_id,productId:product._id})
        const saveedComment = await newComment.save()
        const savedProduct =await productModel.findByIdAndUpdate(product._id , {comments:saveedComment._id}, { new:true })
        res.status(200).json({message:"done",saveedComment})*/
        const newProduct = new productModel({ productTitle, ProductDesc,ProductPrice, createdBy: _id  })
        const savedProduct = await newProduct.save()
        const savedUser =await userModel.findByIdAndUpdate(user._id , {wishList:savedProduct._id}, { new:true })
        res.status(201).json({ message: 'done'  , savedUser})
    }
     
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'fail' })
    }
  }


  /*replyOnreply = async (req, res) => {
    try {
      const { commid } = req.params
      const { replyBody } = req.body
      const reply = new commModel({ commBy: req.user._id, commBody: replyBody })
      const saved = await reply.save()
      const newcomm = await commModel.updateOne(
        { _id: commid },
        {
          $push: { replys: saved._id }
        }
      )
      res.json({ message: 'done' })
    } catch (error) {
      console.log(error)
      req.json({ message: 'fail' })
    }
  }*/

  module.exports = {
    AddProduct
  }