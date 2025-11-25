import express from 'express'
const app = express();

function ageCheck(req,resp,next){
    if(!req.query.age || req.query.age<18){
        resp.send("You are not eligible");
    }
    else{
        next();
    }
}

app.get("",(req,res)=>{
    res.send("<h1>Home page</h1>");
})
app.get("/about",ageCheck,(req,res)=>{
    res.send("<h1>I am about page</h1>");
})
app.get("/products",(req,res)=>{
    res.send("<h1>I am products page</h1>");
})
app.get("/contact",(req,res)=>{
    res.send("<h1>I am contact page</h1>");
})

app.listen(3000);