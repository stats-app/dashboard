/**
 * Created by tom on 14/03/15.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'build/_bower.js',
                cssDest: 'build/_bower.css'
            }
        }
    } );

    grunt.loadNpmTasks('grunt-bower-concat');
};