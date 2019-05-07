<h1>reduce函数</h1>

#### 谈到函数式编程，经常听到reduce函数。reduce函数是一个美丽的函数，它为保持JavaScript闭包的能力所设计 。

#### 为了给出reduce实例及其用途。下面看一个数组求和的问题 。假设一个数组：
```js
    let uesless = [1, 2, 3, 4]
```
#### 假设我们需要对上面数组进行求和，一个解决方案是:
    let results = 0;
    forEach(uesless, el=>{
        result += el;
    })
    => 10

#### 上面的问题，我们将数组（包含一些数据）归约为一个单一的值 。我们从一个累加器开始，在该例子中称为results，遍历数组的时候用它存储求和的值 。在求和的情况下，我们将默认值设为0。但是如果是在求积的情况下，我们需要将默认值设为1 。 这种设置累加器并遍历数组以生成一个单一元素的过程称为归约数组 。
#### 既然我们要对数组重复上面的过程，为什么不将这个过程抽象到一个函数中呢？这就是reduce函数的作用。

```js
    const reduce = (array, fn) => {
        let accumlator = 0;
        for (const value of array) {
            accumlator = fn(accumlator, value);
        }

        return [accumlator];
    } 
```
#### 通过reduce函数进行求和

```js
    reduce(useless, (accumlator, value) => {
        accumlator += value;
    })
```

#### 但是如果是数组元素的积的话 ，reduce中的累加器的初始值就需要重新修改，因此我们可以继续重写reduce函数来完善它。

```js
    const reduce = (array, fn, initialValue) => {
        let accumlator = initialValue || 0;

        for(const value of array) {
            accumlator = fn(accumlator, value);
        }

        return [accumlator];
    }
```
