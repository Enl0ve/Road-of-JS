### Object.assign()方法用户将所有可枚举属性的值从一个或者多个源对象复制到目标对象，它将返回目标对象。

```js
    /**
     *@param
     * target 目标对象
     * source 源对象
     * 
     * @return 
     *  target
     **/
    Object.assign(target, ...sources)
```

> ## 描述
### 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖，后面的源对象的属性将类似地覆盖前面源对象中的属性。

### `Object.assign`方法指挥拷贝源对象自身的并且可以被枚举的属性到目标对象。该方法使用源对象的`[[Get]]`和目标对象的`[[Set]]`,所以它会调用相关的setter和getter。

### String和Symbol类型的属性都会被拷贝。

### 在出现错误的情况下，在发生错误之前添加的任何属性，可以修改target。

### 注意，`Object.assign`方法不会跳过那些值为`null`或者`undefined`的源对象。

> ## examples

> ### 赋值一个对象

```js
    const a = {
        a: 1
    }
    const copy = Object.assign({}, a);
    console.log(copy); // => {a:1}
```

> ### 深拷贝问题
#### 如果需要是要深拷贝，则需要使用其他的方法，因为`Object.assign`拷贝的是属性值。如果某一个属性值是对象的引用，那么则拷贝的是其引用。

```js
    let obj1 = { a: 0 , b: { c: 0}}; 
    let obj2 = Object.assign({}, obj1); 
    console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

    obj1.a = 1; 
    console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} 
    console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

    obj2.a = 2; 
    console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} 
    console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
    
    obj2.b.c = 3; 
    console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}} 
    console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}} 

    // Deep Clone 
    obj1 = { a: 0 , b: { c: 0}}; 
    let obj3 = JSON.parse(JSON.stringify(obj1)); 
    obj1.a = 4; 
    obj1.b.c = 4; 
    console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
```

> ### 合并对象

```js
    const o1 = {a:1};
    const o2 = {b:2};
    const o3 = {c:3};

    const obj = Object.assign(o1, o2, o3);

    console.log(obj); // {a:1, b:2, c:3}
    console.log(o1); // {a:1, b:2, c:3}
```

> ### 合并具有相同属性的对象
#### 属性被后续参数中具有相同属性的其他对象覆盖。
```js
    const o1 = { a: 1, b: 1, c: 1 };
    const o2 = { b: 2, c: 2 };
    const o3 = { c: 3 };

    const obj = Object.assign({}, o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
```

> ### 拷贝具有Symbol类型的对象

```js
    const o1 = { a: 1 };
    const o2 = { [Symbol('foo')]: 2 };

    const obj = Object.assign({}, o1, o2);
    console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
    Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
```

> ### 继承属性和不可枚举属性是不可拷贝的

```js
    const obj = Object.create({foo:1}, { //foo是个继承属性
        bar: { value: 2},
        baz: {
            value:3,
            enumerable: true
        }
    });

    const copy = Object.assign({}, obj);
    console.log(copy); // => {baz:3}
```

> ### 原始类型会被包装为对象

```js
    const v1 = "abc";
    const v2 = true;
    const v3 = 10;
    const v4 = Symbol("foo")

    const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
    // 原始类型会被包装，null 和 undefined 会被忽略。
    // 注意，只有字符串的包装对象才可能有自身可枚举属性。
    console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```
> ### 异常会打断后续拷贝任务

```js
    const target = Object.defineProperty({}, "foo", {
        value: 1,
        writable: false
    }); // target 的 foo 属性是个只读属性。

    Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
    // TypeError: "foo" is read-only
    // 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

    console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
    console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
    console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
    console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
    console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```

> ### 拷贝访问器

```js
    const obj = {
        foo: 1,
        get bar() {
            return 2;
        }
    };

    let copy = Object.assign({}, obj); 
    console.log(copy); // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值

    // 下面这个函数会拷贝所有自有属性的属性描述符
    function completeAssign(target, ...sources) {
    sources.forEach(source => {
        let descriptors = Object.keys(source).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
        }, {});

        // Object.assign 默认也会拷贝可枚举的Symbols
        Object.getOwnPropertySymbols(source).forEach(sym => {
        let descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
            descriptors[sym] = descriptor;
        }
        });
        Object.defineProperties(target, descriptors);
    });
    return target;
    }

    copy = completeAssign({}, obj);
    console.log(copy);
    // { foo:1, get bar() { return 2 } }
```

> ## polyfill

```js
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            let to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
                }
            }
            return to;
            },
            writable: true,
            configurable: true
        });
    }
```