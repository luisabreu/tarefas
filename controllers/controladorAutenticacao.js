"use strict";

let crypto = require("crypto");
let credential = require("credential");


let passport = require("passport");
let authLocal = require("passport-local");

function geraPassword(password){
    return new Promise((resolve, reject) => {
        credential.hash(password, (err, hash) => {
            if(err){
                reject(err);
                return;
            }
            resolve(hash);
        });
    });
}

function verificaPassword(password, dadosPalavraChave){
    return new Promise((resolve, reject) => {
        credential.verify(dadosPalavraChave, password, (err, passValida) => {
            if(err){
                reject(err);
                return;
            }
            resolve(passValida);
        });
    });
}

class ControladorAutenticacao{
    constructor(servicoUtilizadores){
        this.servicoUtilizadores = servicoUtilizadores;
    }

    init(app){

        passport.use(new authLocal.Strategy((username, password, done) => {
            this.servicoUtilizadores.obtemUtilizador(username)
                .then(utilizador => {
                    if(!utilizador){
                        done(null, false, {erro: "Credenciais inválidas." });
                    }
                    return verificaPassword(password, utilizador.dadosPalavraChave)
                        .then(passValida => done(null, passValida ? utilizador : {erro: "Credenciais inválidas"}));
                })
                .catch(err => {
                    done(err);
                });
        }));

        passport.serializeUser((user, next) => next(null, user.username));
        passport.deserializeUser((key, next) => {
            this.servicoUtilizadores.obtemUtilizador(key)
                .then(utilizador => {
                    if(!utilizador){
                        next(null, false, {erro : "Credenciais inválidas."});
                        return;
                    }
                    next(null, utilizador);
                })
                .catch((err) => {
                    next(err);
                });
        });
        app.use(passport.initialize());
        app.use(passport.session());

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

        geraPassword(req.body.password).then( dadosPass => {
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
        let authFunction = passport.authenticate("local", (err, user, info) => {
            if(err){
                next(err);
                return;
            }
            req.logIn(user, (err) =>{
                if(err){
                    next(err);
                }
                else{
                    res.redirect("/");
                }
            });
        });
        authFunction(req, res, next);
    }

}

module.exports = ControladorAutenticacao;