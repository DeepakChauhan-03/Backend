const http = require('http');
const userData = [
    {
        name:'Deepak',
        age:22,
        email:'deepak@gmail.com'
    },
      {
        name:'Amit',
        age:23,
        email:'amit@gmail.com'
    },
      {
        name:'Rahul',
        age:25,
        email:'rahul@gmail.com'
    }
];
http.createServer((req,resp)=>{
  resp.setHeader("content-Type",'application/json');
  resp.write(JSON.stringify(userData));
  resp.end();
}).listen(3100);