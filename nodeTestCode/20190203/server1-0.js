const http = require('http');

const server = http.createServer((req,res)=>{
    res.write('<h1>Hello node!</p>');
    res.end('<p>hello server</p>');
})
server.listen(8080);
server.on('listening', ()=>{
    console.log('8080 waiting');
})
server.on('error', error=>{
    console.error(error);
})