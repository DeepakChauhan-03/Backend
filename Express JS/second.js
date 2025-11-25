// const express = require('express');
import express from 'express'
import about from './Pages/about.js';
import home from './Pages/home.js'
const app = express();

app.get("/",(req,resp)=>{
   resp.send("This is main page");
});
app.get("/about",(req,resp)=>{
   resp.send(about());
});
app.get("/home",(req,resp)=>{
   resp.send(home());
});

app.listen(3000);