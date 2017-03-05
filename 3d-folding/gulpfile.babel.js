import gulp from 'gulp';
import rubysass from 'gulp-ruby-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import babel from 'gulp-babel';
import minifyJs from 'gulp-uglify';

gulp.task('complieCss', () => 
    rubysass('./src/sass/*.scss', {sourcemap: true,style: 'expanded'})
       .pipe(plumber())
       .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 
            remove:true
        }))
       .pipe(minifyCss())
       .pipe(gulp.dest('./dest'))
)

gulp.task('complieJs', () => 
    gulp.src('./src/js/*.js')
      .pipe(plumber())
      .pipe(babel({
        presets: ['es2015','stage-2'],
        plugins: ['es6-promise']
      }))
      .pipe(minifyJs())
      .pipe(gulp.dest('./dest'))
)

gulp.task('default', ['complieCss', 'complieJs'], () => 
    gulp.watch(['./src/sass/*.scss','./src/js/*.js'], ['complieCss','complieJs'])
)
