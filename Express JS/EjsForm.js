//Handle Form using EJS

import express from 'express'
const app = express();

app.use(express.urlencoded({extended:false})) //Built in middleware

app.set('views', './Express JS/views');   
app.set('view engine','ejs');

app.get("/add-user",(req,res)=>{
    res.render('Form')
});

app.post("/submit-user",(req,res)=>{
    console.log(req.body)
    res.render('Submituser',req.body)
});

app.listen(3000);