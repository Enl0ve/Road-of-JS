## Angular路由
AngularJS路由允许我们通过不同的URL访问不同的内容
通过AngularJS可以实现多视图的单页Web应用（SPA）。
在单页Web应用中AngularJS通过`#`+`标记`实现。

```text
    http://www.example.com/#/first
    http://www.example.com/#/second
    http://www.example.com/#/third
```

当我们点击以上的任意一个链接时，向服务端请求的地址都是一样的(http://www.example.com/)。因为`#`号之后的内容在向服务端请求时会被浏览器忽略。所以我们需要在客户端实现`#`之后内容的功能实现。AngularJS 路由 就通过`#`+`标记`帮助我们区分不同的逻辑页面并将不同的页面绑定到对应的控制器上。
![route](../images/route1.png 'route')

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Route</title>
    <style>
        li {
            display: inline;
        }
    </style>
</head>
<body ng-app='routingDemoApp'>
    <h2>AngularJS路由应用</h2>
    <ul>
        <li>
            <a href="#/">首页</a>
        </li>
        <li>
            <a href="#/computers">电脑</a>
        </li>
        <li>
            <a href="#/printers">打印机</a>
        </li>
        <li>
            <a href="#/blabla">其他页面</a>
        </li>
    </ul>

    <div ng-view></div>

    <script src="../../lib/angular.min.js"></script>
    <script src="../../lib/angular-route.min.js"></script>
    <script>          
        angular.module('routingDemoApp', ['ngRoute'])
            .config(['$routeProvider', function($routeProvider) {
                $routeProvider
                    .when('/', {
                        template:'这是首页'
                    })
                    .when('/computers', {
                        template: '这是电脑分类页面',
                    })
                    .when('/printers', {
                        template: '这是打印机分页'
                    })
                    .otherwise({
                        redirectTo:'/'
                    })
            }])
    </script>
</body>
</html>
```
AngularJS模块的config函数用于配置路由器规则。通过使用configAPI,我们请求把`$routeProvider`注入到配置函数，并使用`$routeProvider.when`来定义路由规则。

`$routeProvider.when`&`$routeProvider.otherwise`函数有两个参数(path, params)，
+ 第一个参数是 URL 或者 URL 正则规则。
+ 第二个参数是路由配置对象。

## 路由配置对象
`$routeProvider.when(path, params)`其中params路由配置对象为：
```js
    $routerProvider.when(path, {
        template:string,
        templateUrl:string,
        controller:string, function或者array,
        controllerAs:string,
        redirectTo:string, function,
        resolve:object<key, function>,
    })
```
参数说明：
+ template:在`ng-view`中插入简单的HTML内容
+ templateUrl:在`ng-view`中插入HTML模板
+ controller:在当前模板上执行的controller函数，生成新的scope
+ controllerAs:为controller指定别名
+ redirectTo:重定向的地址
+ resolve:当前controller所以来的其他模块
  
[实例](../src/html/route2.html)

## 以下补充来源于《AnuglarJS高级编程》

<details>
     <summary>添加新路由的步骤</summary>

   1. 定义新的控制器
   2. 创建HTML视图模板
   3. 调用$routeProvider.when(path, route)方法
   4. 如果新的控制器驻留在自己的javascript文件中，需要在index.html文件中用script标签引入
</details>

<details>
    <summary>$routeParams</summary>

    提供当前路由的参数
    ```js
        //GIVEN
        //URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
        //Route: /Chapter/:ChapterId/Section/:SectionId
        $routeParams = {ChapterId:'1', SectionId:'2', search:'moby'}
    ```
</details>