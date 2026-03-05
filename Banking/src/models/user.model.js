const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
       type:String,
       required:[true, "Email is required for creating a user"],
       unique:[true, "email is already exist"],
       lowercase:true,
       trim:true
    },
    name:{
      type:String,
      required:[true, "Name is required to create a user"],
      trim:true
    },
    password:{
        type:String,
        required:[true, "Password is required for creating a user"],
        minlength:[6, "Password should be greater than 6 length"],
        select:false
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
   if(!this.isModified("password")){
    return 
   }

   const hash = await bcrypt.hash(this.password,10)
   this.password = hash
   return 

})

userSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;