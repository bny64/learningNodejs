const http = require('http');

http.createServer((req, res)=>{
    res.write('<h1>hello node!</h1>');
    res.end('<p>hello server</p>');
}).listen(8080, ()=>{
    console.log(`8080서버 대기중`);
})