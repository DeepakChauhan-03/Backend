import express from 'express'
const app = express();

app.set('views', './Express JS/views');
app.set('view engine','ejs');

app.get("/",(req,resp)=>{
    resp.render('index',{name:"Amit kumar"});
})

app.listen(3000);