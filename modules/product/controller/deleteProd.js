const productModel = require("../../../DB/model/product")



const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params
      const product = await productModel.findByIdAndUpdate(id,{ isDeleted: true },{ new: true })
      res.status(200).json({ message: 'deleted success',  product})
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'catch delete error' })
    }
  }


module.exports = deleteProduct 