const http = require('http');
const fs = require('fs');

http.createServer((req,resp)=>{
    fs.readFile('Html/web.html',"utf-8",(err,data)=>{
        if(err){
            resp.writeHead(500,{"content-type":'text/plain'})
            resp.write('internal error');
            resp.end();
            return
        }

        resp.writeHead(200,{"content-type":'text/html'})
            resp.write(data);
            resp.end();
    })
}).listen(3000);