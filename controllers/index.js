"use strict";

let ControladoraHomepage = require("./controladorHomepage");

module.exports.init = function(app){
    new ControladoraHomepage().init(app);
};