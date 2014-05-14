module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  
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
    }
  });

  grunt.registerTask('default', []);

  // Test task, set NODE_ENV for loading proper config
  grunt.registerTask('test', ['env:test', 'mochaTest']);

};