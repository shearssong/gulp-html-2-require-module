##用法##

###1.初始化插件###   


    npm install gulp-html-2-require-module
        
###2.在gulpfile插件里调用###


    var gulp = require('gulp');
    var html2requireModule = require('gulp-html-2-require-module');
    
    var config = {
         src: 'src',
         output: 'release'
    };
        
    gulp.task('default', function () {
        gulp.src(config.src + '/templates/*.html')
            .pipe(html2requireModule('tpls.js'))
            .pipe(gulp.dest(config.src + '/js/common'));
    });
    

##说明##
> 需要传个参数fileName
> 如html2requireModule('tpls.js')

##last##
> 工作顺利哈：）