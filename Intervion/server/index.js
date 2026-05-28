import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import connectToDB from './src/config/db.js'
connectToDB()

const app = express();

const port = process.env.PORT || 6000

app.get("/",(req,res)=>{
    return res.json({
        message:":Server started"
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})