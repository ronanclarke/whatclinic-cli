module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('default', ['mochaTest']);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js'],

        options: {
          timeout: 1000,
          reporter: "spec"
        },
      },
    },

    watch: {

      src: {
        files: ['index.js','src/**/*.js','test/**/*.js','config/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: true,
        },
      },

    },
  });


  // Load the plugin that provides the "uglify" task.


};