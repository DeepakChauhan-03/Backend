import UserModel from '../models/user.model.js'
import uploadOnCloudinary from '../config/cloudinary.js'

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