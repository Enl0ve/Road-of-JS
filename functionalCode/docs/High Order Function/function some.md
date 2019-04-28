<h1>some函数</h1>

<p>与every函数相反，还有一个some函数。some函数同样接收两个参数，一个array，另一个是fn。如果数组中传入的元素只要有一个返回true，则返回结果为true。实现如下</p>

```js
    const some = (array, fn) => {
        let result = false;
        for( let i of array) {
            let result = false || fn(array[i]);
        }
        return result;
    }
```

<p>下面是两个简单的demo</p>
```js
    some([NaN, NaN, 4], isNaN) //true

    some([3, 4, 5], isNaN) //false
```