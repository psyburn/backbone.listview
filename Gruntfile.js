/*global module:false*/
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    // Task configuration.

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        globals: {
          define: true,
          require: true,
          Backbone: true,
          _: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: 'backbone.listview.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
