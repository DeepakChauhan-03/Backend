// Express js and mongobd basics
const express = require('express');
const mongoose = require("mongoose");

const app = express();

const connectDB = async ()=>{
    try {
        let res = await mongoose.connect("mongodb://localhost:27017/first");
        if(res){
            console.log("mongodb connected");
        }
    } catch (error) {
        console.log("mongodb error");
    }
};


connectDB();

app.get("/", (req, res) => {
    res.send({
       "name":"deepak",
        "email":"deepak@gmail.com",
        "mobile":"9648311674",
        "password":"123456"

    });
});

app.listen(3000,()=>{
    console.log("i am running on port 3000");
})
