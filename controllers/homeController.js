"use strict";

class HomeController{
    init(app){
        app.get("/", this.index);
    }

    index(req, res){
        res.render("index", {titulo: "Olá de Express!"});
    }
}

module.exports = HomeController;