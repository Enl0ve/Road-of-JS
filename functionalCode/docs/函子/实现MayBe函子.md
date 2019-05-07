<h1>实现MayBe函子</h1>

#### MayBe是一个函子，意味着它将实现一个map函数。但是会以一种不同的实现方式。下面从一个简单的MayBe函子开始，它能够持有数据。

```js
    function MayBe(val) {
        this.value = val;
    }

    MayBe.of = function(val) {
        return new MayBe(val);
    }
```
#### 接下来，还需要实现一个map契约 。

```js
    MayBe.prototype.isNothing = function() {
        return (this.value === null || this.value === undefined)
    }

    MayBe.prototype.map = function(fn) {
        return this.isNothing()?MayBe.of(null): MayBe.of(fn(this.value));
    }
```

#### 该map契约先检查当前实例的值是不是null或者undefined。然后再用其输出作为值进行实例化。