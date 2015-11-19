"use strict";

let http = require("http");
let express = require("express");

let controllers = require('./controllers');
let flash = require("connect-flash");

let app = express();//singleton da nossa app

let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser")

//definicao motor de vista
app.set("view engine", "jade");

//pastas publicas (scripts, css, etc)
app.use(express.static(__dirname + "/public"));

//form url enconded
app.use(bodyParser.urlencoded({extended: false}));
//json
app.use(bodyParser.json());


app.use(cookieParser());
app.use(session({
    secret: "teste",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

controllers.init(app);

app.get("/api/users", (req, res) => {
    res.header("Content-type", "application/json");
    res.send({name: "Luis", email: "labreu@gmail.com"});
});

var servidor = http.createServer(app);
servidor.listen(9001);