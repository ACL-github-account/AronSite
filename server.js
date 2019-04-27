//Dependancies
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
		//parses the req through the url module
		let p = url.parse(req.url, true);
		//gets the file extention by splitting a string into two
		let fileExtention = p.pathname.split(".");

		//if the HTTP method is GET
		if (req.method === "GET") {

			//routeing
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

			//read the file located with the routeing variable
			fs.readFile(routeing, function(err, data){
			if (err){
				//error handler
				res.writeHead(200, {"Content-Type":"text/html"});
				res.write("error" );
				res.write(req.url)
			} else {
				//determines the content-type via getting the file extention and then useing that as a key for the mime type
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

		//POST request handler
		if (req.method === "POST"){
			if (req.url === "/"){
				let body;
				//data is appended to the body string each time a chunk is recived
				req.on("data", (chunk)=> {
					body = (body == null) ? chunk.toString() : body + chunk.toString() ;
				})
				//the request is logged to console
				req.on("end",()=>{
					console.log(body);
				})
			//the only other posibility is a password request
			//TODO: untangle this spaghetti
			} else {
				//announce that a password has been received
				console.log("password");
				let body;
				//Upon receiveing data append the received chunk to a body and then convert it to string
				req.on("data", (chunk)=> {
					body = (body == null)?
						chunk.toString():
						body + chunk.toString();
				})
				req.on("end",()=>{
					let ClientObj = JSON.parse(body);
					//log sent password to console
					console.log(ClientObj.password);
					//if the password is correct execute this code, if else the request is not parsed
					if (ClientObj.password == "poop"){
						res.writeHead(200, {"Content-Type":"text"})
						/*If the sent post type is an announcement define the string as the filename
						for the announcements JSON, else it must be the updates json*/
						let postType = (ClientObj.type == "announcement")?
							"announcements.json":
							"updates.json";
						//read file that correspons with the request Obj type
						fs.readFile("./website/api/" + postType, (err, data)=>{
							//If json does not exist create one
							if (err){
								postsObj = {
									title : [ClientObj.Title],
									content : [ClientObj.Body]
								};
								fs.writeFile("./website/api/" + postType, JSON.stringify(postsObj), (err)=>{
									if (err) throw err;
									else{
										console.log("filesaved");
									}
								})
							} else {
								/*if the data length = 0 then the file must be empty, create a new file
								and write the received object to it*/
								if (data.length == 0){
									postsObj = {
										title : [ClientObj.Title],
										content : [ClientObj.Body]
									};
									fs.writeFile("./website/api/" + postType, JSON.stringify(postsObj), (err)=>{
										if (err) throw err;
										else{
											console.log("filesaved");
										}
									})
								} else {
									console.log(JSON.stringify(data));
									//postsObj equal to the recived data of the local .json.
									postsObj = JSON.parse(data);
									console.log(postsObj);
									//append the received object to the .json
									postsObj.title[postsObj.title.length++] = ClientObj.Title;
									postsObj.content[postsObj.content.length++] = ClientObj.Body;
									//log results
									console.log(JSON.stringify(postsObj));
									//write the new object to the .json
									fs.writeFile("./website/api/" + postType, JSON.stringify(postsObj), (err)=>{
										if (err) throw err;
										else{
											console.log("filesaved");
										}
									})
								}
							}
						});
						/*response text, read by the client to alert a message confirming the password
						is valid*/
						res.end("yes");
						console.log(body);
					}
					console.log(body);
				})
			}
		}
	}).listen(3000, "127.0.0.1")