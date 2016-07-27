const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = process.argv[2] || 8888;

http.createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    // serve default index.html
    if (uri === '/') {
        uri = '/index.html';
    }
    const filename = path.join(process.cwd(), uri);    
        function sendRes(err, file) {
            var contentType = 'text/html';
            var statusCode = 200;
            var response = file;

            if (err) {
                contentType = 'text/plain';
                statusCode = 404;
                response = '404 not found';
            }

            // contentType
            if (uri.indexOf('.css') >= 0) {
                contentType = 'text/css';
            }

            if (uri.indexOf('.js') >= 0) {
                contentType = 'text/javascript';
            }

            if (uri.indexOf('.jpg') >= 0 || uri.indexOf('.jpeg') >= 0) {
                contentType = 'image/jpeg';
            }

            if (uri.indexOf('.ttf') >= 0) {
                contentType = 'font/truetype';
            }

            if (uri.indexOf('.woff') >= 0) {
                contentType = 'font/woff2';
            }

            if (uri.indexOf('.eot') >= 0) {
                contentType = 'application/vnd.ms-fontobject';
            }

            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(response, 'binary');
        }

        fs.stat(filename, function(err, stats) {
            if (stats) {
                sendRes(false, fs.readFileSync(filename, 'binary'));
            } else {
                sendRes(true, null);
            }
        });

        
}).listen(parseInt(port, 10), () => {
    console.log('server started on port', port);
});