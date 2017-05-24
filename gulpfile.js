var gulp = require('gulp');
var dest = gulp.dest;
var concat = require('gulp-concat');

var package = require('./package.json');
var version = package.version;

gulp.task('10.5.1-ES3', function() {
	return gulp.src([
			'lib/es5-shim/es5-shim.min.js',
			'lib/es5-shim/es5-sham.min.js',
			'lib/Finesse/finesse-10.5.1-ES3.js',
			'lib/Finesse/finesse-config-10.5.1.js',
			'lib/EventEmitter/EventEmitter.js',
			'lib/EventEmitter/heir.js',
			'src/finn-container.js',
			'src/finn.js'
		])
		.pipe(concat('finn-10_5_1_ES3-' + version + '.js'))
		.pipe(dest('dist'))
});

gulp.task('11.0+', function() {
	return gulp.src([
			'lib/es5-shim/es5-shim.min.js',
			'lib/es5-shim/es5-sham.min.js',
			'lib/EventEmitter/EventEmitter.js',
			'lib/EventEmitter/heir.js',
			'src/finn-container.js',
			'src/finn.js'
		])
		.pipe(concat('finn-' + version + '.js'))
		.pipe(dest('dist'))
});

gulp.task('watch', ['10.5.1-ES3', '11.0+'], function () {
	gulp.watch('src/**/*.js', ['10.5.1-ES3', '11.0+']);
});

gulp.task('default', ['10.5.1-ES3', '11.0+']);