## Gulp
gulp也是工作流自动化工具，他使用了Node.js流提供了一个流式构建系统，并且基于代码优于配置的原则。

```js
    //要求加载gulp
    var gulp = require('gulp');

    //加载插件
    var $ = require('gulp-load-plugins')();

    //使用'gulp'运行的默认任务
    gulp.task('default', [], function() {

    })
```

gulp任务的结构将遵守格式gulp.task(name[,deps], fn),它由一个名字、一个可选依赖的列表（数组形式）以及一个执行目标操作的回调函数组成。名字被用于直接从命令行调用任务，可选的依赖数组中包含一个任务名称的列表，这些任务将在当前任务函数执行之前执行和完成。