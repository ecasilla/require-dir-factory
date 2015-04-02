var gulp = require('gulp'),
    clean = require('gulp-rimraf'),

    config = require('../config');


gulp.task('clean', function () {
  return gulp.src([config.build.path], { read: false })
    .pipe(clean());
});

