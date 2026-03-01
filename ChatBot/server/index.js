const express = require('express')
const app = express();
const cors = require('cors')
const {GoogleGenerativeAI} =require('@google/generative-ai')
const dotenv = require('dotenv')
dotenv.config();

app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.KEY);
let model = genAI.getGenerativeModel({model:"gemini-2.5-flash"})
//creating api
app.post('/ask',async(req,res)=>{
    const {question} = req.body
    let data = await model.generateContent(question);
    let finalData = data.response.text()

    res.send({
        _status:true,
        _message:"content found",
        finalData
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})