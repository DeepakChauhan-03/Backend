const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


//Register Controller
async function register(req,res){
    const {username, email, password} = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
  if(isAlreadyRegistered){
    return res.status(409).json({
        message:"User already exist"
    })
  }
  //creating user
   const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
   
   const user = userModel.create({
    username,
    email,
    password:hashPassword
   })
   
   const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET,
{
    expiresIn:"1d"
})

res.status(201).json({
    message:"User registered successfully",
    user:{
        username:user.username,
        email:user.email
    },
    token
})

}

//GET-ME controller
async function getMe(req,res){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message:"User fetched successfully",
    user
  })

}

module.exports = {register, getMe}