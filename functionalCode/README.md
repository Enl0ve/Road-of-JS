> <h1 style="color:lightblue">函数式编程</h1>

### 仓库中的内容来自《Javascript ES6 函数式编程入门经典》, 并结合读者自身分析。文中若有不当或者大家有想补充的地方，欢迎通过issues进行提交。

### <b style="color:yellow">数学万岁</b>🙌🎆

### 下面是本仓库docs内容的目录,每个目录都有超链接对应相应的文章,点击目录即可挑转,文章内容觉得还行的话,点击<b style="color:gold">star</b>⭐收藏一下，以后我会继续带来更多更新更全面的内容及讲解。

> <h2 style="color:lightblue">目录</h2>

+ 函数式编程简介
   + 什么是函数是编程？为何它如此重要
   + 引用透明性
   + 命令式、函数式和抽象
   + 函数式编程的好处
   + 纯函数
      + 纯函数产生可测试的代码
      + 合理的代码
   + 并发代码
   + [可缓存](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Functional%20Code%20Introduction/%E5%8F%AF%E7%BC%93%E5%AD%98.md)
   + [管道与组合](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Functional%20Code%20Introduction/%E7%AE%A1%E9%81%93%E4%B8%8E%E7%BB%84%E5%90%88(compose%26pipe).md)
   + [纯函数是数学函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Functional%20Code%20Introduction/%E7%BA%AF%E5%87%BD%E6%95%B0%E6%98%AF%E6%95%B0%E5%AD%A6%E5%87%BD%E6%95%B0.md)
   + [小结](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Functional%20Code%20Introduction/Conclusion.md)
+ JavaScript函数基础
   + ECMAScript历史
   + 创建并执行函数
      + 第一个函数
      + 严格模式
      + return语句是可选的
      + 多语句函数
      + 函数参数
      + ES5函数在ES6中是有效的
   + 设置项目
      + 初始设置
      + 用第一个函数式方法处理循环问题
      + export要点
      + import要点
      + 使用babel-node运行代码
      + 在npm中创建脚本
      + 在git上运行代码
   + 小结
+ 高阶函数
   + 理解数据
     + [理解JavaScript数据类型](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/High%20Order%20Function/Understand%20Bisic%20Type%20of%20Data.md)
     + 存储函数
     + 传递函数
     + 返回函数
   + 抽象和高阶函数
     + 抽象的定义
     + [通过高阶函数进行抽象](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/High%20Order%20Function/abstract%20by%20HOC.md)
   + 真正的高阶函数
     + [every函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/High%20Order%20Function/function%20array.md)
     + [some函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/High%20Order%20Function/function%20some.md)
     + sort函数
   + [小结](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/High%20Order%20Function/conclusion.md)
 + 闭包与高阶函数
   + 理解闭包
     + [什么是闭包](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E9%97%AD%E5%8C%85%26HOC/%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AD%E5%8C%85.md)
     + [记住闭包生成的位置](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E9%97%AD%E5%8C%85%26HOC/%E8%AE%B0%E4%BD%8F%E9%97%AD%E5%8C%85%E7%94%9F%E6%88%90%E7%9A%84%E4%BD%8D%E7%BD%AE.md)
     + 回顾sortBy函数
   + 真正的高阶函数
     + [tap函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E9%97%AD%E5%8C%85%26HOC/function%20tap.md)
     + [unary函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E9%97%AD%E5%8C%85%26HOC/function%20unary.md)
     + [once函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E9%97%AD%E5%8C%85%26HOC/function%20once.md)
     + [memorized函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E9%97%AD%E5%8C%85%26HOC/function%20memoized.md)
   + 小结
+ 数组的函数式编程
   + 数组的函数式方法
     + map  
     + [fliter](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/functional%20code%20of%20array/function%20filter.md)
   + [连接操作](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/functional%20code%20of%20array/function%20concatAll.md)
   + [reduce函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/functional%20code%20of%20array/function%20reduce.md)
   + [zip数组](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/functional%20code%20of%20array/function%20zip.md)
   + 小结
+ 柯里化与偏应用
   + 一些术语
     + 一元函数
     + 二元函数
     + 变参函数
   + [柯里化](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/Curry.md)
     + [柯里化用例](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/examples%20about%20curry.md)
     + [日志函数 - 应用柯里化](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/%E6%97%A5%E5%BF%97%E5%87%BD%E6%95%B0%E6%9F%AF%E9%87%8C%E5%8C%96.md)
     + [回顾curry](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/%E5%9B%9E%E9%A1%BEcurry.md)
     + [回顾日志函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/%E5%9B%9E%E9%A1%BE%E6%97%A5%E5%BF%97%E5%87%BD%E6%95%B0.md)
   + 柯里化实战
     + 在数组内容中查找数字
     + 求数组的平方
   + 数据流
     + [偏应用](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/partial(%E5%81%8F%E5%BA%94%E7%94%A8).md)
     + [实现偏函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/Curry%26%E5%81%8F%E5%BA%94%E7%94%A8/realize%20partial(%E5%AE%9E%E7%8E%B0%E5%81%8F%E5%87%BD%E6%95%B0).md)
     + 柯里化与偏应用
   + 小结
+ 组合与管道
   + 组合的概念
   + 函数式组合
     + 回顾map与fliter
     + [compose函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/composition%26pipe/function%20compose.md)
   + [应用compose函数](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/composition%26pipe/%E5%BA%94%E7%94%A8compose%E5%87%BD%E6%95%B0.md)
     + 引入curry和partial
     + 组合多个函数
   + 管道/序列
   + 组合的优势
     + 组合满足结合律
     + 使用tap函数调式
   + 小结
 + 函子
   + [什么是函子](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E5%87%BD%E5%AD%90/%E4%BB%80%E4%B9%88%E6%98%AF%E5%87%BD%E5%AD%90.md)
     + [函子是容器](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E5%87%BD%E5%AD%90/%E5%87%BD%E5%AD%90%E6%98%AF%E5%AE%B9%E5%99%A8.md)
     + 函子实现了map方法
   + MayBe函子
     + [实现MayBe函子](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E5%87%BD%E5%AD%90/%E5%AE%9E%E7%8E%B0MayBe%E5%87%BD%E5%AD%90.md)
     + [简单用例](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E5%87%BD%E5%AD%90/%E7%AE%80%E5%8D%95%E7%94%A8%E4%BE%8B.md)
     + 真实用例
   + [Either函子](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E5%87%BD%E5%AD%90/Either%E5%87%BD%E5%AD%90.md)
     + [实现Either函子](https://github.com/Enl0ve/Road-of-JS/blob/master/functionalCode/docs/%E5%87%BD%E5%AD%90/%E5%AE%9E%E7%8E%B0Either%E5%87%BD%E5%AD%90.md)
     + reddit例子的Either版本
   + Pointed函子
   + 小结
 + 深入理解Monad
   + 根据搜索词条获取Reddit评论
   + 问题描述
     + 实现第一步
     + 合并Reddit应用
     + 多个map的问题
   + 通过join解决问题
     + 实现join
     + 实现chain
   + 小结
 + 使用Generator
   + 异步代码及其问题
   + Generator基础
     + 创建Generator
     + Generator的注意事项
     + yield关键字
     + done属性
     + 向Generator传递参数
   + 使用Generator处理异步调用
     + 一个简单的实例
     + 一个真实的实例
   + 小结
+ 附录


> 注： 上面的目录是书中完整的目录，由于主要想向大家展示的关于函数式编程的进阶内容，所以部分基础内容并没有进行展示。 如果大家有雷锋精神⚡的话，可以通过issue进行提交补充。