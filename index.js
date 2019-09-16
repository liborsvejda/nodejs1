const http = require('http');
const url = require('url');
const qs = require('querystring');
const dateFormat = require('dateformat');

const CZ_DOW = ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"];

let cnt = 0;

http.createServer((req, res) => {
    console.log(`req.url: ${req.url}`);
    let parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname == '/') {
        cnt++;
    }
    if (req.method == 'POST') {
        let body = '';

        req.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            if (parsedUrl.pathname == '/jsonpostdemo') {
                res.writeHead(200, {'Content-type': 'application/json'});
                let obj = {};
                obj.input = JSON.parse(body);
                res.end(JSON.stringify(obj));
            } else {
                let qry = qs.parse(body);
                console.log(qry);
                res.writeHead(200, {'Content-type': 'text/html'});
                res.end(`<html lang="cs"><head><meta charset="UTF-8"></head><body><h1>Vstup</h1><pre>${JSON.stringify(qry)}</pre></body></html>`);
            }
        });
    } else {
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
    }
}).listen(8888);