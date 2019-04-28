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
   + [小结]()
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
     + [every函数]()
     + [some函数]()
     + sort函数
   + 小结
 + 闭包与高阶函数
   + 理解闭包
     + 什么是闭包
     + 记住闭包生成的位置
     + 回顾sortBy函数     
   + 真正的高阶函数
     + tap函数
     + unary函数
     + once函数
     + memorized函数
   + 小结
+ 数组的函数式编程
   + 数组的函数式方法
     + map
     + fliter
   + 连接操作
   + reduce函数
   + zip数组
   + 小结
+ 柯里化与偏应用
   + 一些术语
     + 一元函数
     + 二元函数
     + 变参函数
   + 柯里化
     + 柯里化用例
     + 日志函数 - 应用柯里化
     + 回顾curry
     + 回顾日志函数
   + 柯里化实战
     + 在数组内容中查找数字
     + 求数组的平方
   + 数据流
     + 偏应用
     + 实现偏函数
     + 柯里化与偏应用
   + 小结
+ 组合与管道
   + 组合的概念
   + 函数式组合
     + 回顾map与fliter
     + compose函数
   + 应用compose函数
     + 引入curry和partial
     + 组合多个函数
   + 管道/序列
   + 组合的优势
     + 组合满足结合律
     + 使用tap函数调式
   + 小结
 + 函子
   + 什么是函子
     + 函子是容器
     + 函子实现了map方法
   + MayBe函子
     + 实现MayBe函子
     + 简单用例
     + 真是用例
   + Either函子
     + 实现Either函子
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