var http = require('http');
var net = require('net');
var url = require('url');

var server=http.createServer(function(req,res){

  console.log(req.url)

        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost"});
        res.write("11111");
    res.end('aaaaaaaaaaaaaaaaaaaaaaa');
});
server.listen(8080,function(){
    console.log("开始监听...");
});