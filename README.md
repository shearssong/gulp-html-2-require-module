#gulp-html-2-require-module

gulp插件（把html模版生成requirejs的define形式到一个js）

##用法##

>   1. npm install gulp-html-2-require-module

>   2. var gulp = require('gulp');
>      var html2requireModule = require('gulp-html-2-require-module');
>       
>      var config = {
>        src: 'src',
>        output: 'release'
>      };
>       
>      gulp.task('default', function () {
>        gulp.src(config.src + '/templates/*.html')
>          .pipe(html2requireModule('tpls.js'))
           .pipe(gulp.dest(config.src + '/js/common'));
>      });
