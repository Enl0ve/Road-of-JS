## Grunt
Grunt是一个任务运行器，他能帮助自动完成重复的工作。例如linting,编译,缩小,测试,部署。

Gruntfile.js文件
```js
    //封装器函数
    module.exports = function(grunt) {

        //项目和任务配置
        grunt.initConfig({
            pkg:grunt.file.readJSON('package.json')
        });

        //在动加载插件任务
        require('load-grunt-tasks')(grunt);

        //默认任务
        grunt.registerTask('default', [])
    }
```

所有的Grunt代码都必须封装在封装器函数中。