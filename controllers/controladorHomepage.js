"use strict";

class ControladorHomepage{
    constructor(servicoDados){
        this.servicoDados = servicoDados;
    }
    init(app){
        app.get("/", (req, res) => this.index.call(this, req, res));
        app.post("/novaCategoria", (req, res) => this.novaCategoria.call(this, req, res));
        app.get("/tarefas/:nomeCategoria", (req, res) => this.tarefas.call(this, req, res));
    }
    index(req, res){
        //erro podera ser usado no futuro
        this.servicoDados.obtemTarefas()
            .then(tarefas => {
                let erro =req.flash("errorInfo")[0];
                res.render("index", {titulo: "Lista de tarefas", erro: erro, tarefas: tarefas});
            })
            .catch(err => {
                res.render("index", {titulo: "Lista de tarefas", erro: err, tarefas: []});
            });
    }
    novaCategoria(req, res){
        let nomeCategoria = req.body.categoria;
        this.servicoDados.insereTarefa(  { categoria: nomeCategoria,tarefas: [] })
            .then(t => {
                res.redirect("/" + nomeCategoria);
            })
            .catch(err =>{
                req.flash("errorInfo", err);
                res.redirect("/");
            });
    }
    tarefas(req, res){
        let nomeCategoria = req.params.nomeCategoria;
        res.render("tarefas", {titulo: "Tarefas de " + nomeCategoria});
    }
}
module.exports = ControladorHomepage;