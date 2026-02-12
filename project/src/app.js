const express = require('express')
const app = express()
//env configuration
const dotenv = require('dotenv');
dotenv.config();
//middleware to extract data from body
app.use(express.json())
//notemodel
const noteModel = require("./models/note.model")

//POST API ->created new data
app.post("/notes",async(req,res)=>{
   const data = req.body;
  await noteModel.create({
      title:data.title,
      description:data.description
   })
   res.status(201).json({
    message:"Note is created"
   })
})
//Get API -> Fetching data from database
app.get("/notes",async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Notes fetched successfully",
        notes:notes
    })
})

//delete API
app.delete('/notes/:id',async(req,res)=>{
   const id = req.params.id;

   await noteModel.findOneAndDelete({
    _id:id
   })
   res.status(200).json({
     message:"Notes deleted successfully",
   })
})

//PATCH API -> to update data from the database
app.patch('/notes/:id',async(req,res)=>{
    const id = req.params.id;
    const description = req.body.description;
    await noteModel.findOneAndUpdate({
        _id :id
    },{
        description: description
    })

    res.status(200).json({
        message:"Notes updated successfully"
    })
})



module.exports = app;