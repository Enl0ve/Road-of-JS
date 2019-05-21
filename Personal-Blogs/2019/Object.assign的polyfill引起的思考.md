### 为了向下兼容浏览器或者在不同的浏览器上使用新的特性，我们可以使用polyfill。昨天MDN上看完了Object.assign的polyfill,今天趁着中午休息的时间复写了一下Object.assign的polyfill。

```js
    Object.defineProperty(Object, 'assign', {
        value: function(target, sources) {
            if(target == null) {
                throw TypeError('Cannot convert undefined or null to Object');
            }

            target = new Object(target);
            var args = [].slice.call(arguments, 1);

            for(var index = 0; index < args.length; index++) {
                var source = args[index];
                if(source == null) continue;
                for(var key in source) {
                    if(Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        },
        writable: true,
        configurable: true
    });
```

### 简单测试一下

```js
    console.log(Object.assign({}, {a:1}));
    // => {a:1}
    console.log(Object.assign({}, {a:1}, undefined, null, 234));
    // => {a:1}
    console.log(Object.assign({}, {a:1, b:2}, '234'));
    // => { '0': '2', '1': '3', '2': '4', a: 1, b: 2 }
    console.log(Object.assign('123', {a:1, b:2}));
    // => { [String: '123'] a: 1, b: 2 }
```

### 看起来没有问题 ，这时候突然来了想法，如果这样写结果是什么样的呢？

```js
    console.log(Object.assign('123', '123'));
    // => Uncaught TypeError: Cannot assign to read only property '0' of object '[object String]'
```

### ca,报错了，我又去支持Object.assign的浏览器上试了下，也是报错的。难道不可以这样写吗？我又仔细看了下定义.

> ### Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

### Object.assign()在处理原始类型的时候会将它转换成对象。但是看报错的情况是`属性0是只读的`。

```js
    console.log(Object.getOwnPropertyDescriptors(new Object('123')));
    // => 
    // 0: {value: "1", writable: false, enumerable: true, configurable: false}
    // 1: {value: "2", writable: false, enumerable: true, configurable: false}
    // 2: {value: "3", writable: false, enumerable: true, configurable: false}
    // length: {value: 3, writable: false, enumerable: false, configurable:false, ...}
```
### string转对象后是可迭代的，但是只可读 。所以我修改了下polyfill。

```js
    Object.defineProperty(Object, 'assign', {
        value: function(target, sources) {
            if(target == null) {
                throw TypeError('Cannot convert undefined or null to Object');
            }

            target = new Object(target);
            var args = [].slice.call(arguments, 1);

            for(var index = 0; index < args.length; index++) {
                var source = args[index];
                if(source == null) continue;
                for(var key in source) {
                    var isKeyWritable = Object.prototype.hasOwnProperty.call(target, key)?Object.getOwnPropertyDescriptor.call
                    (target, key):true;
                    if(Object.prototype.hasOwnProperty.call(source, key) && isKeyWritable) 
                        {    
                            console.log(isKeyWritable);
                            target[key] = source[key];
                        }
                }
            }

            return target;
        },
        writable: true,
        configurable: true
    });
```

### 再试一下
```js
    console.log(Object.assign('123', '123'));
    // => [String: '123']
    console.log(Object.assign('123', '1234'));
    // => { [String: '123'] '3': '4' }
```
