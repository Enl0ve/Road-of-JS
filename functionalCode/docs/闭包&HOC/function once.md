<h1></h1>

#### 在很多情况下，我们只需要运行一次给定的函数，这种情况在JavaScript开发者的日常工作中经常发生，因为他们只想设置一次第三方库，或初始话一次支付设置，或者发起一次银行支付请求等。这些是开发者面对的常见情况。

#### 本节将要编写一个称为once的高阶函数，它允许函数只运行一次给定的函数！此处需要注意的是，我们会继续把日常工作抽象到函数式工具箱中。

```js
    const once = (fn) => {
        let done = false;
        
        return function() {
            return done?undefined: (done=true, fn.apply(this, arguments))
        }
    }
```
#### 上面的once函数接受一个参数fn并通过调用它的apply方法返回一个结果。此处需要注意的重点是，我们声明一个名为done的变量，初始值是false。返回的函数为形成一个覆盖它的闭包作用域。因此返回的函数会访问并检查done是否为true。
---
<p style="color:red">Note:apply函数允许我们设置函数的上下文，并为给定的函数传递参数。</p>
----

```js
    /**
     *检验once函数
    * */
    const doPayment = once( () => {
        console.log("payment is done");
    })

    doPayment();
    => payment is done

    doPayment();
    => undefined

```