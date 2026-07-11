import express from 'express'
import { Login, Signup } from '../controllers/user.controller.js';
const authRouter = express.Router()


//signup route
authRouter.post("/signup",Signup)
//login route
authRouter.post("/login",Login)



export default authRouter;