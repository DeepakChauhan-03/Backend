import genToken from "../config/token.js";
import userModel from "../models/user.model.js";


export const googleAuth = async(req,res)=>{
    try {
        const {name,email} = req.body;
        let user = await userModel.findOne({email})
        if(!user){
            user = await userModel.create({
                name,
                email
            })
        }
          let token = await genToken(user._id);
          res.cookie('token',token,{
            http:true,
            secure:false,
            maxAge: 3 * 24 * 60 * 60 * 1000
          });
          
          return res.status(201).json({
            message:"User created successfully",
            user:user
          })



    } catch (error) {
         res.status(500).json({
            message:"Google auth error"
         })
    }
}

//Logout controller
export const logOut = async (req,res)=>{
    try {
         await res.clearCookie("token")
         return res.status(200).json({
            message:"Logout successfully"
         })
    } catch (error) {
         console.log("error in logout",error)
    }
}