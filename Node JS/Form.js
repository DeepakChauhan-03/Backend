const http = require('http');
http.createServer((req,resp)=>{
  resp.writeHead(200,{"content-type":'text/html'});
  if(req.url =="/"){
     resp.write(` <form action = "/submit" method = "post">
    <input type='text' placeholder='Enter name...' name='name'/>
    <input type='email' placeholder='Enter e-mail...' name='email'/>
    <button>Submit</button>
  </form>`)
  }
  else if(req.url == "/submit"){
    resp.write('<h1>Form Sunmitted</h1>');
  }
  resp.end();
}).listen(3000);