import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'

gulp.task('default', ['transpile'])

gulp.task('transpile', () => {

  return browserify('src/app.js')
    .transform('babelify')
    .bundle()
    .on('error', function(){
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))

})

gulp.task('watch', ['transpile'], () => {
  gulp.watch('src/**/*', ['transpile'])
  gulp.src([
    '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    '../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest('dist'))
})
