var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//Mover Js para src/js
gulp.task('js', function(){
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
					 'node_modules/jquery/dist/jquery.min.js',
		             'node_modules/popper.js/dist/umd/pooper.min.js'])
	.pipe(gulp.dest("src/js"))
	.pipe(browserSync.stream());
});

// Servidor para olhar os Html/Sass
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./src"
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

//Compilar Sass
gulp.task('sass', function(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream());
});

gulp.task('default',['js', 'serve']);