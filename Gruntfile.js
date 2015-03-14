/**
 * Created by tom on 14/03/15.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'public/js/includes.js',
                cssDest: 'public/css/includes.css'
            }
        }
    } );

    grunt.loadNpmTasks('grunt-bower-concat');
};