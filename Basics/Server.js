// const http = require('http');
// http.createServer().listen(3000);

const http = require('http');
http.createServer((request,response)=>{
    response.write("<h1>Hello this is write</h1>")
  response.end("Hii this is end");
}).listen(3000);