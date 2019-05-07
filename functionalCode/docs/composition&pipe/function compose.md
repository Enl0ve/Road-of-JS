<h1>compose函数</h1>

#### compose函数接受一个函数作为输入，并将其输出作为另一个函数的输入，结果返回一个接受参数的函数

```js
    const compose = (a, b) => c => a(b(c);
```