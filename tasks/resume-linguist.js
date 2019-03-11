// Split JSONresume notation into several .json with corresponding languages
// Format: "lang_key": "value". For example:
// "key": "value" - will be similar for both languages
// "en_key": "value" - will only be included into the English version
// "fr_key": "value" - will only be included into the French version

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('resumesplit', 'Split multi-lingual JSONresume file into several single-language files.', function() {
    let self = this;
    let source = grunt.file.read(this.data.file).split("\n");
    this.data.languages.forEach(function(lang){
      grunt.log.writeln('Processing language: ' + lang)
      let substr = '(?<=")'+lang+'_(.)*(?=":)';
      let exp = new RegExp(substr,"g");
      let result = source;
      result.forEach(function(line, index, object){
        if (exp.test(line)) {
            object.splice(index, 1)
        }
      });
      grunt.log.writeln(result.join('\n'));
    })
  });

};
