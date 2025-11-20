const http = require('http');
const userForm = require('./routes/userform')
const userData = require('./routes/userdata')

http.createServer((req,resp)=>{
  resp.writeHead(200,{"content-type":'text/html'});
  if(req.url == "/"){
    userForm(req,resp);
  }
  else if(req.url=="/submit"){
    userData(req,resp);
  }
}).listen(3000);