var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var config = require('../config');

gulp.task('format-js', function() {
  gulp.src(config.prettify.js.files)
  .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
  .pipe(gulp.dest(config.prettify.js.files))
});

gulp.task('prettify-html', function() {
  gulp.src(config.prettify.html.files)
  .pipe(prettify({indentSize: 2}))
  .pipe(gulp.dest(config.prettify.html.files))
});

gulp.task('prettify-css', function() {
  gulp.src(config.prettify.css.files)
  .pipe(prettify({indentSize: 2}))
  .pipe(gulp.dest(config.prettify.css.files))
});
