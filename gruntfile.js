module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: './server/_tests/init'
        },
        src: ['./server/_tests/**/*.js']
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "client/js/lib",
          mainConfigFile: "client/js/app.js",
          name: "app", 
          out: "client/js/app-built.js"
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'web.js'  
        } 
      }
    },
    watch: {
      options: {
        spawn: false,
      }
    }
  });

  // Test task, set NODE_ENV for loading proper config
  grunt.registerTask('test', ['env:test', 'mochaTest']);

  grunt.registerTask('default', ['requirejs', 'mochaTest', 'express:dev','watch']);

};