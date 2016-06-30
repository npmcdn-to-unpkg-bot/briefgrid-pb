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
const pcssDoc = require('postcss-doc');
const styleGuide = require('postcss-style-guide');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cssStats = require('gulp-cssstats');
const parker = require('gulp-parker');


const processors = [
    pcssImport,
    autoprefixer({browsers: ['last 4 versions', '> 1%', 'ie 10', 'ie 9', 'Firefox ESR'], flexbox: true}),
    pcssApply,
    mqpacker,
    customProps,
    nested,
    mediaQueries,
    pseudoEl,
    styleGuide({
      project: 'Brief Media CSS',
      dest: 'public/styleguide/index.html',
      showCode: 'false',
    }),
    csswring,
];


gulp.task('default', ['browser-sync'], function() {
});

gulp.task('analytics', ['css-stats', 'parker'] , function() {

});


// PostCSS -> CSS
gulp.task('css', function() {
    return gulp.src('./src/pcss/main.pcss')
        .pipe(postcss(processors))
        .pipe(rename({extname: ".css"}))
        .pipe(concat('main.min.css'))
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
  gulp.watch('./public/*.html').on('change', browserSync.reload);

	// // Reload on Views changes
	// gulp.watch('./front/views/**/*.hbs').on('change', browserSync.reload);
});


// CSS Analytics reporting
gulp.task('css-stats', function() {
  gulp.src('./public/css/main.css')
    .pipe(cssStats())
    .pipe(rename({basename: "css-stats"}))
    .pipe(gulp.dest('./public/analytics'));
});


// CSS Analytics reporting
gulp.task('parker', function() {
  gulp.src('./public/css/main.css')
    .pipe(parker({
      file: './public/analytics/parker.md'
    }));
});
