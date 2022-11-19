"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass')(require('sass'));

var browserSync = require('browser-sync').create();

var cleanCSS = require('gulp-clean-css');

var autoprefixer = require('gulp-autoprefixer');

var rename = require("gulp-rename");

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});
gulp.task('styles', function () {
  return gulp.src("src/sass/*.+(scss|sass)").pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).pipe(rename({
    prefix: "",
    suffix: ".min"
  })).pipe(gulp.dest("src/css")).pipe(autoprefixer()).pipe(cleanCSS({
    compatibility: 'ie8'
  })).pipe(browserSync.stream());
});
gulp.task('watch', function () {
  gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", browserSync.reload);
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));