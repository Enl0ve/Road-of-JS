<h1></h1>

#### 本节将创建一个Either函子，它能够解决分支拓展的问题 。

```js
    MayBe.of('george')
        .map(() => undefined)
        .map( x => 'MR'+x);

    => MayBe{value:null}
```
#### 与预期一致，但是哪一个分支（也就是上面的两个map调用）在检查undefined或null值时执行失败了，不能通过MayBe函子判断出来。这不能说明MayBe函子存在缺陷，只是我们在某些情况下需要比MayBe函子更好的函子。此处就是Either函子发挥作用的地方。
