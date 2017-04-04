var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var uglify = require ( 'gulp-uglify' );

//合并文件

gulp.task("conpress",function(){//注意:任务名尽量只是用英文字母 否则很容易出错
    gulp.src([
		'./Admin/01Acore.js',
		'./Admin/07A.style.js',
		'./Admin/03Adom.js',
		'./Admin/05A.ctor.js',
		'./Admin/06A.event.js',
		])
	.pipe( concat( 'Admin.mini.js' ) )
	.pipe( uglify(  ) )
	.pipe( gulp.dest( './xujian' ) );
})
