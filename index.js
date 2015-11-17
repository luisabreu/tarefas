"use strict";

var http = require("http");
var express = require("express");

var app = express();//singleton da nossa app

app.get("/", (req, res) =>{
   res.send("<html><body><h1>Olá de express</h1></body></html>")
});

var servidor = http.createServer(app);
servidor.listen(9001);