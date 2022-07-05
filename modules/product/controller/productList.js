const commentModel = require("../../../DB/model/comment")
const productModel = require("../../../DB/model/product")




const productList = async(req,res)=>{


const product = await productModel.find({}).populate(
  
    {
        path:'comments',
        populate:[{
            path:'createdBy',
            Math:{isDeleted:false},
            select:'name email'
        },
        {
            path:'replys',
            Math:{isDeleted:false},
            populate:[{ path:'createdBy',
            select:'name email'},
            {
                path:'replys',
                Math:{isDeleted:false},
                populate:[{path:'createdBy',
                select:'name email'}]
            }
        ]
        },

    ]
    }
    
)

res.status(200).json({message:"done", product})





}



module.exports = productList