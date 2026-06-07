import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDB from './src/config/db.js'
import cookieParser from 'cookie-parser'
import authRouter from './src/routes/auth.routes.js'
import userRouter from './src/routes/user.routes.js'
dotenv.config()
connectToDB()


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
     credentials:true
}))

const port = process.env.PORT || 6000 

//middleware
app.use(express.json())
app.use(cookieParser())

//route
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})