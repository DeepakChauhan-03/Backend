const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'username must be greater than 3 character']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'password must be grater than 6 char'],
        trim:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;