/**
 * Created by tom on 14/03/15.
 */
module.exports = function(grunt) {

    grunt.initConfig(
    {
        bower_concat: {
            all: {
                dest: 'public/js/includes.js',
                cssDest: 'public/css/includes.css'
            }
        },
        browserify: {
            dist: {
                files: {
                    'public/js/modules.js': ['application/*.js']
                }
            }
        },
        watch: {
            files: [ "application/*.js"],
            tasks: [ 'browserify' ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-karma');
};