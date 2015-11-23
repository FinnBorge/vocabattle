module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    /* How to execute the tasks */
    pkg: grunt.file.readJSON('package.json'),
    /* configure the less package */
    less: {
      /* subtasks */
      dev: {
        options: {
          sourceMap: true,
          sourceMapFileInline: true
        },
        /* this syntax depends on the grunt-contrib, check the documentation */
        src: 'src/less/app.less',
        dest: 'build/css/app.css'
      },
      prod: {
        /* production subtask */
      },

    },
    jshint: {
      all: ['src/**/*.js']
    },
    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 13 versions'})
          ]
        },
        src: 'build/css/*.css'
      }
    },
    watch: {
      options: {
        livereload:{
          port: 35729
        }
      },
      styles: {
        /* find any .less files in src/anything/ and if there are changes execute less:dev */
        files: ['src/**/*.less'],
        tasks: ['less:dev', 'postcss:dev']
      },
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint:all', 'browserify:compile'/*, 'uglify:prod' */]
      }
    },
    browserify: {
      compile: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        src: 'src/js/app.js',
        dest: 'build/js/app.js'
        /* Matt H sends this (dest:'///') to app.min.js so as to only have a single js file in build.  I want to see the non-minified */
      }
    },
    uglify: {
      prod:{
        src:'build/js/app.js',
        dest:'build/js/app.min.js'
      }
    },
    bower: {
      /* by default this looks for the bower.json and installs */
      install: {

      }
    }
  });
  /* need grunt-contrib-less or whichever package.  They have LESS or whichever in them*/
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-task');
  /* Below, we register actual tasks, this creates the 'default' task that uses LESS : subprocess*/
  // we dont want uglify in dev
  grunt.registerTask('default', ['less:dev', 'postcss:dev', 'jshint:all', 'browserify:compile', /* 'uglify:prod', */ 'watch']); //calling watch without a subprocess hits all the subprocesses
  grunt.registerTask('install', ['bower']);
};
