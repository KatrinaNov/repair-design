const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
  gulp.watch("src/*.html").on('change', browserSync.reload);
});
// минифицировать css
gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(rename({
      suffix: '.min',
      prefix: ''
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function() {
  gulp.watch("src/css/*.css").on('change', browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'minify-css'));