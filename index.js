"use strict";

var http = require("http");
var express = require("express");

var app = express();//singleton da nossa app

//definicao motor de vista
app.set("view engine", "jade");

app.get("/", (req, res) =>{
   //res.send("<html><body><h1>Olá de express</h1></body></html>")
    res.render("index", {titulo: "Olá de Express!"});
});

app.get("/api/users", (req, res) => {
    res.header("Content-type", "application/json");
    res.send({name: "Luis", email: "labreu@gmail.com"});
});

var servidor = http.createServer(app);
servidor.listen(9001);