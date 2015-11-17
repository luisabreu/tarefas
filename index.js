"use strict";

var http = require("http");
var express = require("express");

var controllers = require('./controllers');

var app = express();//singleton da nossa app

//definicao motor de vista
app.set("view engine", "jade");

//pastas publicas (scripts, css, etc)
app.use(express.static(__dirname + "/public"));



controllers.init(app);

app.get("/api/users", (req, res) => {
    res.header("Content-type", "application/json");
    res.send({name: "Luis", email: "labreu@gmail.com"});
});

var servidor = http.createServer(app);
servidor.listen(9001);