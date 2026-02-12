const express = require('express');
const connectToDB = require('./config/db');
const cookieParser = require('cookie-parser')
const authRoutes = require('.//routes/auth.routes')
const multer = require('multer')
const postModel = require('../src/models/post.model')
const uploadFile = require('../src/services/storage.service')
const app = express()
//env configuration
const dotenv = require('dotenv')
dotenv.config();

connectToDB();  //mongodb connect function calling

//middlewares
app.use(express.json()) // body se data read krta hai
app.use(cookieParser())


//routes
app.use('/user/auth',authRoutes)

//files routes
const upload = multer({storage:multer.memoryStorage()})
app.post("/create-post",upload.single('image'), async(req,res)=>{
     console.log(req.file)
  const result = await uploadFile(req.file);
    const post = await postModel.create({
      image:result.url,
      caption:req.body.caption
    })

     res.status(201).json({
        message:"Post created successfully",
        post
     })
})

app.get("/posts",async(req,res)=>{
   const posts = await postModel.find();
   
   return res.status(200).json({
      message:"Posts fetched successfully",
      posts
   })
})


module.exports = app;