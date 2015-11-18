"use strict";

let ControladorHomepage = require("./controladorHomepage");
let domain = require('../domain');

let mongoDbUrl = 'mongodb://127.0.0.1:27017/livro';

module.exports.init = function(app){
    new ControladorHomepage(new domain.ServicoDados(new domain.Repositorio(mongoDbUrl))).init(app);
};