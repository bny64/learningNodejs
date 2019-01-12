const net = require("net");

//make a socket
const client = new net.Socket();
client.setEncoding("utf8");

//connect
client.connect(`8000`, `localhost`, ()=>{
    //outout second
    console.log(`connected to server`);
    //outout third
    client.write(`Who needs a browser to communicate?`);
});

process.stdin.resume();

process.stdin.on(`data`, data => {
    client.write(`${data}`);
});

client.on(`data`, data => {
    console.log(data);
});

client.on(`close`, ()=>{
    console.log(`connection is closed`);
});