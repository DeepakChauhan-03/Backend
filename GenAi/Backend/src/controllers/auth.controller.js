const userModel = require("../models/user.model");
const tokenBlacklistModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Resgister a new user
async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Provide email, username and password",
    });
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists with this username or email",
    });
  }
//creating new user

//password Hashing
const hashPassword = await bcrypt.hash(password,10)
  
const user = await userModel.create({
    username,
    email,
    password:hashPassword
})

//token 
const token = jwt.sign(
    {id:user._id, username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
res.cookie("token",token)
res.status(201).json({
    message:"User registered successfully",
    user
})

}

//Login User
async function loginUserController(req,res){
    const {email, password} = req.body;
const user = await userModel.findOne({email})

if(!user){
    return res.status(400).json({
        message:"invalid email or password"
    })
}

const isPasswordValid = await bcrypt.compare(password,user.password)
if(!isPasswordValid){
    return res.status(400).json({
        message:"Inavlid email or password"
    })
}
//token creation
const token = jwt.sign(
    {id:user._id, username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
res.cookie("token",token)
res.status(201).json({
    message:"User loggedIn successfully",
    user
})

}

//LogOut User
async function logoutUserController(req,res){
  const token = req.cookies.token
  if(token){
    await tokenBlacklistModel.create({
        token
    })
  }
  res.clearCookie("token")
  res.status(200).json({
    message:"User Logged Out successfully"
  })
}

//get the current logged in user details
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = { registerUserController , loginUserController, logoutUserController, getMeController};
