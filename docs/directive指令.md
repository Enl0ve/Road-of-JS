## directive指令
在[angular分析](./angular分析.md)中，将指令分成了3种类别，其中每种类型都对应着一个简单的设计模型。

### 第一种类型是只读或者只渲染指令
这些指令遵循一个简单的设计模式：它们将监视变量并更新DOM元素，以反映变量的变化。其中ngBind,ngClass就是这种类型的指令。

下面实现一个该类型的指令，该指令是实现轮播的基础：myBackgroundImage指令，它将把HTML 中div元素的背景图绑定给作用域中的一个变量。该指令将监视所提供的表达式，并更新相关的HTML div元素的background-image CSS属性。

```js
    angular.module('myApp', [])
        .directive('myBackgroundImage', function() {
            return function(scope, element, attributes) {
                scope.$watch(attributes.myBackgroundImages, function(newVal, oldVal){
                    element.css('background-image', 'url('+ newVal+')');
                });
            }
        })
```

```html 
    <div ng-app='myApp' ng-init="image=url">
        <div my-background-image='image'></div>
    </div>
```

### 第二种类型是事件处理器指令。
```js
    angular.module('myApp', [])
        .directive('myNgClick', function() {
            return function(scope, element, attributes) {
                element.click(function() {
                    $scope.$eval(attributes.myNgClick);
                    $scope.$apply();
                })
            }
        })   
```
其中，关于`$apply`的作用在[scope作用域](./scope作用域.md)已经写的很清楚了。

### 第三种类型就是双向数据绑定类型。
该设计模式同时使用了只渲染设计模式和事件处理程序模式，用于创建控制变量状态的指令。
```js
    angular.module('myApp', [])
        .directive('toggleButton', function() {
            return function(scope, element, attributes) {
                //监视和更新
                $scope.$watch(attributes.toggleButton, function(v) {
                    element.val(!v?'disable':'enable');
                });

                //事件处理程序
                element.click(function() {
                    scope[attributes.toggleButton] = !scope[attributes.toggleButton];
                    scope.$apply();
                })
            }
        })
```

### 为指令创建不同的作用域
指令对象可以通过下面的三种方式之一指定一个作用域设置。
+ {scope:true}为指令的每个实例创建一个新的作用域
+ {scope:{}}为指令的每个实例创建一个新的隔离作用域
+ {scope:false}是默认设置，使用这个设置，AngularJS不会每个指令创建新的作用域
  
第二种配置方式和第一种配置方式的区别：第二个选项将为每个实例创建一个隔离的作用域。记住隔离的作用不会继承它的父作用域，所以隔离作用域中指令模板无法访问指令作用域之外的任何变量。