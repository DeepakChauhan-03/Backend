const express = require('express')
const app = express()
const path = require('path')

const http = require('http');
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

app.use(express.static(path.resolve("./public")))
//Socket IO
io.on("connection",(socket) =>{
    // console.log("new user is connected",socket.id)
    socket.on("user-message",(message)=>{
         console.log("A new user message", message)
    })
})


app.get("/",(req,res)=>{
    return res.sendFile('/public/index.html')
})

module.exports = server