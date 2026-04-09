const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

/**
 * Register User
 */
async function registerUser(req,res){
   const {username, email, password} = req.body;
    
   const isUserAlreadyExist = await userModel.findOne({email});
   if(isUserAlreadyExist){
    return res.status(409).json({
        message:"User already exist"
    })
   }
   //creating user
   const hashPass = await bcrypt.hash(password,10);
   const user = await userModel.create({
    username,
    email,
    password:hashPass
   })

   //token generation
     const token = jwt.sign({
        id:user._id
     },process.env.JWT_SECRET)

     res.cookie('token',token);

     res.status(201).json({
        message:"User registered successfully",
        user
     })

}

/**
 * Login User
 */
async function loginUser(req,res){
   const {email, password} = req.body;

   const user = await userModel.findOne({email});
   if(!user){
    return res.status(401).json({
        message:"Invalid credentials"
    })
   }
   //password verification
   const isPasswordValid = await bcrypt.compare(password,user.password);
   if(!isPasswordValid){
    return res.status(401).json({
        message:"Invalid Credentials"
    })
   }

   const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET)

   res.cookie('token',token);

   res.status(200).json({
    message:"Logged in successfully",
    user
   })
}

/**
 * Logout
 */
async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"Logged out successfully"
    })
}

module.exports = {registerUser,loginUser, logoutUser};