var gulp = require('gulp');
var rubysass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task('complie', function () {
    return rubysass('*.scss')
           .pipe(plumber())
           .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, 
                remove:true
            }))
           .pipe(minifyCss())
           .pipe(gulp.dest('.'))
})

gulp.task('default', ['complie'], function () {
    gulp.watch('*.scss', ['complie']);
})
