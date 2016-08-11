var gulp = require('gulp');
var dest = gulp.dest;
var concat = require('gulp-concat');

gulp.task('combine-all-10.5.1-ES3', function() {
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
		.pipe(concat('finn-all-10.5.1-ES3.js'))
		.pipe(dest('dist'))
		.pipe(dest('../team-management-gadget/js'))	
});

gulp.task('watch', ['combine-all-10.5.1-ES3'], function () {
	gulp.watch('src/**/*.js', ['combine-all-10.5.1-ES3']);
});