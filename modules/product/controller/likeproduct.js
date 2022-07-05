const productModel = require("../../../DB/model/product")




const like_Prodduct = async(req,res)=>{



try {
    const { id } = req.params
const product = await productModel.findById(id)
if (!product) {
    res.status(404).json({message:"in valid product"})
} else {
   const saved = await productModel.findByIdAndUpdate(product._id, { $push:{likes:req.user_id}})
    res.status(200).json({message:"done"})
}
} catch (error) {
    res.status(404).json({message:"catch error"})
}
}


module.exports = like_Prodduct