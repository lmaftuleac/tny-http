'use strict';

//Plugins
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var files = [
    './src/http-error-handler.provider.js',
    './src/http-headers.provider.js',
    './src/http-interceptors.provider.js',
    './src/http-json-interceptor.provider.js',
    './src/http.service.js',
    './src/http-include-interceptors.js'
]

gulp.task('concat',function() {
    return gulp.src(files)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('uglify',['concat'],function() {
    return gulp.src('./index.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./'));
});

gulp.task('min',['concat', 'uglify']);


