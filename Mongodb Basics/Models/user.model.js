const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
});

let UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;