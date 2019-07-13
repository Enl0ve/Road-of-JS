## AngularJs控制器
AngularJs控制器在<div>内用`ng-controller`指令定义，并实例化控制器
AngularJs控制器控制应用程序的数据
AngularJs控制器是常规的JavaScript对象，由标准的JavaScript对象的构造函数创建

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Controller</title>
</head>
<body>
    <div ng-app='myApp' ng-controller='myCtrl'>
        <label for="fname">firstname</label>
        <input type="text" id='fname' ng-model='firstname'>
        <br>
        <label for="lname">lastname</label>
        <input type="text" id="lname" ng-model='lastname'>

        <p>我的名字是:{{firstname+','+lastname}}</p>
    </div>
    <script src="../../lib/angular.min.js"></script>
    <script>
        var app = angular.module('myApp', []);
        app.controller('myCtrl', ($scope) => {
            $scope.firstname = 'wang';
            $scope.lastname = 'san';
        })
    </script>
</body>
</html>
```
其中，`ng-controller='myCtrl'`属性是一个Angular指令，用于定义一个控制器。
`myCtrl`是一个函数。AngularJs使用`$scope`来调用控制器。

## 控制器方法
```html
<body>
    <div ng-app='myApp' ng-controller='myCtrl'>
        <label for="fname">firstname</label>
        <input type="text" id='fname' ng-model='firstname'>
        <br>
        <label for="lname">lastname</label>
        <input type="text" id="lname" ng-model='lastname'>

        <p>我的名字是:{{fullname()}}</p>
    </div>
    <script src="../../lib/angular.min.js"></script>
    <script>
        var app = angular.module('myApp', []);
        app.controller('myCtrl', ($scope) => {
            $scope.firstname = 'wang';
            $scope.lastname = 'san';
            $scope.fullname = () => $scope.firstname + ',' + $scope.lastname;
        })
    </script>
</body>
```

## 外部文件中的控制器
在大型的项目中，通常是把控制器存储在外部文件中。
此时我们可以通过`script`标签进行引入就行。


## 链式调用
```js
    //我们可以通过链式调用的方式就行代码编写
    angular.module('myApp', [])
            .controller('myCtrl', ($scope) => {
                $scope.firstname = 'wang';
                $scope.lastname = 'san';
                $scope.fullname = () => firstname + ',' + lastname;
        })
``` 

### 补充内容来自《AnuglarJS高级编程》
1.服务器使用依赖注入器进行注册，所以一个控制器可以使用任意数量的服务。控制器没有使用依赖注入器进行注册，所以控制器无法作为依赖。

2.每个`ng-controller`指令都将会实例化一次控制器，但是每个服务至多会被实例化一次，而且该实例将在所有依赖于此服务的控制器、服务和指令之间共享。

3.除了服务之外，控制器还可以将本地对象列为依赖,但是服务器不能将本地对象列为依赖。
<details>
    <summary> 本地对象 </summary>

    本地对象指使用依赖注入器为控制器的特定实例注册的、特定于上下文的对象。其中最常见的就是$scope
</details>

4.AngularJS为控制器之间的通信提供了大量的方法。本文中主要包含了三个主要方法：作用域继承、通过$scope广播事件和服务。
> 1. 作用域继承

[点击](./scope作用域.md)