"use strict";

class ServicoUtilizadores{
    constructor(repositorio){
        this.repositorio = repositorio;
    }

    obtemUtilizadores(){
        return this.repositorio.obtemUtilizadores().find({}).toArray();
    }

    adicionaUtilizador(dadosUtilizador){
        let utilizadores = this.repositorio.obtemUtilizadores();
        return utilizadores.findOne({username: dadosUtilizador.username})
            .then(utilizador => {
                if(utilizador){
                    throw "Já existe um utilizador com esse username.";
                }
                return utilizadores.insert(dadosUtilizador);
            });
    }

    obtemUtilizador(username){
        return this.repositorio.obtemUtilizadores().findOne( {username} );
    }
}

module.exports = ServicoUtilizadores;