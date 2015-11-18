"use strict";

let dadosIniciais = require('./dadosIniciais');

class ServicoDados{
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    obtemTarefas(){
        let tarefas = this.repositorio.obtemTarefas();
        return tarefas.count()
            .then(c => {
                if(c === 0){
                    dadosIniciais.tarefas.forEach(t => tarefas.insert(t));
                    return Promise.resolve(dados.tarefas);
                }
                return tarefas.find({}).toArray();
            });
    }
}


module.exports = ServicoDados;