module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, src: ['app/**'], dest: 'dist/'},
          {expand: true, cwd: 'wwwroot', src: '**', dest: 'dist/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy']);
};