const mongoose =require('mongoose')
const commentSchema = new mongoose.Schema({
    commentBody: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted:{type:Boolean , default:false},
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestams: true
  })







const commentModel = mongoose.model('Comment',commentSchema)


module.exports = commentModel