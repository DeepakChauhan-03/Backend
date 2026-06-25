import UserModel from '../models/user.model.js'
import uploadOnCloudinary from '../config/cloudinary.js'
import geminiResponse from '../gemini.js'
import { response } from 'express'

export const getCurrentUser = async(req,res)=>{
  try {
    const userId = req.userId

    const user = await UserModel.findById(userId).select("-password")
    if(!user){
        return res.status(400).json ({
            message:"User not found"
        })
    }

    return res.status(200).json(user)

  } catch (error) {
     console.log("error is usercontroller",error)
  }
}


//Update Assistant
export const updateAssistant = async (req,res)=>{
    try {
      const {assistantName,imageUrl} = req.body
      let assistantImage;
      if(req.file){
        assistantImage = await uploadOnCloudinary(req.file.path)
      }
      else{
        assistantImage = imageUrl
      }

      // const user = await UserModel.findByIdAndUpdate(req.userId,
      //   {assistantName,assistantImage},{new:true}).select("-password")
      const user = await UserModel.findByIdAndUpdate(req.userId,
    {
        assistantName,
        assistantImage
    },
    {
        returnDocument: "after"
    }
).select("-password");

        return res.status(200).json(user)

    } catch (error) {
      return res.status(400).json({
        message:"Error in updateAssistant"
      })

    }
}

//command
export const askToAssistant = async(req,res)=>{
   try {
     const {command} = req.body
     const user = await UserModel.findById(res.userId)
      const userName = user.name
      // const assistantImage = user.assistantImage
      const assistantName = user.assistantName
     
      const result = await geminiResponse(command,userName,assistantName)
     
      const jsonMatch = result.match(/{[\s\S]*}/)
      if(!jsonMatch){
        return res.status(400).json({
          messgae:"I can't understand"
        })
      }
    
      const gemResult = JSON.parse(jsonMatch[0])
      const type = gemResult.type
      switch(type){
        case 'get-date' :
           return res.json({
            type,
            userInput:gemResult.userInput,
            response:`current Date is ${moment().format(("YYYY-MM-DD"))}`
           });
           case 'get-time' :
           return res.json({
            type,
            userInput:gemResult.userInput,
            response:`current time is is ${moment().format(("hh:mmA"))}`
           });
           case 'get-day' :
           return res.json({
            type,
            userInput:gemResult.userInput,
            response:`Today is ${moment().format(("dddd"))}`
           });
           case 'get-month' :
           return res.json({
            type,
            userInput:gemResult.userInput,
            response:`current Date is ${moment().format(("MMMM"))}`
           });

           case  "google_search":
         case  "youtube_search":
          case "general" :
        case "youtube_play":
       case "calculator_open":
       case "instagram_open" :
       case "facebook_open" :
       case  "weather-show" :
        return res.json({
          type,
          userInput:gemResult.userInput,
         response:  gemResult.response
        })
       
        default: 
        return res.status(400).json({
          message:"I did not understand that command"
        })

      }


   } catch (error) {
       return res.status(400).json({
          message:"Ask assistant error",
        })
   }
}