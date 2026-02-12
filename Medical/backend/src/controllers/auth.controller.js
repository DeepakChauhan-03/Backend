const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerUser(req,res){
   const { name,email,gender,number,password } = req.body;

   const isUserAlreadyExists = await userModel.findOne({email})
   if(isUserAlreadyExists){
    return res.status(409).json({
        message:"User already exists"
    })
   }
   //password hashing
   const hashPassword = await bcrypt.hash(password.trim(),10)

   const user = await userModel.create({
    name,
    email,
    gender,
    number,
    password:hashPassword
   })

   const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET,
{ expiresIn:"30m" })

   res.cookie("token",token) 

   res.status(201).json({
    message:"User register successfully",
    user,
    token
   })
}
//login 
async function loginUser(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const isPasswordValid = await bcrypt.compare(password.trim(),user.password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"})
    }


    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET,
    { expiresIn:"30m" })

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user
    })
}



module.exports = {registerUser,loginUser};