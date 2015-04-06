var gulp = require('gulp'),
    config = require('../config');

// BUILD
gulp.task('build', [
  'clean',
  'lint',
  'format-js',
  'test:unit'
]);
