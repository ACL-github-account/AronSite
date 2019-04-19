var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

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

		if (req.method === "GET") {
			let routeing;
			if (p.pathname === "/"){
				routeing = __dirname + "/website/index.html";
			}else if(p.pathname === "/api"){
				routeing = __dirname + "/website/api/announcements.json";
			} else if(p.pathname === "/poop"){
				routeing = __dirname + "/website" + p.pathname + ".txt";
			} else {
				routeing = __dirname + "/website" + p.pathname;
			}
				fs.readFile(routeing, function(err, data){
				if (err){
					res.writeHead(200, {"Content-Type":"text/html"});
					res.write("error" );
					res.write(req.url)
					console.log(err)
					console.log(__dirname);
				} else {
					res.writeHead(200, {"Content-Type": String(MimeTypes[fileExtention[1]])});
						if (String(MimeTypes[fileExtention[1]]) != "application/json"){
							res.write(data);
						} else {
							res.write(data);
						}
					}
				res.end();
		});
		}

		if (req.method === "POST"){
			if (req.url === "/"){
				let body;
				req.on("data", (chunk)=> {
					body = (body == null) ? chunk.toString() : body + chunk.toString() ;
				})
				req.on("end",()=>{
					console.log(body);
				})
			} else {
				console.log("password");
				let body;
				req.on("data", (chunk)=> {
					body = (body == null) ? chunk.toString() : body + chunk.toString() ;
				})
				req.on("end",()=>{
					let ClientObj = JSON.parse(body);
					console.log(ClientObj.password);
					if (ClientObj.password == "poop"){
						//Response should be Javascript that is to post their announcement/update!
						res.writeHead(200, {"Content-Type":"text"})
						let postsJson;
						fs.readFile("./website/api/announcements.json", (err, data)=>{
							if (err);
							else {
								postsObj = JSON.parse(data);
								console.log(postsObj);
								postsObj.title[postsObj.title.length++] = ClientObj.Title;
								postsObj.content[postsObj.content.length++] = ClientObj.Body;
								console.log(JSON.stringify(postsObj));
								fs.writeFile("./website/api/announcements.json", JSON.stringify(postsObj), (err)=>{
									if (err) throw err;
									else{
										console.log("filesaved");
									}
								})
							}
						});

						res.end("yes");
						console.log(body);
					}
					console.log(body);
				})
			}
		}
	}).listen(3000, "127.0.0.1")