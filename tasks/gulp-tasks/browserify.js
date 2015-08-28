var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    config     = require('../config');
 
gulp.task('browserify:js', function() {
  gulp.src(config.js)
  .pipe(browserify({
    insertGlobals : true,
    debug : !gulp.env.production
  }))
  .pipe(gulp.dest(config.build.path))
});
gulp.task('browserify:test', function() {
  gulp.src(config.test)
  .pipe(browserify({
    insertGlobals : true,
    debug : !gulp.env.production
  }))
  .pipe(gulp.dest(config.build.path))
});
