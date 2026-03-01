const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function isAuthenticated(req,res,next){

  try {

    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({message:"Unauthorized"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decodee : ',decoded)

    const user = await userModel.findById(decoded.id).select("-password");
      console.log("0",user)
    req.user = user;

    next();

  } catch (error) {
    res.status(401).json({message:"Invalid token"});
  }

}

module.exports = isAuthenticated;
