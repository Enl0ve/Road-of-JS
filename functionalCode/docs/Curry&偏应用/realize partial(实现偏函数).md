<h1>实现偏函数</h1>

#### 为了全面理解偏应用技术的运行机制，本节将编写偏函数。

```js
    const partial = function(fn, ...partialArgs) {
        let args = partialArgs;
        
        return function(...fullArgs) {
            let arg = 0;
            for(let i = 0; i < args.length && arg < fullArgs.length; i++) {
                if(args[i] == undefined) {
                    args[i] = fullArgs[arg++];
                }
            }

            return fn.apply(null, args);
        }
    }
```

#### 将上一节的问题应用到偏函数中来

```js
    const delayMs = partial(setTimeout, undefined, 10);

    delayMs(() => {console.log('do X tasks');});
    => do X tasks
```
#### 下面来分析一下执行过程。
#### partial(setTimeout, undefined, 10),将参数列表捕获到parialArgs中，并args指向partialArgs的引用。
` partialArgs = [undefined, 10]`

#### delayMs(() => {console.log('do X tasks');}),将参数列表捕获到fullArgs中
` fullArgs = [()=>{console.log('do X tasks')}]`

#### for循环将fullArgs中的参数赋予了partialArgs值为undefined的部分。

#### 可以将partial应用于任何包含多参数的函数。在JavaScript中，常使用一下的函数来美化JSON数据。

```js
    let obj = {foo:'bar', bar:'foo'}

    JSON.stringify(obj, null, 2);
```

#### stringify函数后两个参数常常是null和2。 我们可以使用偏函数来进行优化。

```js
    let jsonPrettyPrint = partial(JSON.stringify, undefined, null, 2);

    jsonPrettyPrint(obj);
```

----
<p style="color:red">Note: partial函数中存在一个小小的Bug。当修改调用参数时， 输出结过仍然是第一次的值。 这是因为用参数替换undefined的值，但是fullArgs指向的是数组的引用。</p>

----