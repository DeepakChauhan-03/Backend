import express from 'express'
const app = express();

function ageCheck(req,resp,next){
    if(!req.query.age || req.query.age<18){
        resp.send("Alert! You can not access this page");
    }else{
        next();
    }
}
app.use(ageCheck);

app.get("/",(req,resp)=>{
    resp.send("<h1>Home Page</h1>")
});

app.listen(3000);