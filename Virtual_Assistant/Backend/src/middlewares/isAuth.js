import jwt from 'jsonwebtoken'

const isAuth = async(req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "Token not found"
            })
        }
       const verifiedToken = await jwt.verify(token,process.env.JWT_SECRET)

       req.userId = verifiedToken.userId

       next()


    } catch (error) {
        console.log("Error in isAuth", error)
    }
}

export default isAuth