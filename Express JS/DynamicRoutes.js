//Creating a dynamic routes
import express from 'express'
const app = express();

app.get("/",(req,res)=>{
  const users = ['deepak','amit','rahul','shivam','ravi'];
  let data =`<ul>`;
  for(let i=0; i<users.length; i++){
    data += `<li><a href="user/${users[i]}">${users[i]}</a></li>`;
    data += `</ul>`;
  }
  res.send(data);
})

//Dynamic Routes
app.get("/user/:name",(req,res)=>{
    const userName = req.params.name;
    res.send(`This is ${userName} page.`)
})

app.listen(3000);