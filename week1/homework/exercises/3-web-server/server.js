/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');
const fs = require('fs');

//create a server
let server = http.createServer( (req, res) => {
	if(req.url === '/'){
		fs.readFile('index.html', (err, content) =>{
			if(err){
				res.sendStatus(500)
			};
			res.writeHead(200, {'content-Type': 'text/html'}); // Sends a response back to the client
			res.end(content); // Ends the response
		})
	}
	if(req.url === '/index.js'){
	  fs.readFile('index.js', (err, content) =>{
		  if(err) {
			  res.sendStatus(500)
			}; 
		  res.writeHead(200, {'content-Type': 'text/javascript'}); 
		  res.end(content); 
	  })
	}
  if(req.url === '/style.css'){
	  fs.readFile('style.css', (err, content) =>{
		  if(err) {
			  res.sendStatus(500)
			};
		  res.writeHead(200, {'content-Type': 'text/css'}); 
		  res.end(content); 
	  })
  }
  });
  

server.listen(3000); // The server starts to listen on port 3000