const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,'username must be greater than 3 character']
    },
    name:{
        type:String,
        required:true,
        minlength:[2,'name must be greater than 3 character']
    },
    age:{
       type:String,
       required:true
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
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId, ref:"post"
    }]
}, {
    timestamps:true
})

const User = mongoose.model('User',userSchema);

module.exports = User;