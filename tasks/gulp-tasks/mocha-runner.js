var gulp = require('gulp'),
    inject = require('gulp-inject'),
    config = require('../config');

gulp.task('runner', function () {

  var target = config.runner.src.html;
  var jsfiles = config.runner.src.js;
  var testfiles = config.runner.src.test;
  return gulp.src(target)
  .pipe(inject(
    gulp.src(jsfiles, {read: false}),
    {name: 'lib'}
  ))
  .pipe(inject(
    gulp.src(testfiles, {read: false}),
    {name: 'test'}
  ))
  .pipe(gulp.dest('test'));
});
