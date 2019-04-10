var http = require("http");
var fs = require("fs");
var url = require("url");

var MimeTypes = {
	"html" : "text/html",
	"css" : "text/css",
	"js" : "text/javascript",
	"mp4" : "video/mp4",
	"jpg" : "image/jpeg",
	"ico" : "text/html",
	".json" : "application/json"
};


http.createServer(function(req, res){
		let p = url.parse(req.url, true);
		let fileExtention = p.pathname.split(".");
		console.log(fileExtention[1]);
		console.log(String(MimeTypes[fileExtention[1]]));
		console.log("-------------");
	let routeing;

	if (p.pathname === "/"){
		routeing = "." + "/website/index.html";
	}else if(p.pathname === "/api"){
		routeing = "./website/api/announcements.json";
	} else {
		routeing = "." + "/website" + p.pathname;
	}
    fs.readFile(routeing, function(err, data){
		if (err){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write("ERR 404");
		} else {
			res.writeHead(200, {"Content-Type": String(MimeTypes[fileExtention[1]])});
				if (String(MimeTypes[fileExtention[1]]) != "application/json"){
					res.write(data);
				} else {
					res.write(JSON.stringify(data));
				}
			}
		res.end();
		});
	}).listen(3000, "127.0.0.1")