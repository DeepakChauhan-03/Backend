const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:[3,'username must be greater than 3 character']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,'email must be greater than 13 character']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,'password must be greater than 5 character']
    }
}, {
    timestamps:true
})

const user = mongoose.model("Revision",userSchema);

module.exports = user;
