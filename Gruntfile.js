module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded',
        },
        files: {                         
          'source/build/s.css': 'source/<%= pkg.name %>.sass',       
        }
      }
    },
    cssmin: {
      target: {
        src : "source/build/s.css",
        dest : "s.css"
      }
    },
    jshint: {
      files: ['source/<%= pkg.name %>.js'],
      options: {
          esnext: true
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>\n<%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        src: 'source/<%= pkg.name %>.js',
        dest: 'source/build/j.min.js'
      }
    },
    'string-replace': {
      inline: {
        files: {
          'source/build/h.html': 'source/<%= pkg.name %>.html',
        },
        options: {
          replacements: [
            {
              pattern: '<script src="./mkrl.js"></script>',
              replacement: '<script><%= grunt.file.read("./source/build/j.min.js") %></script>'
            },
            {
              pattern: '<link rel="stylesheet" href="./mkrl.css">',
              replacement: '<link rel="stylesheet" href="./s.css">'
            },
            {
              pattern: '<script src="../plainterm/build/plainterm.js.min.js"></script>',
              replacement: '<script src="./plainterm/build/plainterm.js.min.js"></script>'
            },
            {
              pattern: '<link rel="stylesheet" href="../plainterm/build/plainterm.js.min.css">',
              replacement: '<link rel="stylesheet" href="./plainterm/build/plainterm.js.min.css">'
            }
          ]
        }
      },
      size: {
        files: {
          'README.md': 'source/<%= pkg.name %>.md',
        },
        options: {
          replacements: [
            {
              pattern: '<<size>>',
              replacement: '<%= grunt.file.read("./source/build/size") %>'
            }
          ]
        }
      }
    },
    file_info: {
      source_files: {
        src: ['index.html', 's.css', 'plainterm/build/plainterm.js.min.css', 'plainterm/build/plainterm.js.min.js'],
        options: {
          inject: {
            dest: './source/build/size',
            text: '{{= sizeText(size(src[0])+size(src[1])+size(src[2])+size(src[3])) }} ({{= sizeText(gzipSize(src[0])+gzipSize(src[1])+gzipSize(src[2])+gzipSize(src[3])) }} gzipped)'
          }
        }
      }
    },
    htmlmin: {                                    
     dist: {                                      
       options: {                                 
         removeComments: true,
         collapseWhitespace: true
       },
       files: {                                   
         'index.html': 'source/build/h.html'
       }
     }
    },
    clean: ['source/build']
  });

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-file-info');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin', 'string-replace:inline', 'htmlmin', 'file_info', 'string-replace:size', 'clean']);
};