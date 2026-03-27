const userModel = require('../models/user.model')
const crypto = require('crypto')

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

}

module.exports = {register}