## filter过滤器
AngularJS能够用来过滤数据，可以用在指令和表达式中。
过滤器通过管道符号(|)添加到指令和表达式中。

AngularJS过滤器
|过滤器|描述|
|:--:|:--:|
|currency|格式化数字为货币格式|
|filter|从数组项中选择一个子集|
|lowercase|格式化字符串为小写|
|orderBy|根据某个表达式排列数组|
|uppercase|格式化字符串为大写|

## 向表达式添加过滤器
```html
    <div ng-app='myApp' ng-controller='myCtrl'>
        <label for="name">name</label>
        <input type="text" id='name' ng-model='name'>

        <br>
        <p>before:{{name}} -> now:{{name | uppercase}}</p>
    </div>
    <script src="../../lib/angular.min.js"></script>
    <script>
        angular.module('myApp', [])
            .controller('myCtrl', ($scope) => $scope.name = 'wang3');
    </script>
```

## 向指令添加过滤器
`orderBy`根据某个表达式排列数组
```html
    <div ng-app='myApp' ng-controller='myCtrl'>
        <ul>
            <li ng-repeat='name in names | orderBy:"age"'>{{name.age + ' ' + name.name + ' ' + name.sex}}</li>
        </ul>
    </div>
    <script src="../../lib/angular.min.js"></script>
    <script>
        angular.module('myApp', [])
            .controller('myCtrl', ($scope) => $scope.names = [
                {name:'zhang', age:12, sex:'male'},
                {name:'wang', age:13, sex:'female'},
                {name:'li', age:12, sex:'male'},
                {name:'chen', age:14, sex:'female'},
                {name:'fu', age:11, sex:'male'},
            ]);
    </script>
```

## 过滤输入
```html
    <div ng-app='myApp' ng-controller='myCtrl'>
        <label for="filter">keyWord:</label>
        <input type="text" id="filter" ng-model="test">

        <ul>
            <li ng-repeat='name in names | filter:test | orderBy:"age"'>{{name.age + ' ' + name.name + ' ' + name.sex}}</li>
        </ul>
    </div>
```

## 补充内容来自《AngularJS高级编程》
1. 用例

限制用户显示的长度为8个字符
[传送门🚪](../src/html/$filter.html)
```html
    <div ng-app="myApp" ng-controller='myCtrl'>
        <ul>
            <li ng-repeat="name in names">{{name | display | limitTo:8}}</li>
        </ul>
    </div>
```

```js
    angular.module('myApp', [])
        .filter('display', function (){
            return function(name) {
                return name.first + ' ' + name.last;
            }
        })
        .controller('myCtrl', function($scope) {
            $scope.names = [
                {first:'wang', last:'er123'},
                {first:'zhang', last:'san132'},
                {first:'lee', last:'si12321'},
                {first:'liu', last:'ba31232'},
            ]
        })
```

除此之外，还有过滤器的另外一种常见用例。与当前模块关联的过滤器可以通过依赖注入作为`$filter`服务访问。通过将该服务注入到`display`过滤器中，可以重用`limitTo`过滤器，使代码更符合DRY原则。
[传送门🚪](../src/html/$filter2.html);