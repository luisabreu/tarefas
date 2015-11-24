"use strict";

let ControladorHomepage = require("./controladorHomepage");
let ControladorTarefas = require("./controladorTarefas");
let ControladorAutenticacao = require("./controladorAutenticacao");
let domain = require("../domain");
let GestorAutenticacao = require("../authentication");

let mongoDbUrl = 'mongodb://127.0.0.1:27017/livro';

module.exports.init = function(app){
    let repositorio = new domain.Repositorio(mongoDbUrl);
    let servicoDados = new domain.ServicoTarefas(repositorio);
    let servicoUtilizadores = new domain.ServicoUtilizadores(repositorio);
    let gestorAutenticacao = new GestorAutenticacao(servicoUtilizadores);

    new ControladorAutenticacao(servicoUtilizadores, gestorAutenticacao).init(app);
    new ControladorHomepage(servicoDados).init(app);
    new ControladorTarefas(servicoDados).init(app);

};