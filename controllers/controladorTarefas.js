"use strict";

class ControladorTarefas{
    constructor(servicoDados){
        this.servicoDados = servicoDados;
    }
    init(app){
        app.get("/api/tarefas/:nomeCategoria", (req, res) => this.obtemTarefasDeCategoria.call(this, req, res));
        app.post("/api/tarefas/:nomeCategoria", (req, res) => this.insereTarefa.call(this, req, res));
    }

    obtemTarefasDeCategoria(req, res){
        let categoria = req.params.nomeCategoria;
        this.servicoDados.obtemTarefasDeCategoria(categoria)
            .then(tarefas => {
                res.set("Content-Type", "application/json");
                res.status(200).send(tarefas!= null ? tarefas.tarefas : []);
            })
            .catch(erro => {
                res.status(400).send(erro);
            });

    }
    insereTarefa(req, res){
        let categoria = req.params.nomeCategoria;
        let tarefa = {
            descricao: req.body.descricaoTarefa,
            autor: 'Luis Abreu'
        };
        this.servicoDados.adicionaTarefa(categoria,tarefa)
            .then(() => {
                res.set({"Content-Type": "application/json"});
                res.status(201).send(tarefa);
            })
            .catch(err => {
                res.staus(400).send("Erro ao adicionar tarefa: " + err);
            });
    }
}

module.exports = ControladorTarefas;