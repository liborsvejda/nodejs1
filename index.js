const http = require('http');

let cnt = 0;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(`<html lang="cs"><head><meta charset="UTF-8"></head><body>Počet volání: ${cnt}</body></html>`);
}).listen(8888);