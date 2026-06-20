import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './src/config/db.js'
import authRouter from './src/routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

connectToDB()
app.use(express.json())
app.use(cookieParser())



//Auth Routes
app.use("/api/auth",authRouter);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})