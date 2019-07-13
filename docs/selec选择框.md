## AngularJS Select(选择框)
AngularJS可以使用数组或对象创建下拉列表选项

## 使用ng-options创建选择框
使用ng-options指令来创建一个下拉列表，列表项通过对对象和数组循环输出
```html
<body>
    <div ng-app='myApp' ng-controller='myCtrl'>
        <select ng-model='selectedName' ng-options='name for name in names'></select>
    </div>
    <script src="../../lib/angular.min.js"></script>
    <script>
        angular.module('myApp', [])
            .controller('myCtrl', ($scope) => $scope.names = ['zhang', 'wang', 'san']);
    </script>
</body>
```

## 使用ng-repeat来创建下拉列表
```html
    <select name="" id="">
        <option ng-repeat='name in names'>{{name}}</option>
    </select>
```
ng-repeat 指令是通过数组来循环 HTML 代码来创建下拉列表，但 ng-options 指令更适合创建下拉列表，它有以下优势：

使用 ng-options 的选项的一个对象， ng-repeat 是一个字符串。

## 使用哪个更好？
当数据源是如下对象时:
```js
    [{
        site: 'google',
    }, {
        site: 'taobao',
    }, {
        site: 'baidu',
    }]
```

`ng-repeat`和`ng-options`的使用方法分别是:
```html
    <!-- ng-repeat -->
    <select>
        <option ng-repeat='x in names'>{{x.site}}</option>
    </select>

    <!-- ng-options -->
    <select ng-options='x for x in names'></select>
```

当数据源是如下对象时:
```js
    {
        site0: 'google',
        site1: 'taobao',
        site2: 'baidu'
    }
```

此时使用`ng-options`指令是更好的选择
```html
    <select ng-options='x for (x,y) in names'></select>
```
此时我们使用`key`作为值输出

同样，当数据源是如下对象时:
```js
    {
        site0: {
            brand: 'google',
        },
        site1: {
            brand: 'baidu'
        }
    }
```
此时需要brand的值作为输出,`ng-options`指令是更好的选择
```html
    <select ng-options='y.brand fro (x, y) in names'></select>
```