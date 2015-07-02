var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'), //sass的编译
    autoprefixer = require('gulp-autoprefixer'), //自动添加css前缀
    minifycss = require('gulp-minify-css'), //压缩css
    uglify = require('gulp-uglify'), //压缩js代码
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并js文件
    notify = require('gulp-notify'), //更改提醒
    browserSync = require('browser-sync').create(); //自动刷新页面
    var reload = browserSync.reload;

gulp.task('browserify',function() {
    gulp.src('public/js/APP.js')
        .pipe(browserify({transform:'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'))
        .pipe(notify({ message: 'js操作完成！' }));
});
gulp.task('react',function() {
    gulp.src('public/js/components/*.js')
        .pipe(browserify({transform:'reactify'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/build'))
        .pipe(notify({ message: 'js操作完成！' }));
});
// sass 编译sass、自动添加css前缀和压缩
gulp.task('sass', function() {
  return gulp.src('public/css/*.scss')
    .pipe(sass({sourcemap: true}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'))
    .pipe(reload({stream:true}))
    .pipe(notify({ message: 'sass操作完成！' }))
    .pipe(reload({stream: true}))
});

gulp.task('default',['browserify','sass','react']);

gulp.task('watch',function (){
    // gulp.watch('public/js/APP.js',['browserify']);
    gulp.watch('public/css/*.scss',['sass']);

});