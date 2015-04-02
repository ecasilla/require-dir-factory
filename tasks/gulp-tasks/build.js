var gulp = require('gulp'),
    config = require('../config');

// BUILD
gulp.task('build', [
  'clean',
  'lint',
  'prettify-html',
  'prettify-css',
  'format-js',
  'test:unit'
]);
