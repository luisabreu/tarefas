"use strict";

module.exports = function(grunt){
    grunt.initConfig({
        nodemon:{
            dev:{
                script:"index.js"
            }
        },
        watch:{
            files:["controllers/*.js", "domain/*.js"],
            tasks:["nodemon"]
        },
        copy:{
            main:{
                files:[
                    {
                        expand: true,
                        src:["bower_components/bootstrap/dist/css/*.min.css"],
                        dest:"public/css/",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src:["bower_components/bootstrap/dist/fonts/**"],
                        dest:"public/fonts/",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src:["bower_components/bootstrap/dist/js/*.min.js"],
                        dest:"public/js/",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src:["bower_components/jquery/dist/*.min.js"],
                        dest:"public/js/",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src:["bower_components/angular/angular.min.js","bower_components/angular-bootstrap/ui-bootstrap.min.js"],
                        dest:"public/js/",
                        filter: "isFile",
                        flatten: true
                    },
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");

    //grunt.registerTask("default", ["copy"])
};