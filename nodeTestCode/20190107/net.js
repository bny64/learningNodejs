const net = require("net");

const server = net.createServer(conn=>{
    // output first
    console.log("connected");

    conn.on('data', data =>{
        //output forth
        console.log(data + ' from ' + conn.remoteAddress + " " + conn.remotePort);
        conn.write("Repeating : " + data);
    });

    conn.on(`close`, ()=>{
        console.log(`client closed connection`);
    });
}).listen(8000);

console.log(`listening on port 8000`);