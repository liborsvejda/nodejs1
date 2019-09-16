const http = require('http');
const url = require('url');
const dateFormat = require('dateformat');

const CZ_DOW = ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"];

let cnt = 0;

http.createServer((req, res) => {
    console.log(`req.url: ${req.url}`);
    let parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname == '/') {
        cnt++;
    }
    if (parsedUrl.pathname == '/jsondemo') {
        res.writeHead(200, {'Content-type': 'application/json'});
        let obj = {};
        obj.action = "test";
        obj.num1 = 123;
        obj.num2 = 456.789;
        res.end(JSON.stringify(obj));
    } else if (parsedUrl.pathname == '/sum') {
        res.writeHead(200, {'Content-type': 'application/json'});
        let d = new Date();
        let obj = {};
        obj.action = "sum";
        obj.date = d;
        obj.czdate = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        obj.czdate2 = dateFormat(d, "dd.mm.yyyy HH:MM:ss");
        obj.czdow = CZ_DOW[d.getDay()];
        obj.num1 = Number(parsedUrl.query["n1"]);
        obj.num2 = Number(parsedUrl.query["n2"]);
        obj.sum = obj.num1 + obj.num2;
        res.end(JSON.stringify(obj));
    } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`<html lang="cs"><head><meta charset="UTF-8"></head><body>Počet volání: ${cnt}</body></html>`);
    }
}).listen(8888);