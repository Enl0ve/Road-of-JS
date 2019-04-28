<h1>every函数</h1>

<p>在日常的开发中，我们经常需要检查数组内容是否为一个数字、自定义对象或者其他类型。通常我们用循环来解决这些问题。下面将这些过程抽象到every函数中，它接收两个参数：一个数组和一个函数。它使用传入的函数检查数组的所有是否为true。</p>

```js
    const every = (array, fn) => {
        let result = true;
        for (let i = 0; i < array.length; i++) {
            result = result && fn(array[i]);
        }

        return result
    }
```

<p>上面的代码中简单的遍历传入的数组，并使用当前遍历的数组元素内容调用函数fn。注意，传入的fn需要返回一个布尔值，然后我们使用&&运算确保所有的数组内容遵循fn给出的条件。</p>

```js
    //写两个简单的demo验证一下
    every([NaN, NaN, NaN], isNaN) //true

    every([NaN, NaN, 4], isNaN) //false
```
<p>every函数是一个典型的高阶函数。下面使用for.of重写一下上面的例子</p>

```js
    every(array, fn) {
        let result = true;
        for (let i of array) {
            result = result && fn(array[i]);
        }
        return result;
    }
```