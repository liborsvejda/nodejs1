const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<html lang="cs"><body>Kuk!</body></html>')
}).listen(8888);