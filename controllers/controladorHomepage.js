"use strict";

class ControladorHomepage{
    constructor(servicoDados){
        this.servicoDados = servicoDados;
    }
    init(app){
        app.get("/", (req, res) => this.index.call(this, req, res));
    }
    index(req, res){
        //erro podera ser usado no futuro
        res.render("index", {titulo: "Lista de tarefas", erro: null, tarefas: this.servicoDados.obtemTarefas()});
    }
}

module.exports = ControladorHomepage;