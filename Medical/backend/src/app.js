const express = require('express');
const connectToDB = require('./config/db');
const cookieParser = require('cookie-parser')
const authRoutes = require('.//routes/auth.routes')
const multer = require('multer')
const postModel = require('../src/models/post.model')
const uploadFile = require('../src/services/storage.service')
const app = express()
const cors = require('cors')
const isAuthenticated = require('./middlewares/auth.middleware')
//env configuration
const dotenv = require('dotenv')
dotenv.config();

connectToDB();  //mongodb connect function calling

//middlewares
app.use(express.json()) // body se data read krta hai
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



//routes
app.use('/user/auth',authRoutes)

//files routes
const upload = multer({storage:multer.memoryStorage()})
app.post("/create-post", isAuthenticated, upload.single("image"), async (req, res) => {

  try {

    const result = await uploadFile(req.file);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
      user: req.user._id   
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }

});


app.get("/posts", isAuthenticated, async (req, res) => {

  const posts = await postModel.find({ user: req.user._id });

  res.status(200).json({
    posts
  });

});



module.exports = app;