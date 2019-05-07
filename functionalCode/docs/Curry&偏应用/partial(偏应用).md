<h1>partial(偏应用)</h1>

#### 本节中，将介绍一个名为partial的函数，它允许开发者部分地应用函数参数。
#### 假设我们要每10毫秒做一组操作，实现方式如下

```js
    setTimeout(() => {console.log('do X task')}, 10);
    setTimeout(() => {console.log('do Y task')}, 10);
```

#### 无法使用curry将代码中的setTimeout函数隐藏，原因在于curry函数应用参数列表的顺序是从左到右的，由于我们想根据需要传递函数，并将10报存为常量（参数列表的最右边），所以无法使用curry。一个变通方案是将setTimeout函数封装一下。

```js
    const setTimeoutWrapper = (time, fn) => {
        setTimeout(fn, time);
    }

    //然后再curry
    const delayMs = curry(setTimeoutWrapper)(10);

    delayMs(() => { console.log('do X tasks')});
    delayMs(() => { console.log('do Y tasks')});
```

#### 虽然程序得以运行，但是我们不得不创建一个封装函数来封装setTimeout函数，这样也是一种开销 。这时候就是偏应用的应用之地了。