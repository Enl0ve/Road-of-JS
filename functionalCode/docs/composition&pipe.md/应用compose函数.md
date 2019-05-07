<h1>应用compose函数</h1>

#### 假设我们需要将一个浮点型的数字进行四舍五入。那就需要将传入的参数先转化为浮点型再利用Math.round进行四舍五入。

```js
    let data = Math.round(parseFloat(input));

    //利用compose函数进行转化
    data = compose(parseFloat, Math.round)(input);
```