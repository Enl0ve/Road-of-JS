## Angular依赖注入
依赖注入是AngularJS的重要特性，它简化了Angular解析模块/组件之间以来的过程。

## 什么是依赖注入
wiki 上的解释是：依赖注入（Dependency Injection，简称DI）是一种软件设计模式，在这种模式下，一个或更多的依赖（或服务）被注入（或者通过引用传递）到一个独立的对象（或客户端）中，然后成为了该客户端状态的一部分。
该模式分离了客户端依赖本身行为的创建，这使得程序设计变得松耦合，并遵循了依赖反转和单一职责原则。与服务定位器模式形成直接对比的是，它允许客户端了解客户端如何使用该系统找到依赖

> 一句话 --- 没事你不要来找我，有事我会去找你

AngularJS提供很好的依赖注入，以下5个核心组件用来作为依赖注入
+ value
+ factory
+ service
+ provider
+ constant

## Value
value是一个简单的JavaScript对象，用于向控制器传递值（配置阶段）
```js
//定义一个模块
var myApp = angular.module('myApp', []);

//创建value对象'defaultInput'，并传递数值
myApp.value('defaultInput', 5);

//将defaultInput注入到控制器
myApp.controller('myCtrl', ($scope, CalcService, defaultInput) => {
    $scope.number = defaultInput;
    $scope.result = CalcService.square($scope.number);

    $scope.square = function() {
        $scope.result = CalcService.square($scope.number);
    }
})

//创建服务CalcService
myApp.service('CalcService', function() {
    this.square = function (x) {
        return Math.pow(x, 2);
    }
})
```

## factory
factory是一个函数用于返回值，在service和controller需要时创建。
通常使用factory函数来计算或返回值。
```js
//定义一个模块
var myApp = angular.module('myApp', []);

//创建factory 'MathService'用来计算两数的乘积
myApp.factory('MathService', function () {
    var factory = {};
    factory.multiply = function(a, b) {
        return a*b;
    }
    return factory;
})

//在service中注入factory
myApp.service('CalcService', function(MathService) {
    this.multiply = function(a, b) {
        return MathService.multiply(a, b);
    }
});
```

## provider
AngularJS中通过provider创建一个service,factory等（配置阶段）
Provider 中提供了一个 factory 方法 get()，它用于返回 value/service/factory。
```js
//定义一个模块
var myApp = angular.module('myApp', []);

//使用provider创建service定义一个方法用于计算两数乘积
myApp.config(($provide) => {
    $provide.provider('MathService', function( ){
        this.$get = function () {
            var factory  = {};
            factory.multiply = function(a, b) {
                return a*b;
            }
            return factory;
        }
    })
})
```

## constant
constant(常量)用来在配置阶段传递数值，注意这个常量在配置阶段是不可用的。
```js
myApp.constant('configParam', 'constant value');
```

## 实例
```html
<html>
   
   <head>
      <meta charset="utf-8">
      <title>AngularJS  依赖注入</title>
   </head>
   
   <body>
      <h2>AngularJS 简单应用</h2>
      
      <div ng-app = "mainApp" ng-controller = "CalcController">
         <p>输入一个数字: <input type = "number" ng-model = "number" /></p>
         <button ng-click = "square()">X<sup>2</sup></button>
         <p>结果: {{result}}</p>
      </div>
      
      <script src="//apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
      
      <script>
         var mainApp = angular.module("mainApp", []);
         
         mainApp.config(function($provide) {
            $provide.provider('MathService', function() {
               this.$get = function() {
                  var factory = {};
                  
                  factory.multiply = function(a, b) {
                     return a * b;
                  }
                  return factory;
               };
            });
         });
			
         mainApp.value("defaultInput", 5);
         
         mainApp.factory('MathService', function() {
            var factory = {};
            
            factory.multiply = function(a, b) {
               return a * b;
            }
            return factory;
         });
         
         mainApp.service('CalcService', function(MathService){
            this.square = function(a) {
               return MathService.multiply(a,a);
            }
         });
         
         mainApp.controller('CalcController', function($scope, CalcService, defaultInput) {
            $scope.number = defaultInput;
            $scope.result = CalcService.square($scope.number);

            $scope.square = function() {
               $scope.result = CalcService.square($scope.number);
            }
         });
			
      </script>
      
   </body>
</html>
```