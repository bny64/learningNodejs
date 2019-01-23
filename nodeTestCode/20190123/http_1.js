const http = require("http");
const path = require("path");
const fs = require("fs");
const base = "./home/example/public_html";

const colors = require("colors");

console.log(__dirname.red)

http.createServer((req,res)=>{
    pathname = base + req.url;
    console.log(pathname.america);
    fs.exists(pathname, exists=>{
        console.log(pathname);
        if(!exists){
            res.writeHead(404);
            res.write("Bad request 404\n");
            res.end();
        }else{
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            const file = fs.createReadStream(pathname);
            file.on('open', ()=>file.pipe(res))
            file.on('error', err=>console.log(err.zebra))
        }
    });

}).listen(8124);

console.log("Server running at 8124 port".rainbow);