import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './src/config/db.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

connectToDB()


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})