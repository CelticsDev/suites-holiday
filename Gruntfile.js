module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*=============================
    =            WATCH            =
    =============================*/

    watch: {
      html: {
        files: ['src/suites-holiday.html',
                'src/html/*.html'],
        tasks: ['htmlmin', 'import','notify:done']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['import','notify:done', 'uglify']
      },
      css: {
        files: ['src/scss/*.scss',
                'src/scss/mixins/*.scss'],
        tasks: ['sass', 'import','notify:done']
      }
    },

    /*===================================
    =            MINIFY HTML            =
    ===================================*/
    
    htmlmin: {                                   
       dist: {                                    
         options: {                               
           removeComments: true,
           collapseWhitespace: true
         },
         files: {                                  
           'src/html/min/template.min.html': 'src/html/template.html' // CHANGE TEMPLATE NAME
         }
       }
     },

     /*====================================
     =            COMPILE SASS            =
     ====================================*/
       
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
        },
        files: {
          'dist/css/suites-holiday.css': 'src/scss/suites-holiday.scss'
        }
      },
      min: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'dist/css/suites-holiday.min.css': 'src/scss/suites-holiday.scss'
        }
      }
    },

    /*=========================================
    =            UGLIFY JAVASCRIPT            =
    =========================================*/ 

    uglify: {
      dist: {
        files: {
          'dist/js/suites-holiday.min.js': 'dist/js/suites-holiday.js'
        }
      }
    },

    /*==============================
    =            IMPORT            =
    ==============================*/
    
    import: {
      options: {},
      dist: {
        files: {
          'dist/js/suites-holiday.js' : 'src/js/suites-holiday.js',
          'dist/suites-holiday.ready.html' : 'src/suites-holiday.html'
        }
      }
    },

    /*==============================
    =            NOTIFY            =
    ==============================*/
    
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, 
        title: "suites-holiday", 
        success: false, 
        duration: 1 
      }
    },
    notify: {
      done: {
        options: {
          title: 'Grunt - suites-holiday',
          message: 'DONE!', 
        }
      }
    }
  });

  /*==================================
  =            LOAD TASKS            =
  ==================================*/
  
  
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-import');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-notify');
  grunt.task.run('notify_hooks');
  grunt.registerTask('default',['watch']);
};
