const express = require('express');
const connectToDB = require('./config/db');
const authRoutes = require('.//routes/auth.routes')
const app = express();
const cookieParser= require('cookie-parser')

const dotenv = require('dotenv')
dotenv.config();

connectToDB();

app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth",authRoutes);


app.get('/',(req,res)=>{
    res.send("Hello ji")
})

module.exports = app;