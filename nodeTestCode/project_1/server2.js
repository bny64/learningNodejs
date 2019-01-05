const http = require("http");
const fs = require("fs"); 

var writeNumbers = (res) => {
    let counter = 0;

    for(let i=0; i<100; i++){
        counter++; 
        res.write(counter.toString() + "\n");
    }
};

http.createServer((req, res)=>{
    const query = require("url").parse(req.url).query;
    const app = require("querystring").parse(query).file + ".txt";

    res.writeHead(200, {"Content-Type" : "text/plain"});

    writeNumbers(res);

    setTimeout(()=>{
        
        console.log("opening " +  app);

        fs.readFile(app, "utf8", (err, data)=>{
            if(err)
                res.write("Could not find or open file for reading\n");
            else{
                res.write(data);
            }
            res.end();
        });
    }, 2000);

}).listen(8000);

console.log("Server running on 8000");