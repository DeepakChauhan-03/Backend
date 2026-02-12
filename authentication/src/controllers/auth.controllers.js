const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerUser(req,res){
   const { name,email,password } = req.body;

   const isUserAlreadyExists = await userModel.findOne({email})
   if(isUserAlreadyExists){
    return res.status(409).json({
        message:"User already exists"
    })
   }
   //password hashing
   const hashPassword = await bcrypt.hash(password,10)

   const user = await userModel.create({
    name,
    email,
    password:hashPassword
   })

   const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET)

   res.cookie("token",token) 

   res.status(201).json({
    message:"User register successfully",
    user,
    token
   })
}

async function loginUser(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET,
{ expiresIn:"7d" })

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user
    })
}


module.exports = {registerUser, loginUser};