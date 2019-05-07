<h1>tap函数</h1>

```js
    const tap = (value) => 
        (fn) => (
            typeof(fn) === 'function' && fn(value),
            console.log(value)
        )
```

#### 此处tap函数接受一个value并返回一个包含value的闭包函数，该函数讲被执行。
---
<p style="color:red">Note:在JavaScript中，(exp1, exp2)的含义是它将执行两个参数并返回第二个表达式的结果。</p>

----

#### 下面运行tap函数

```js
    tap("fun")( it => console.log("value is", it));

    //执行结果是
    value is fun;
    fun
```

#### 那么tap函数的应用场景在哪里？假设你正在遍历一个来自服务器的数组 。 并发现数据错误，因此想调试一下。该怎么做？不要用命令式的方法，要用函数式的方法，这正是使用tap函数的地方。

```js
    forEach([1, 2, 3], (a) => {
        tap(a)(()=>{
            console.log(a);
        });
    })
```

#### 这打印出了期望的值，在工具箱中这是个简单而强大的函数。