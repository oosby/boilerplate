var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var path = require('path');


var bundlePaths = {
    mainJs: ['index.js'],
    srcJs: ['index.js',
            '**/*.js'
        ],
    srcLess: ['public/src/main.less'],
    dest: 'build/js'
}

function compile() {
    var bundler = watchify(browserify(bundlePaths.mainJs, {debug: true}).transform(babelify, {presets: ['es2015', 'stage-1']}));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build/'));
    }

    rebundle();
}

function watch() {
    gulp.watch(bundlePaths.srcJs, ['build']);
    gulp.watch(bundlePaths.srcLess, ['style']);
}

gulp.task('style', function() {
    return gulp.src(bundlePaths.srcLess)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/build/css'));
})
gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['build', 'style']);
