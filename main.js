const http = require('http');
const fs = require('fs');


const serv = http.createServer(
	function (req, res) {
		if (req.url === '/mini.css') {
    		res.writeHead(200, {'Content-type' : 'text/css'});
    		let fileContents = fs.readFileSync('./mini.css', {encoding: 'utf8'});
    		res.write(fileContents);
  		}
  		fs.readFile('index.html',
  		function(err, data) {
    		res.writeHead(200, {'Content-Type': 'text/html'});
   			res.write(data);
    		res.end();
  		});
	}
);

serv.listen(8080);
