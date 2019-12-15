let gulp = require("gulp");

//引入服务器插件
let connect = require("gulp-connect");
//引入服务器代理插件
let proxy = require('http-proxy-middleware');

//引入合并、压缩、改名插件
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");

//引入ES6转ES5的插件
let babel = require("gulp-babel");

//引入sass转css的插件
let sass = require("gulp-sass");

//开发版:正在开发的版本
//	在开发环境中写代码,自动转存到上线环境
//上线版:可以上传到服务器的版本
//	将上线环境开启服务器环境测试,在浏览器打开,自动刷新

//1.定义gulp指令:gulp.task(指令名,指令的功能)
// gulp.task("qwe",()=>{
// 	console.log("hello gulp");
// });

//2.gulp.src()找到指定文件
//	gulp.pipe()用于连缀执行下一个方法,管道方法
//	gulp.dest()转存到指定位置
gulp.task("unload",()=>{
	gulp.src(["./src/**/*","!./src/pass.txt"]).pipe(gulp.dest("server")).pipe(connect.reload())
});

//3.gulp.watch()监听方法，当某个文件发生改变时，执行指定的命令
gulp.task("listen",()=>{
	gulp.watch(["./src/**/*"],["unload"])
});


//开启服务器
gulp.task("server",()=>{
	connect.server({
		root:"server",   //以哪个文件夹为服务器
        port:844,       //端口号
        livereload:true,  //是否可以自动刷新
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    target: 'https://api.douban.com/v2',    //代理的目标地址
                    changeOrigin:true,
                    pathRewrite:{    //路径重写规则
                        '^/api':''
                    }
                })
            ]
        }
	})
});

//定义批量执行命令
// gulp.task("batchExecutive",["listen","server"],()=>{
// 	console.log("都执行完成");
// });


//gulp对js文件的合并/压缩/改名/ES6转ES5
gulp.task("hygstf",()=>{
	gulp.src("./src/module/*.module")
	.pipe(babel())
	.pipe(concat("index.module"))
	.pipe(gulp.dest("server/module"))
	.pipe(uglify())
	.pipe(rename("index.min.module"))
	.pipe(gulp.dest("server/module"));
});

//gulp对js文件的ES6转ES5
gulp.task("stf",()=>{
	gulp.src("./src/module/a.module")
	.pipe(babel())
	.pipe(gulp.dest("server/module"));
});

//gulp对scss文件的编译
gulp.task("scss",()=>{
	gulp.src("./src/sass/*.scss")
	.pipe(sass().on("error",sass.logError))
	.pipe(gulp.dest("server/css"));
});

//对sass文件的监听
gulp.task("listenSass",()=>{
	gulp.watch("./src/sass/*.scss",["scss"]);
});

// 开启服务器、转存
gulp.task("start",["listen","server","listenSass"],()=>{
	console.log("都执行完成");
});