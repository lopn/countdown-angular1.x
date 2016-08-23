/**
 * Created by gabvk_000 on 2016/8/23.
 */
var gulp = require('gulp')
var uglify = require('gulp-uglifyjs')

gulp.task('uglify', function() {
    gulp.src('src/countdown.js')
        .pipe(uglify('countdown.min.js'))
        .pipe(gulp.dest('dist'));
    gulp.src('src/countdown.js')
        .pipe(gulp.dest("dist/"));
})