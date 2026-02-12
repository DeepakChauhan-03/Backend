const express = require('express');
const app = express();
//env
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
//Database connection
const connectToDB = require('./config/db')
connectToDB();

//Model
const user = require('./models/user.model');
//Router
const userRouter = require('./routes/user.routes')

//route
app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.send("Hello baccha")
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})