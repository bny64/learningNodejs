const http = require('http');

http.createServer((req, res)=>{
    console.log('hello');
}).listen(8000);