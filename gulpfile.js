var gulp = require('gulp'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	shell = require('gulp-shell');

livereload({
	start: true,
	reloadPage: 'deploy/index.html'
});

gulp.task('build', shell.task([
	'riot public/tags public/javascripts/tags.js',
	'assetspkg -c assets.yml -g --js-bundle-to "../deploy" --css-bundle-to "../deploy"',
	'date +%s > deploy/dummy',
]));
gulp.task('w', function() {
	livereload.listen();
	watch('public/**', function() {
		shell.task([
			'riot public/tags public/javascripts/tags.js',
			'assetspkg -c assets.yml -g --js-bundle-to "../deploy" --css-bundle-to "../deploy"',
			'date +%s > deploy/dummy',
		]);
	});
	watch('deploy/**', function() {
		livereload();
		console.log('reload');
	});
});