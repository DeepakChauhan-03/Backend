//Creating first express server
const express = require('express');
const app = express();

app.get("",(req,resp)=>{
   resp.send("<h1>Basic Node JS example</h1>")
});
app.get("/about",(req,resp)=>{
   resp.send("<h1>This is about page</h1>")
});

app.listen(3200)