module.exports = function(grunt) {

  BUILD_DIR = 'build';
  SRC_DIR = 'source';

  grunt.task.loadNpmTasks('assemble');
  grunt.task.loadNpmTasks('grunt-contrib-sass');
  grunt.task.loadNpmTasks('grunt-contrib-concat');
  grunt.task.loadNpmTasks('grunt-contrib-uglify');
  grunt.task.loadNpmTasks('grunt-contrib-copy');
  grunt.task.loadNpmTasks('grunt-contrib-clean');
  grunt.task.loadNpmTasks('grunt-contrib-connect');
  grunt.task.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    assemble: {
      options: {
        layout: SRC_DIR + '/layouts/layout.hbs'
      },
      dist: {
        expand: true,
        cwd: SRC_DIR,
        src: '*.hbs',
        dest: BUILD_DIR
      }
    },
    sass: {
      options: {
        bundleExec: true
      },
      dist: {
        files: [
          {
            src: SRC_DIR + '/css/app.scss',
            dest: BUILD_DIR + '/css/app.css'
          }
        ]
      }
    },
    concat: {
      dist: {
        src: [
          SRC_DIR + '/js/lib/jquery.js',
          SRC_DIR + '/js/lib/underscore.js',
          SRC_DIR + '/js/lib/backbone.js',
          SRC_DIR + '/js/app/main.js',
        ],
        dest: BUILD_DIR + '/js/app.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'build/js/app.js': BUILD_DIR + '/js/app.js'
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: SRC_DIR + '/img',
        src: '**/*',
        dest: BUILD_DIR + '/img'
      }
    },
    clean: [BUILD_DIR],
    connect: {
      server: {
        options: {
          port: process.env.PORT || 3000,
          base: BUILD_DIR
        }
      }
    },
    watch: {
      assemble: {
        files: [SRC_DIR + '/*.hsb', SRC_DIR + '/layouts/*'],
        tasks: 'assemble'
      },
      sass: {
        files: SRC_DIR + '/css/*',
        tasks: 'sass'
      },
      js: {
        files: SRC_DIR + '/js/**/*',
        tasks: 'concat'
      },
      copy: {
        files: SRC_DIR + '/img/**/*',
        tasks: 'copy'
      }
    }
  });

  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'sass', 'assemble', 'copy']);
  grunt.registerTask('server', ['clean', 'concat', 'sass', 'assemble', 'copy', 'connect', 'watch']);
  grunt.registerTask('default', ['build']);
};
