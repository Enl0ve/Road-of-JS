<h1>Curry</h1>

#### 什么是柯里化？
#### 柯里化(curry)是把一个多参数函数转换为一个嵌套的一元函数的过程。

#### 下面是一个简单的示例

```js
    //normal
    const add = (x, y) => {
        return x + y;
    }

    //curry
    const addCurried = (x) => {
        return (y) => {
            return x + y;
        }
    }

    //more simple based on curry
    const addCurriedSimple = x => y => x + y;
```
#### 上面的addCurriedSimple函数中我们手动将接受两个参数的add函数转换为含有嵌套地一元函数的addCurriedSimple函数。

#### 下面的代码展示了该处理过程

```js
    const curry = (fn) => {
        return function(firstArg) {
            return function(secondArg) {
                return fn(firstArg, secondArg);
            }
        }
    }

    let addcurried = curry(add);
    addcurried(2)(2);
    => 4
```