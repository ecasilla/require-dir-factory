var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    config = require('../config');

gulp.task('lint', function() {
  return gulp.src(config.lint.all)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
