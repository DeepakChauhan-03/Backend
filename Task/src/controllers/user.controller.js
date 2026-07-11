import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const Signup = async(req,res)=>{
   try {
    const {name,email,password,role="user"} = req.body;
   
   const isUserAlreadyExist = await userModel.findOne({email});
   if(isUserAlreadyExist){
    return res.status(401).json({
        message:"User already existed"
    })
   }

   //password hashing
   const hashedPassword = await bcrypt.hash(password,10)

   const user = await userModel.create({
    name,
    email,
    password:hashedPassword,
    role
   })

 const token = await jwt.sign({
    id:user._id,
 },process.env.SECRET_KEY)

res.cookie("token",token);

return res.status(201).json({
    message:"User created successfully",
    user
})

   } catch (error) {
    console.log("Error in signup controller",error)
   }
}

export const Login = async(req,res)=>{
    try {
         const {email,password} = req.body;
         const user = await userModel.findOne({email});
         if(!user){
            return res.status(400).json({
                message:"User does not existed"
            })
         }
         
         //password decrypting
         const isPasswordValid = await bcrypt.compare(password,user.password);

         if(!isPasswordValid){
            return res.status(401).json({
                message:"Inavlid Credentials"
            })
         }
         const token = await jwt.sign({
               id:user._id,
       },process.env.SECRET_KEY)

        res.cookie("token",token);

        return res.status(200).json({
    message:"User Login successfully",
    user
      })


    } catch (error) {
        console.log("Error in login controller",error)
    }
}

export async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"Logged out successfully"
    })
}