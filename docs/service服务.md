## service服务
AngularJS中，服务是一个函数或对象
AngularJS中你可以创建自己的服务，也可以使用内建的服务。

## 什么是服务？
AnuglarJS内建了30多个服务。
其中有个$location服务，返回当前页面的URL地址。
```html
<body>
    <div ng-app="myApp" ng-controller="myCtrl">
        <p>current URL:{{url}}</p>
    </div>

    <script src="../../lib/angular.min.js"></script>
    <script>
        angular.module('myApp', [])
                .controller('myCtrl', ($scope, $location) => $scope.url = $location.absUrl());
    </script>
</body>
```

##为什么使用服务
$http是AngularJS中最常使用的服务。服务向服务器发请求，应用响应服务器传送来的数据。
AngularJS会一直监控应用，处理事件变化，AngularJS使用$location服务要比使用window.location对象更好。

###$timeout服务
```html
    <script>
        angular.module('myApp', [])
                .controller('myCtrl', ($scope, $timeout) => {
                    $scope.url = 123;
                    $timeout(function() {
                        $scope.url = 456;
                    }, 2000)});
    </script>
```
$timeout服务对应了window.setTimeout函数。

## 创建自定义服务
你可以创建自定义的访问，链接到模块中
```js
app.service('hexafy', function () {
    this.myFunc = function(x) {
        return x.toString(16);
    }
})
```

使用的时候需要添加
```js
angular.module('myApp', []).controller($scope, hexafy) {
    ...
}
```

## 在过滤器中，使用自定义服务
当你创建了定义服务，并连接到了你的应用上后，你可以在控制器，指令，过滤器或者其他服务中使用。
```js
var app = angular.module('myApp', []);
app.service('hexafy', function() {
    this.myFunc = function(x) {
        return x.toString(16);
    }
});

app.filter('myFormat, ['hexafy', function(hexafy) {
    return function(x) {
        return hexafy.myFunc(x);
    }
}]);
```

```html
    <p>{{url | myFormat }}</p>
```