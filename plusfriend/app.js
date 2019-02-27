var http = require('http');
var url = require('url');
const router = require('./routes');

http.createServer(function(req, res){

    var pathName = url.parse(req.url).pathname;    
    router(pathName, req, res);

}).listen(9850, function() {
    console.log('Server running');
});
