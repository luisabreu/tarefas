"use strict";

class ControladorAutenticacao{
    constructor(servicoUtilizadores, gestorAutenticacao){
        this.servicoUtilizadores = servicoUtilizadores;
        this.gestorAutenticacao = gestorAutenticacao;
    }

    init(app){
        this.gestorAutenticacao.init(app);
        app.get("/registar", (req, res) => this.registar.call(this, req, res));
        app.post("/registar", (req, res) => this.novoUtilizador.call(this, req, res));

        app.get("/login", (req, res) => this.login.call(this, req, res));
        app.post("/login", (req, res, next) => this.verificaCredenciais.call(this, req, res, next));
    }

    registar(req, res){
        res.render("registar", {erro: req.flash("erroCriacaoUtilizador")[0]});
    }

    novoUtilizador(req, res){

        var utilizador = {
            nome: req.body.nome,
            username: req.body.username,
            email: req.body.email
        };

        this.gestorAutenticacao.geraPassword(req.body.password).then( dadosPass => {
                utilizador.dadosPalavraChave = dadosPass;
                return this.servicoUtilizadores.adicionaUtilizador(utilizador)
                    .then(() => {
                        res.redirect("/login");
                    });
            })
            .catch(err => {
                req.flash("erroCriacaoUtilizador", "Não foi possível criar o novo utilizador: " + err);
                res.redirect("/registar");
            });
    }

    login(req, res){
        res.render("login", {erro: req.flash("erroVerificacaoCredenciais")[0]});
    }

    verificaCredenciais(req, res, next){
        this.gestorAutenticacao.verificaCredenciais(req, res, next)
            .then(() => {
                req.logIn(user, (err) => {
                    if (err) {
                        throw err;
                    }
                    res.redirect("/");
                });
            })
            .catch((err ) => {
                req.flash("erroVerificacaoCredenciais", err.message);
                res.redirect("/login");
            });
    }
}

module.exports = ControladorAutenticacao;