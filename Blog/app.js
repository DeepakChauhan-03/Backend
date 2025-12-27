const express = require('express');
const app = express();
//password bcrypt
const bcrypt = require('bcrypt');
//JWT
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
//env
const dotenv = require('dotenv');
dotenv.config();
//cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())
//ejs
app.set('view engine','ejs')
//models
const userModel = require('./models/usermodel')
const postModel = require('./models/post')

//database connection
const connectToDB = require('./config/db')
connectToDB();

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/register',async(req,res)=>{
    let {email , username, name, password, age} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registered")

    //password hash
    const hashPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        username,
        email,
        age,
        name, 
        password:hashPassword
    })
    // res.json(newUser)

    //JSON WEB TOKEN
    const token = jwt.sign({
        userid:userModel._id,
        email:userModel.email
    },
    process.env.JWT_SECRETE,
    )
    
    res.cookie('token',token)
    res.send("Registered")
})
//login Route
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async(req,res)=>{
    const {email , password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong")
     //password matching
    const isMatch = await bcrypt.compare(password,user.password) ;
    if(!isMatch){
    return res.status(400).json({
        message:'username or Password is incorrect',
    })
} 
//JSON WEB TOKEN
   const token = jwt.sign(
  {
    userid: user._id,
    email: user.email
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
    
    res.cookie('token',token,{
        httpOnly:true
    })
    res.redirect('/profile')
})
//LogOut
app.get('/logout',(req,res)=>{
    res.cookie("token","")
    res.redirect("/login")
})

//Profile Route
app.get('/profile',isLoggedIn,async(req,res)=>{
    //console.log(req.user)
    let user = await userModel.findOne({email:req.user.email}).populate("posts")
    // console.log(user)
    res.render('profile',{user})
})
//Post Route
app.post('/post',isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    let {content} = req.body
   let post = await postModel.create({
        user:user._id,
        content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')
})
//Like route
app.get('/like/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user")
    if(post.likes.indexOf(req.user.userid) === -1){
         post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1) 
    }
   
   await post.save();
    res.redirect("/profile")
})
//Edit route
app.get('/edit/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user")
    
    res.render('edit',{post})
})
//update route
app.post('/update/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content:req.body.content});
    
    res.redirect('/profile');
})
//Middleware
function isLoggedIn(req,res,next){
   const token = req.cookies.token;
  if (!token) {          
    return res.redirect('/login');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = data;
    next();
  } catch (error) {
    console.log("Error in middleware:", error.message);
    return res.redirect('/login');
  }
}

app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})