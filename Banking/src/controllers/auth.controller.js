const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const emailService = require('../services/email.service')


/** POST / User register  */
async function userRegisterController(req, res) {
  const { email, password, name } = req.body;
  const isExist = await userModel.findOne({
    email: email,
  });
  if (isExist) {
    return res.status(422).json({
      message: "user already exist with email",
      status: "Failed",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
 //email service
 await emailService.sendRegistrationEmail(user.email,user.name)

}

/** POST/User Login */
async function userLoginController(req,res){
    const { email, password} = req.body;

    const user = await userModel.findOne({ email }).select("password")
    if(!user){
        return res.status(401).json({
            message:"Email or password is Inavlid"
        })
    }
   const isPasswordValid = await user.comparePassword(password)
   if(!isPasswordValid){
    return res.status(401).json({
        message:"Email or password is invalid"
    })
   }
    const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User Logged In successfully",
    user
  });

}


module.exports = { userRegisterController, userLoginController };
