// GULP FILE

 var gulp = require('gulp'),
 	concatCSS = require('gulp-concat-css'),
 	minifyCSS = require('gulp-minify-css'),
 	watch = require('gulp-watch');

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