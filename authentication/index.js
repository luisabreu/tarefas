"use strict";

let crypto = require("crypto");
let credential = require("credential");

let passport = require("passport");
let authLocal = require("passport-local");

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
};

class GestorAutenticacao{
    constructor(servicoUtilizadores){
        this.servicoUtilizadores = servicoUtilizadores;
    }

    init (app){
        passport.use(new authLocal.Strategy((username, password, done) => {
            this.servicoUtilizadores.obtemUtilizador(username)
                .then(utilizador => {
                    if(!utilizador){
                        done(null, false, {message: "Credenciais inválidas." });
                    }
                    return verificaPassword(password, utilizador.dadosPalavraChave)
                        .then(passValida => {
                            if(passValida){
                                return done(null, utilizador);
                            }
                            return done(null, false, {message: "Credenciais inválidas"});
                        })
                        .catch(err => done(err));
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
    }

    geraPassword(password){
        return new Promise((resolve, reject) => {
            credential.hash(password, (err, hash) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(hash);
            });
        });
    };

    verificaCredenciais(req, res, next){
        return new Promise((resolve, reject) => {
            let authFunction = passport.authenticate("local", (err, user, info) => {
                if (err) {
                    reject(err);
                }
                if (!user) {
                    reject(new Error("Credenciais inválidas."));
                }
                resolve(user);
            });
            authFunction(req, res, next);
        });
    }

    static estaAutenticadoHttp(req, res, next){
        if(req.isAuthenticated()){
            next();
        }
        else{
            res.redirect("/login");
        }
    }

    static estaAutenticadoWebApi(req, res, next){
        if(req.isAuthenticated()){
            next();
        }
        else{
            res.send(401, "Not authorized");
        }
    }
}

module.exports = GestorAutenticacao;