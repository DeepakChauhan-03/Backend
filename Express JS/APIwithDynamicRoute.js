//Creating a API with dynamic route
import express from 'express'
import userData from './API.json' with {type:'json'} // importing json data
const app = express();

app.get("/",(req,res)=>{
    res.send(userData)
});

//Dynamic Route
app.get("/user/:id",(req,res)=>{
    const id = req.params.id;
    let filteredData = userData.filter((user)=>user.id==id);
    res.send(filteredData);
})

app.listen(3000);