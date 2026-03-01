const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerUser(req,res){
   const {username,email,password,role="user"} = req.body;

const isUserAlreadyExist = await userModel.findOne({
    $or:[
        {username},             //koi ek condition bhi hit ho jaye like or operator
        {email}
    ]
})
if(isUserAlreadyExist){
  return  res.status(409).json({
    message:"User already exists"
  })
}

//password hashing
const hashPassword = await bcrypt.hash(password,10);
const user = await userModel.create({
    username,
    email,
    password:hashPassword,
    role
})
const token = jwt.sign({
    id:user._id,
    role:user.role,
},process.env.JWT_SECRET)

res.cookie('token',token)

res.status(201).json({
    message:"User registered successfully",
    user
})


}

async function loginUser(req,res){
   const {username , email, password} = req.body;

   const user = await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
   })

   if(!user){
    return res.status(401).json({
        message:"Inavlid credentials"
    })
   }

   const isPasswordValid = bcrypt.compare(password,user.password);
   if(!isPasswordValid){
    return res.status(401).json({
        message:"Inavlid credentials"
    })
   }
   
   const token = jwt.sign({
    id:user._id,
    role:user.role
   },process.env.JWT_SECRET)

   res.cookie("token",token);

   res.status(200).json({
    message:"Logged in successfully",
    user
   })

}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"Logged out successfully"
    })
}

module.exports = { registerUser,loginUser, logoutUser }