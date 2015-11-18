"use strict";

let mongo = require('promised-mongo');

let theDb = null;


class Repositorio{
    constructor(mongoDbUrl){
        this.mongoDbUrl = mongoDbUrl;
        if(!theDb){
            theDb = mongo(this.mongoDbUrl, ['tarefas']);
        }
    }

    obtemTarefas(){
        return theDb.tarefas;
    }
}

module.exports = Repositorio;