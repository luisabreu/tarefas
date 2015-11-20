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
    insereTarefa(tarefa){
        let tarefas = this.repositorio.obtemTarefas();
        return tarefas.find({categoria: tarefa.categoria}).count()
            .then(total => {
                if(total > 0){
                    throw "Registo duplicado.";
                }
                return this.repositorio.obtemTarefas()
                    .insert(tarefa);
            });

    }

    obtemTarefasDeCategoria(nomeCategoria){
        let tarefas = this.repositorio.obtemTarefas();
        return tarefas.findOne({categoria: nomeCategoria});
    }

    adicionaTarefa(nomeCategoria, tarefa){
        let tarefas = this.repositorio.obtemTarefas();
        return tarefas.update({categoria: nomeCategoria}, { $push: {tarefas: tarefa}});

    }

    eliminaTarefa(nomeCategoria, tarefa){
        let tarefas = this.repositorio.obtemTarefas();
        return tarefas.update({categoria: nomeCategoria}, { $pull: { tarefas: { descricao: tarefa.descricao } } });
    }
}

module.exports = ServicoDados;