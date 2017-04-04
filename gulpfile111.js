var gulp = require("gulp");

//合并文件
var concat = require("gulp-concat");
gulp.task('cat',function(){

	gulp.src( './Admin/*.js' ) //如果在gulp.src()方法里面传参数为数组  
								//那么就会按照数组里的顺序进行合并代码
	.pipe( concat('bundle.js') )
	.pipe( gulp.dest('./dist') );
})

 //压缩文件
 var press = require("gulp-uglify");

 gulp.task( 'press', function() {

 	gulp.src('./dist/*.js')
 	.pipe( press() )
 	.pipe( gulp.dest('./output') );//一定要记住 参数一定是字符串
 })

//gulp.task支持定义三个参数,第二个参数是数组形式,先执行数组里面的书友任务 再执行外面的任务

//gulp.task('task1',['taks2','task3',.....],function(){ gulp...})



//合并并压缩
 gulp.task('con&press')