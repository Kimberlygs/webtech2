// GULP FILE

 var gulp = require('gulp'),
 	concatCSS = require('gulp-concat-css'),
 	minifyCSS = require('gulp-minify-css'),
 	watch = require('gulp-watch');
 	var jsmin = require('gulp-jsmin');
	var rename = require('gulp-rename');

 gulp.task('minify-css', function(){
 	gulp.src('public/stylesheets/css/*.css')
 		.pipe(concatCSS('build.css'))
 		.pipe(minifyCSS(opts))
 		.pipe(gulp.dest('build/css/'))
 });

 gulp.task('default', ['minify-css']);


 gulp.task('watch', function(){
 	gulp.watch('public/stylesheets/*.css', ['minify-css']);
 });

gulp.task('default', function () {
    gulp.src('/javascripts/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('javascripts/'));
});