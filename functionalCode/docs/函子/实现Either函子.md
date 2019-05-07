<h1></h1>

#### 我们已经了解Either函子解决的问题， 现在就来看看Either函子的实现 。

```js
    const Nothing = function(val) {
        this.value = val;
    }

    Nothing.of = function(val) {
        return new Nothing(val);
    }

    Nothing.prototype.map = function(f) {
        return this;
    }

    const Some = function(val) {
        this.value = val;
    }

    Some.of = function(val) {
        return new Some(val);
    }

    Some.prototype.map(fn) {
        return Some.of(fn(this.value));
    }
```

#### 实现包含了两个函数，Some和Nothing。Some是Container的一个副本。有趣的是Nothing,其map不执行任何函数，返回对象本身。
#### 换言之，可以在Some上运行的函数，不能在Nothing上运行。

#### 下面看一个例子

```js
    Some.of('test').map(x => x.toUpperCase());
    => Some {value:"TEST"}

    Nothing.of("test").map(x => x.toUpperCase());
    => Nothing {value: "test"}
```

#### 下面将上面的两个对象封装到Either中。

```js
    const Either = {
        Some: Some,
        Nothing: Nothing
    }
```