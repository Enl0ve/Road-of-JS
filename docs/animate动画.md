## AngularJS动画
AngularJS提供了动画效果，配合CSS使用。
AngularJS使用动画需要引入angular-animate.min.js库。

除此之外，还需使用在应用中使用模型ngAnimate
```html
    <body ng-app='ngAnimate'>
        ...
    </body>
```

下面是一个完整的实例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Animate</title>

    <script src="../../lib/angular.min.js"></script>
    <script src="../../lib/angular-animate.min.js"></script>
    <style>
        div {
            transition: all linear 0.5s;
            background-color: lightblue;
            height: 100px;
            width: 100%;
            position: relative;
            top: 0;
            left: 0;
            }

            .ng-hide {
            height: 0;
            width: 0;
            background-color: transparent;
            top:200px;
            left: -200px;
            }
    </style>
</head>
<body ng-app='ngAnimate'>
    <h1>隐藏 DIV: <input type="checkbox" ng-model="myCheck"></h1>

    <div ng-hide="myCheck"></div>
</body>
</html>
```

如果应用中已经设置了应用名，可以直接在模型中直接添加`ngAnimate`
```html
    <script>
        angular.module('myApp', ['ngAnimate'])
    </script>
```

## ngAnimate做了什么？
ngAnimate模型可以添加和移除class
ngAnimate并不能使HTML产生动画，但是ngAnimate会监测事件，类似隐藏显示HTML元素，如果事件发生ngAnimate就会使用预定义的class来设置HTML元素的动画。

Angular添加/移除class的指令：
+ ng-show
+ ng-hide
+ ng-class
+ ng-view
+ ng-include
+ ng-repeat
+ ng-if
+ ng-switch

`ng-show`和`ng-hide`用于添加和移除class的值
其他指令会在进入 DOM 会添加 ng-enter 类，移除 DOM 会添加 ng-leave 属性。
当 HTML 元素位置改变时，ng-repeat 指令同样可以添加 ng-move 类 。
此外， 在动画完成后，HTML 元素的类集合将被移除。例如：ng-hide 指令会添加以下类
+ ng-animate
+ ng-hide-animate
+ ng-hide-add (如果元素将被隐藏)
+ ng-hide-remove (如果元素将显示)
+ ng-hide-add-active (如果元素将隐藏)
+ ng-hide-remove-active (如果元素将显示)