const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const browserSync = require('browser-sync').create(); //compile scss into css
const plumber = require('gulp-plumber');
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const csscomb = require('gulp-csscomb');
const del = require("del");
const sourcemaps = require('gulp-sourcemaps');

const processors = [
    pxtorem({
        rootValue: 10,
        unitPrecision: 5,
        propList: ['font*', 'line-height', 'letter-spacing', 'word-spacing', 'margin*', 'padding*'],
        replace: true
    }),
    autoprefixer()
];

function styles() {
    return gulp.src('build/css/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(csscomb())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
        //.pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('build/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
        //.pipe(browserSync.stream());
}

function watch() {
    /*browserSync.init({
        server: {
            baseDir: "./",
            index: "/index.php",
            proxy: "local.dev",
            notify: false
        }
    });*/
    gulp.watch('build/css/**/*.scss', styles)
    gulp.watch('build/js/**/*.js', scripts)
    //gulp.watch('index.php').on('change', browserSync.reload);
    //gulp.watch('app/js/widget.js').on('change', browserSync.reload);
}

function buildcss() {
    return gulp.src('css/style.css')
        .pipe(plumber())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest('css'))
}

function buildjs() {
    return gulp.src('js/utility.js')
        .pipe(plumber())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
}

// Clean assets
function cleanstyles() {
    return del(["app/dist/css/"]);
}

function cleanscripts() {
    return del(["app/dist/js"]);
}

exports.watch = watch;
exports.styles = styles;
exports.scripts = scripts;
exports.default = gulp.series(styles, scripts, watch);
//exports.build = gulp.series(gulp.parallel(styles, scripts), gulp.parallel(cleanstyles, cleanscripts), gulp.parallel(buildcss, buildjs));
exports.build = gulp.series(gulp.parallel(styles, scripts), gulp.parallel(buildcss, buildjs));


//Testing Processes
exports.prodcss = buildcss;
exports.prodjs = buildjs;
//exports.clean = gulp.parallel(cleanstyles, cleanscripts);