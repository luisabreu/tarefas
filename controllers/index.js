"use strict";

let ControladorHomepage = require("./controladorHomepage");
let ServicoDados = require('../services');

module.exports.init = function(app){
    new ControladorHomepage(new ServicoDados()).init(app);
};