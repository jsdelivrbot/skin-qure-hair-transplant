var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
// var connect = require('gulp-connect-php');

// Image Compresion Plugin
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// Deleter Files
var del = require('del');
var zip = require('gulp-zip');

var SRC_PATH = 'src';
var DIST_PATH = 'dist';
// var SCRIPTS_PATH = SRC_PATH + '/scripts/**/*.js';
var SCRIPTS_PATH = SRC_PATH + '/scripts/script.js';
// var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = SRC_PATH + '/scss/**/*.scss';
var IMAGES_PATH = SRC_PATH + '/images/**/*.{png,jpeg,jpg,svg,gif}';

// SCSS
gulp.task('styles', function () {
	console.log('Styles log'); 
	return gulp.src(['src/scss/styles.scss'])
	.pipe(plumber(function (err) {
		console.log('Style Task Error')
		console.log(err);
		this.emit('end');
	}))
		.pipe(sourcemaps.init()) // Init SourceMap
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write()) // Write After All Process and before path
		.pipe(gulp.dest(DIST_PATH + '/css'))
		.pipe(livereload());
	});


// All External CSS Included Files
gulp.task('css', function(){
	return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
	.pipe(gulp.dest('dist/css/'));
});

// All External CSS Included Files
gulp.task('js', function(){
	return gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest('dist/js/'));
});


// Scripts
gulp.task('scripts', function () {
	console.log('scripts log');  

	return gulp.src(['src/scripts/menu.js', 'src/scripts/script.js'])
	.pipe(plumber(function (err) {
		console.log('Scripts Task Error')
		console.log(err);
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets : ['es2015']
	}))
	.pipe(uglify())
	.pipe(concat('scripts.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH + '/js'))
	.pipe(livereload());
});


// Images
gulp.task('images', function () {
	return gulp.src(IMAGES_PATH)
	.pipe(imagemin(
		[
		imagemin.gifsicle(),
		imagemin.jpegtran(),
		imagemin.optipng(),
		imagemin.svgo(),
		imageminPngquant(),
		imageminJpegRecompress()
		]
		)) 
	.pipe(gulp.dest(DIST_PATH + '/images'));
});

;

gulp.task('clean' , function() {
	return del.sync([
		'dist' //Can be a dist
		]);
});


// Default
gulp.task('default', ['images', 'styles', 'js'] ,function () {
	console.log('default log');  
});

// Zip File
gulp.task('export', function () {
	return gulp.src('src/**/*')
	.pipe(zip('website.zip'))
	.pipe(gulp.dest('./'))
});

gulp.task('watch', ['default'], function(){
	console.log('Watch Changes');
//	gulp.watch(SCRIPTS_PATH, ['scripts']);
	// gulp.watch(CSS_PATH, ['styles']);
	gulp.watch(SCSS_PATH, ['styles']);
})