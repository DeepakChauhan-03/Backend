const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const morgan = require('morgan')
app.use(morgan('dev'))

app.set('view engine','ejs')
app.set("views", "./views");         // views folder ka path
app.use(express.static("public"))



const userModel = require('./models/user')  //importing usermodel

const dbConnection = require("./config/db")  //database connection

app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async(req,res)=>{
    const { username, email, password } = req.body;
    console.log("BODY => ", req.body);
    await userModel.create({
        username: username,
        email:email,
        password: password
    })
    res.send("User registered")
})
//Read Data
app.get("/get-users",(req,res)=>{
    userModel.find().then((users)=>{
        res.send(users)
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})