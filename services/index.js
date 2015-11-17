"use strict";

let dadosIniciais = require('./dadosIniciais');

class ServicoDados{
    obtemTarefas(){
        return dadosIniciais.tarefas;
    }
}

module.exports = ServicoDados;