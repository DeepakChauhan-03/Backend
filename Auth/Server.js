const express = require('express')
const app = express();

//env
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
//Database connection
const connectToDB = require('./config/db')
connectToDB();
//Router
const userRouter = require('./routes/user.routes')

//model
const userModel = require('./models/user.model');
const user = require('./models/user.model');



//route
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})