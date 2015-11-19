"use strict";

class ControladorTarefas{
    constructor(servicoDados){
        this.servicoDados = servicoDados;
    }
    init(app){
        app.get("/tarefas/:nomeCategoria", (req, res) => this.obtemTarefasDeCategoria.call(this, req, res));
    }

    obtemTarefasDeCategoria(req, res){
        let categoria = req.params.nomeCategoria;
        this.servicoDados.obtemTarefasDeCategoria(categoria)
            .then(tarefas => {
                res.set("Content-Type", "application/json");
                res.send(tarefas!= null ? tarefas.tarefas : []);
            })
            .catch(erro => {
                res.send(400, erro);
            });

    }
}

module.exports = ControladorTarefas;