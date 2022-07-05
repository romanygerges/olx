const mongoose =require('mongoose')
const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    ProductDesc: {
        type: String,
        required: true,
    },
    ProductPrice:{
        type: Number,
        required: true
    },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      Hidden: {
        type: Boolean,
        default: false,
      },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      wishList:{type:Array},
    
  
}, {
    timestamps: true
})







const productModel = mongoose.model('product',productSchema)


module.exports = productModel