var gulp = require('gulp'),
config = require('../config')

gulp.task('watch', function () {
  gulp.watch(config.lint.all, ['build']);
  gulp.watch(config.spec.path,['test:unit']);
});
