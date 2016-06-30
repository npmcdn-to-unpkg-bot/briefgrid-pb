const postcss = require('gulp-postcss');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');
const pcssImport = require('postcss-import');
const customProps = require('postcss-custom-properties');
const nested = require('postcss-nested');
const mediaQueries = require('postcss-custom-media');
const pcssApply = require('postcss-apply');
const csso = require('postcss-csso');
const pseudoEl = require('postcss-pseudoelements');
const rename = require('gulp-rename');


const processors = [
    autoprefixer({browsers: ['last 4 versions', '> 1%', 'ie 10', 'ie 9', 'Firefox ESR'], flexbox: true}),
    pcssImport,
    pcssApply,
    mqpacker,
    csswring,
    customProps,
    nested,
    mediaQueries,
    pseudoEl,
];


gulp.task('default', ['browser-sync'], function () {
});


// PostCSS -> CSS
gulp.task('css', function () {
    return gulp.src('./src/pcss/main.pcss')
        .pipe(postcss(processors))
        .pipe(rename({extname: ".css"}))
        .pipe(gulp.dest('./public/css'));
});

// Browser-Sync
gulp.task('browser-sync', ['css'], function() {
	browserSync.init({
    server: './public',
	});

	// Compile and reload on Sass changes
	gulp.watch('./src/pcss/**/*.pcss', ['css']);
	gulp.watch('./src/pcss/**/*.pcss').on('change', browserSync.reload);

	// // Reload on Views changes
	// gulp.watch('./front/views/**/*.hbs').on('change', browserSync.reload);
});
