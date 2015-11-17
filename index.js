"use strict";

var http = require('http');

var servidor = http.createServer((req, res) => {
    console.log("Url: " +  req.url);
    res.write("<html><body>" + req.url + "</body></html>");
    res.end();
});
servidor.listen(9001);