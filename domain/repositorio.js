"use strict";

let mongo = require('promised-mongo');

let theDb = null;


class Repositorio{
    constructor(mongoDbUrl){
        this.mongoDbUrl = mongoDbUrl;
        if(!theDb){
            theDb = mongo(this.mongoDbUrl, ['tarefas', 'utilizadores']);
        }
    }

    obtemTarefas(){
        return theDb.tarefas;
    }
    obtemUtilizadores(){
        return theDb.utilizadores;
    }

}

module.exports = Repositorio;