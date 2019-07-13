## angular模块
模块创建
```html
<div ng-app='myApp'>
    ...
</div>

<script>
    angular.module('myApp', []);
</script>
```

## 模块是什么
模块定义了一个应用程序
模块是应用程序中不同部分的容器
模块是应用控制器的容器
控制器通常属于一个模块

##添加指令
除了内置指令，还可以自定义指令。
```html
<div ng-app='myApp' personal-directive>

</div>

<script>
    angular.module('myApp', [])
        .directive('personalDirective', function() {
            return {
                template:'我在指令构造器中创建!',
            }
        });
</script>
```