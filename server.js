var http = require("http");
var fs = require("fs");
var url = require("url");


http.createServer(function(req, res){
    let p = url.parse(req.url, true);
    fs.readFile("." + p.pathname, function(err, data){
		if (err){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write("ERR 404");
			res.end();
		} else {
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(data);
			res.end();
		}
	}); 
}).listen(3000, "127.0.0.1")