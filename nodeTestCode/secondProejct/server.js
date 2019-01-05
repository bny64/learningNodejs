const http = require("http");

const options = {
    host : 'localhost',
    port : 8000,
    path : "/?file=secondary",
    method : "GET"
};

const processPublicTimeLine = (response) => {
    console.log("finished request");
};

for(let i=0; i<2000; i++){
    http.request(options, processPublicTimeLine).end(); 
}