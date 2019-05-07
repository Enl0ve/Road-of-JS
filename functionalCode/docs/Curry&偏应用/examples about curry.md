<h1>examples about curry</h1>

#### 从简单的例子开始，假设我们编写一个创建列表的函数。例如，我们需要创建tableOf2, tableOf3, tableOf4等。
#### 下面的代码可以帮我们实现这些功能

```js
    const tableOf2 = y => y*2;
    const tableOf3 = y => y*3;
    const tableOf4 = y => y*4;

    //根据上面的函数
    tableOf2(4);
    => 8
    tableOf3(4);
    => 12
    tableOf4(4);
    => 16
```
#### 现在可以把这些表格的概念概括为一个单独的函数
```js
 const genericTable = (x,y) => x*y
 
 //同上
 genericTable(2,4)
 genericTable(3,4)
 genericTable(4,4)
```

```js
    //curry
    const tableOf2 = curry(genericTable)(2);
    const tableOf3 = curry(genericTable)(3);
    const tableOf4 = curry(genericTable)(4);

    //同上
    tableOf2(4);
    tableOf3(4);
    tableOf4(4);
```
#### 这样就是完整地利用柯里化来实现生成列表的函数。