import express from 'express';
import dotenv from 'dotenv'
import connectToDB from './src/config/db.js';
import authRouter from './src/routes/user.route.js';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())


//api
app.use("/api/auth",authRouter)




app.listen(port,()=>{
    connectToDB()
    console.log(`Server is running on ${port}`)
})