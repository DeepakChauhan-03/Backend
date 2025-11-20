//Making a simple webpage using node js
const http = require('http');
const fs = require('fs');

http.createServer((req,resp)=>{
    if(req.url=="/"){
        fs.readFile("Node JS/Html/index.html","utf-8",(error,data)=>{
            if(error){
                resp.writeHead(500,{"content-type":"text/plain"})
                resp.end("Internal server error");
                return false
            }
            resp.write(data);
            resp.end();
        })
    }
    else if(req.url=="/style.css"){
         fs.readFile("Node JS/Html/style.css","utf-8",(error,data)=>{
            if(error){
                resp.writeHead(500,{"content-type":"text/plain"})
                resp.end("Css not found");
                return false
            }
            resp.writeHead(200,{"content-type":"text/css"})
            resp.write(data);
            resp.end();
        })
    }
}).listen(3000);