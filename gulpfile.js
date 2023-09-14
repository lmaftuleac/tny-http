const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Define a task to minify JavaScript and rename to 'index.min.js'
gulp.task('minify-js', () => {
  return gulp.src('src/*.js') // Source files to minify
    .pipe(concat('index.js'))
    .pipe(uglify()) // Minify JavaScript
    .pipe(rename('index.min.js')) // Rename the minified file
    .pipe(gulp.dest('dist')); // Destination folder for minified files
});

// Define a default task
gulp.task('default', gulp.series('minify-js'));
