"use strict";

var HomeController = require("./homeController");

module.exports.init = function(app){
    new HomeController().init(app);
};