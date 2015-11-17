"use strict";

module.exports = function(grunt){
    grunt.initConfig({
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
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    //grunt.registerTask("default", ["copy"])
};