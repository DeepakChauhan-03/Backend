const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
      type:String,
      required:[true,"Username is required"],
      lowercase:true,
      unique:[true,"Username should be unique"]
    },
    email:{
      type:String,
      required:[true,"email is required"],
      lowercase:true,
      unique:[true,"email should be unique"]
    },
    password:{
      type:String,
      required:[true,"password is required"]
    }
},{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;