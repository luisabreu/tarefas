"use strict";

let qs = require("querystring");
let GestorAutenticacao = require("../authentication");

class ControladorTarefas{
    constructor(servicoDados){
        this.servicoDados = servicoDados;
    }
    init(app){
        app.get("/api/tarefas/:nomeCategoria", GestorAutenticacao.estaAutenticadoWebApi, (req, res) => this.obtemTarefasDeCategoria.call(this, req, res));
        app.post("/api/tarefas/:nomeCategoria", GestorAutenticacao.estaAutenticadoWebApi, (req, res) => this.insereTarefa.call(this, req, res));
        app.delete("/api/tarefas/:nomeCategoria", GestorAutenticacao.estaAutenticadoWebApi, (req, res) => this.eliminaTarefa.call(this, req, res));
    }

    obtemTarefasDeCategoria(req, res){
        let categoria = qs.unescape(req.params.nomeCategoria);
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
        let categoria = qs.unescape(req.params.nomeCategoria);
        let tarefa = {
            descricao: req.body.descricaoTarefa,
            autor: req.user.nome
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

    eliminaTarefa(req, res){
        let categoria = qs.unescape(req.params.nomeCategoria);
        let tarefa = {descricao: req.query.descricao};
        this.servicoDados.eliminaTarefa(categoria, tarefa)
            .then((tarefaAtualizada) => {
                this.servicoDados.obtemTarefasDeCategoria(categoria)
                    .then(tarefas => {
                        res.set({"Content-Type": "application/json"});
                        res.status(201).send(tarefas);
                    });
            })
        .catch(err => res.staus(400).send("Erro ao adicionar tarefa: " + err));
    }
}

module.exports = ControladorTarefas;