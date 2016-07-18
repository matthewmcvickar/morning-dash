module.exports = function(grunt) {

  // Load all Grunt tasks.
  require('jit-grunt')(grunt);

  // Configure Grunt tasks.
  grunt.initConfig({

    // SASS compilation and CSS auto-prefixing.
    sass: {
      main: {
        files: {
          '.tmp/style.css': 'src/css/style.scss',
        },
        options: {
          includePaths: [
            'node_modules/'
          ],
          outputStyle: 'compressed'
        }
      }
    },

    autoprefixer: {
      main: {
        src: '.tmp/style.css',
        dest: 'style.css'
      }
    },

    // Concatenate and uglify JS.
    uglify: {
      lib: {
        files: {
          'lib.js' : [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/moment/min/moment.min.js',
            'node_modules/underscore/underscore-min.js',
            'src/js/vendor/skycons.js'
          ]
        }
      },
      script: {
        files: {
          'script.js' : [
            'src/js/script.js',
          ]
        }
      }
    },

    // Image optimization.
    imagemin: {
      options: {
        progressive: true
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    // Optimize SVGs.
    svgmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.svg'],
          dest: 'img/',
          ext: '.svg'
        }]
      }
    },

    // BrowserSync
    browserSync: {
      files: ['style.css'],
      options: {
        watchTask: true,
        open: false,
        proxy: 'morningdash.dev',
        notify: {
          styles: [
            "z-index: 9999",
            "position: fixed",
            "left: 50%",
            "top: 0px",
            "transform: translate(-50%, 0)",
            "margin: 0",
            "padding: 10px 15px",
            "border-bottom-left-radius: 5px",
            "border-bottom-right-radius: 5px",
            "background-color: rgba(0, 0, 0, 0.5)",
            "color: white",
            "font-family: sans-serif",
            "font-size: 12px",
            "font-weight: bold",
            "text-align: center"
          ]
        }
      }
    },

    // Watch and process files.
    watch: {
      sass: {
        files: ['src/css/**/*.scss'],
        tasks: ['sass']
      },

      autoprefixer: {
        files: ['.tmp/*.css'],
        tasks: ['autoprefixer']
      },

      uglify: {
        files: ['src/js/*.js'],
        tasks: ['uglify:script']
      },

      imagemin: {
        files: ['src/img/**/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      },

      svgmin: {
        files: ['src/img/**/*.svg'],
        tasks: ['svgmin']
      },

      reload: {
        files: [
          'index.html',
          'script.js',
          'config.js'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // Register grunt tasks.
  grunt.registerTask(
    'setup',
    [
      'sass',
      'autoprefixer',
      'imagemin',
      'svgmin',
      'uglify'
    ]
  );

  grunt.registerTask(
    'default',
    [
      'setup',
      'browserSync',
      'watch'
    ]
  );

};
