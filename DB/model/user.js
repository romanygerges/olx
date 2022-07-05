const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    Blocked: {
        type: Boolean,
        default: false
      },
      confirmed: {
        type: Boolean,
        default: false
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
    profilePic:{type:Array},
    coverPic:{type:Array},
    wishList:[{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    phone: String,
    code:String,
    confirmEmail: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
    isLoggedIn:{type:Boolean, default:false},
  
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, parseInt(process.env.SALTROUND))
  next()
})

/*userSchema.pre('findOneAndUpdate', async function (next) {
 console.log(this.model);
 console.log(this.getQuery());
 const hookData = await this.model.findOne(this.getQuery()).select("__V")
 this.set({ __v: hookData.__v + 1 })
 next()
})*/





const userModel = mongoose.model('User',userSchema)


module.exports = userModel