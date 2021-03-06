/* File: gulpfile.js */

// grab our gulp packages
const gulp = require('gulp');
const bs = require('browser-sync').create();
const path = require('path');
const karma = require('karma').Server;
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

const reload = bs.reload;

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
});

gulp.task('browser-sync', () => {
  bs.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: process.env.PORT || 8080,
    ghostMode: false
  });
});

gulp.task('karma', ['scripts'], (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('src/*.js', reload);
  gulp.watch('src/css/*.css', reload);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('jasmine/spec/inverted-index-test.js', reload);
});

// create a default task and just log a message
gulp.task('default', ['browser-sync', 'scripts', 'watch']);

gulp.task('test', ['scripts', 'karma']);
