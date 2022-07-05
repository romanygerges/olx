const commentModel = require("../../../DB/model/comment");
const productModel = require("../../../DB/model/product");



const createComment = async (req,res)=>{

    const {id} = req.params;
    const {commentBody} = req.body;
    
    const product = await productModel.findById(id);
    if (!product) {
        res.status(404).json({message:"invalid product"})
    } else {
        const newComment = new commentModel({commentBody, createdBy:req.user_id,productId:product._id})
        const saveedComment = await newComment.save()
        const savedProduct =await productModel.findByIdAndUpdate(product._id , {comments:saveedComment._id}, { new:true })
        res.status(200).json({message:"done",saveedComment})
    }
    
    }


    const replyComment = async (req,res)=>{

        const {id , commentId} = req.params;
        const {commentBody} = req.body;
        
        const product = await productModel.findById(id).populate({
            path:'comments'
        });
        if (!product) {
            res.status(404).json({message:"invalid product"})
        } else {
           const comment = await commentModel.findOne({productId:product._id, _id:commentId})
         if (!comment) {
             res.status(400).json({message:"in valid comment"})
         } else {
            const newComment = new commentModel({commentBody, createdBy:req.user_id,productId:product._id})
            const saveedComment = await newComment.save()
            await commentModel.findByIdAndUpdate(comment._id , {$push:{replys:saveedComment._id}})
            res.status(200).json({message:"done reply",saveedComment })
         }
         
        }
        
        }


        const deleteComment = async (req, res) => {
            try {
              const {commentId} = req.params

              const comment = await commentModel.findById(commentId)
if (!comment) {
    res.json({message:"net find comment"})
} else {
    const deletecomment = await commentModel.findByIdAndUpdate( commentId ,{ isDeleted: true },{ new: true })
    res.status(200).json({ message: 'deleted success',  deletecomment})
}

            } catch (error) {           
              console.log(error)
              res.status(404).json({ message: 'catch delete error' })
            }
          }
        

          const updateComment = async (req, res) => {
            try {
              const { id } = req.params
              const { commentBody } = req.body
              const Comment = await userModel.findById(id)
              if (!Comment) {
                res.status(404).json({ message:'not found comment' })
              } else {
                const updateComment = await commentModel.findByIdAndUpdate(id,{ commentBody: commentBody })
                res.status(200).json({ message:'done comment' , updateComment })
              }
            } catch (error) {
              console.log(error)
              res.status(404).json({ message: 'cath error' })
            }
          }
    
    
    
    module.exports = {createComment, replyComment , deleteComment , updateComment}