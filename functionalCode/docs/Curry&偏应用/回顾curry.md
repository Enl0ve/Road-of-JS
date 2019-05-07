<h1>回顾curry</h1>

#### 我们知道我们能把一个函数柯里化，那么多个函数会如何呢？

```js
    let curry = (fn) => {
        if(typeof fn != 'function'){
            throw "no function provided"
        }
    }
```
### 有了这层检查，我们就无法使用传入函数以外的参数。下一个柯里化的要求是，如果有人为柯里化提供了所有的参数，就需通过传递这些参数执行真正的函数。

```js
    let curry = (fn) => {
        if(typeof fn != 'function') {
            throw "no function provided"
        }

        return function curriedFn(...args) {
           return fn.apply(null, args);
        }
    }

    //假设一个求积函数
    const multiply = (x, y, z) => x*y*z; 

    //调用方式
    const multiplyCurried = curry(multiply);

    multiplyCurried(1,2,3);
```
#### 执行过程中，参数1，2，3通过...args指向[1,2,3],fn.apply(null, args)相同于mulitiply(1,2,3);

#### 下面回到将多元参数函数转换为嵌套的一元函数的问题 。

```js
        let curry = (fn) => {
        if(typeof fn != 'function') {
            throw "no function provided"
        }

        return function curriedFn(...args) {
            if(args.length < fn.length) {
                return function() {
                    return curriedFn.apply(null, args.concat([].slice.call(arguments)))
                }
            }
            return fn.apply(null, args);
        }
    }

    //调用方式
    const multiplyCurried = curry(multiply);
    multiplyCurried(1)(2)(3);
```

#### 我们理解一下添加的代码块 。

```js
    if(args.length < fn.length) {
        return function() {
            return curriedFn.apply(null, args.concat([].slice.call(arguments)))
        }
    }
```
#### 当传入的参数小于函数的参数时 ，就使用apply递归调用curriedFn()函数。

`args.concat([].slice.call(arguments))`
#### 非常重要。我们使用concat函数连接一次传入一个的参数，并递归地调用curriedFn。由于将所传入的参数组合并递归调用，在下面一行代码中将会遇到某一个时刻。
`if(args.length < fn.length)`
#### 条件失败了。由于参数列表的长度和函数的参数长度相等，if代码块将被略过 。