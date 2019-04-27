<h1>通过高阶函数进行抽象</h1>

<p>首先，说明一下高阶函数是什么</p>

```txt
    高阶函数是接受函数作为参数并且/或者返回函数作为输出的函数，全称是High Order Function(简称HOC)。
```

<p>先看一个代码片段</p>

```js
    const forEach = (array, fn) => {
        for(let i = 0; i < array.length; i++ ) {
            fn(array[i]);
        }
    }
```
<p>上面的函数抽象出了遍历数组的问题。使用API forEach的用户不需要理解forEach是如何实现的，只需要专注业务fn的实现，如此问题就被抽象出来了。</p>

<p>forEach本质上遍历了一个数组，那么如何遍历一个JavaScript对象呢？步骤如下</p>

> + (1) 遍历给定对象的所有key 
> + (2) 判断key是否属于对象自身
> + (3) 如果(2)为true,则获取Key的值

<p>代码实现如下:</p>

```js
    const forEachObj = (obj, fn) => {
        for(let property in obj) {
            if(obj.hasOwnProperty(property)) {
                fn(property, obj[property]);
            }
        }
    }
```
<p>forEach和forEachObj都是高阶函数，它们都抽象出了遍历的部分，使得开发者可以更加专注于业务实现 。有了高阶函数我们就会变得更加函数式。下面以抽象的方式实现对控制流程的处理。</p>
<p>为此我们创建一个名为unless的函数。这个函数接受一个断言作为参数,当断言predicate为false,调用fn。</p>

```js
    const unless = (predicate, fn) => {
         if(!predicate) {
             fn();
         }
    }
```

<p>有了unless函数，ji可以实现一个很简短的代码来输出一个数组中偶数的部分。</p>

```js
    forEach([1, 2, 3, 4, 5], (el) => {
        unless(el/2, () => return el);
    });
```

<p>上面例子中数组比较短，或者说数组已经给出的时候就可以上面使用，但是如果数组内容为0-100的话应该怎么实现呢？下面我们实现一个times高阶函数，根据调用次数调用传入的函数。</p>

```js
    const times = (times, fn) => {
        for(let i = 0; i < times; i++) {
            fn(i);
        }
    }
```

<p>此时0-100的情况可以这样实现</p>

```js
    times(100, (time) => {
        unless(time/2, () => { return time;})
    })    
```

#### 上面简单的写了一下高阶函数的例子，在[every]()、[sort]()、[some]()中我们将实现真正的高阶函数并实现它们 。