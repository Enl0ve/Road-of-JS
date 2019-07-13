## angularJS分析
### 控制器、服务、指令
大部分AngularJS代码都会被包含在三部分中：服务、控制器、指令。
三者之间的关系：
服务负责从远端服务器抓取和存储数据；基于服务构建的控制器将为AngularJS的作用域层次提供数据和功能；基于服务和控制器的指令将直接与文档对象模型(DOM)进行交互。

### 命名规范
控制器通常使用帕斯卡拼写法（FooBarController）
服务通常使用驼峰式大小写（fooBarService）
指令必须采用驼峰式大小写（fooBarDirective）

AngualrJS将驼峰式大小写名称转换成连字符大小写名称(foo-bar-directive)

## 双向数据绑定
ngModel指令是一个在输入字段和变量之间创建创建双向绑定。
```html
    <div ng-app='myApp'>
        <input type='text' ng-model='username'>
        <span ng-bind='username'></span>
        <!-- 或者 -->
        <span>{{username}}</span>
    </div>
```
jquery也可以实现双向数据绑定
```html
    <div>
        <input type='text' id='username'>
        <span id='span'></span>
    </div>
```

```js
    $(document).ready(function(){
        $('#username').on('keyup', function() {
            $('#span').html ($("#username").val());
        })
    })
```

## 指令分类
|指令分类|是否渲染数据|是否修改数据|内置指令|
|:--:|:--:|:--:|:--:|
|只读|是|否|ngBind,ngBindHTML,ngRepeat,ngShow,ngHide|
|事件处理封装器|否|或许|ngClick,ngDblclick|
|双向数据绑定|是|是|ngModel|

## AngularJS作用域
AngularJS表达式执行的上下文