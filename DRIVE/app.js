const express = require('express')
const app = express();
//routes
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
//env
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
//cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//database connection
const connectToDB = require('./config/db')
connectToDB();

//ejs
app.set("view engine", "ejs");
//model
const userModel = require('./models/user.model')

//route
app.use('/user',userRouter);
app.use('/',indexRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})