var gulp   = require('gulp'),
    mocha  = require('gulp-mocha');
    config = require('../config');

gulp.task('test:unit',['runner'],function() {
  gulp.src(config.spec.path, {read: false})
  .pipe(mocha(config.spec.options)); 
})
