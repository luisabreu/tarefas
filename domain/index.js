"use strict";


let servicoTarefas = require("./ServicoTarefas");
let servicoUtilizadores = require("./servicoutilizadores");
let repositorio = require("./repositorio");


module.exports = {
    ServicoTarefas: servicoTarefas,
    ServicoUtilizadores:servicoUtilizadores,
    Repositorio: repositorio
};