import UserModel from '../models/user.model.js'

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