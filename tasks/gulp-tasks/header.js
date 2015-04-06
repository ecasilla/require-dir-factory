var header = require('gulp-header'),
    gulp   = require('gulp'),

    config = require('../config');

var pkg = require('../../package.json');
var banner = [
  '/**',
  ' * <%= pkg.name %> -',
  ' * <%= pkg.description %>',
  ' * @author <%= pkg.author %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('header',function() {
 return gulp.src(config.prettify.js.files)
  .pipe(header(banner, { pkg : pkg } ))
  .pipe(gulp.dest(config.prettify.js.files))
})
