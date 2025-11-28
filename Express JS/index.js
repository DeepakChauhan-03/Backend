import mongoose from 'mongoose'
import express from 'express'
import studentModel from './Model/studentModel.js';

const app = express();

app.use(express.json());  //Middleware to extract data from body

 mongoose.connect("mongodb://localhost:27017/school").then(()=>{
    console.log("_______Connected_______")
})

//get Method 
app.get("/",async(req,res)=>{
    
    const studenData = await studentModel.find();
   res.send({})
});

//Post Method
app.post("/save",async(req,res)=>{
    //validation
    const {name,age,email} = req.body;
    if(!req.body  || !name || !email  || !age){
         res.send({
        message:"data not stored",
        success:false,
        storedInfo:null
    })
      return false
    }
    const studentData = await studentModel.create(req.body);
    res.send({
        message:"data stored",
        success:true,
        storedInfo:studentData
    })
})
app.listen(3000);