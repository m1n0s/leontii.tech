/**
 * Created by leontiy on 02.12.2015.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');



gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass(/*{outputStyle: 'compressed'}*/).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', function() {
    console.log('working');
});
