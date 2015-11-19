"use strict";

let ControladorHomepage = require("./controladorHomepage");
let ControladorTarefas = require("./controladorTarefas");
let domain = require('../domain');

let mongoDbUrl = 'mongodb://127.0.0.1:27017/livro';

module.exports.init = function(app){
    let servicoDados = new domain.ServicoDados(new domain.Repositorio(mongoDbUrl));
    new ControladorHomepage(servicoDados).init(app);
    new ControladorTarefas(servicoDados).init(app);
};