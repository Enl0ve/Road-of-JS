<h1>memoized函数</h1>

#### 我们知道纯函数只依赖它的参数运行。不依赖外部环境，纯函数的结果完全依赖它的参数。假设有一个纯函数名为factorial,它计算给定数字的阶乘。该函数如下：

```js
    const factorial = (n) => {
        if(n == 0) {
            return 1;
        }

        return n*factorial(n-1);
    }

    factorial(4); 
    => 24

    factorial(3);
    => 6
```
#### 我们为什么不能为一个输入存储一个计算结果呢？

```js
    const memoized = (fn) => {
        const lookUp = {};

        return (arg) => lookUp[arg] || (lookUp[arg] = fn(arg));
    }

    const factorialMemoized = memoized( factorial );
```