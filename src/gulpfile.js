var     gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    rename         = require('gulp-rename'),
    sass           = require('gulp-sass'),
    livereload      = require('gulp-livereload'),
    svgSprite     = require("gulp-svg-sprite"),
    svg2png     = require('gulp-svg2png');
    minify = require('gulp-minify');
 
var config = {
    scripts: [
        './assets/js/vendor/bootstrap/bootstrap.min.js',
        // Modernizr
        './assets/js/vendor/modernizr/modernizr.shiv.js',
        // SVG Fallback
        './assets/js/vendor/svg/svg_fallback.js',
        // Any Custom Scripts
        './assets/js/app/**/*.js'
    ]
};

var paths = {
 scripts: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
 // libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
 // styles: ['styles/**/*.css'],
 // html: ['index.html', '404.html'],
 // images: ['images/**/*.png'],
 // extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

// gulp.task('compress', function() {
//   gulp.src('lib/*.js')
//     .pipe(minify({
//         exclude: ['tasks'],
//         ignoreFiles: ['style.css', '-min.js']
//     }))
//     .pipe(gulp.dest('dist'))
// });
 
gulp.task('scripts', function() {
    return gulp.src(config.scripts)
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('./asset/js/'))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(livereload())
            .pipe(gulp.dest('./asset/js/'));
});
 
gulp.task('sass', function () {
    return gulp.src('./sass/app.scss')
            .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(livereload())
            .pipe(gulp.dest('./'));
});
 
gulp.task('sprites', function () {
    return gulp.src('**/*.svg', {cwd: './assets/svg/individual'})
            .pipe(svgSprite({ shape: { transform: ['svgo'] }, mode: { defs: {dest: '.'} } } ) )
            .pipe(gulp.dest('./assets/svg/'));
});
 
gulp.task('svg2png', function () {
    return gulp.src('./assets/svg/individual/**/*.svg')
            .pipe(svg2png())
            .pipe(gulp.dest('./assets/svg/pngs/'));
});
 
gulp.task('icons', ['sprites', 'svg2png']);
 
gulp.task('watch', function () {
    livereload.listen(35729);
    gulp.watch('**/*.php').on('change', function(file) {
          livereload.changed(file.path);
      });
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.js', ['scripts']);
});
 
gulp.task('default', ['icons', 'sass', 'scripts', 'watch']);