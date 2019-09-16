const http = require('http');

let cnt = 0;

http.createServer((req, res) => {
    console.log(`req.url: ${req.url}`);
    if (req.url == '/') {
        cnt++;
    }
    if (req.url == '/jsondemo') {
        res.writeHead(200, {'Content-type': 'application/json'});
        let obj = {};
        obj.action = "test";
        obj.num1 = 123;
        obj.num2 = 456.789;
        res.end(JSON.stringify(obj));
    } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`<html lang="cs"><head><meta charset="UTF-8"></head><body>Počet volání: ${cnt}</body></html>`);
    }
}).listen(8888);