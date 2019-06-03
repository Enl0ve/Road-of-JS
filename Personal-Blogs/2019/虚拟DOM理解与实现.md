 最近一直在学习ReactJS,其中虚拟DOM是一个很重要的知识点，本文将结合相关书籍和查阅到的知识点，再结合个人理解，深入浅出地理解虚拟DOM，并给出一个简单可行的JS实现。

 > ## 真实DOM和解析流程
 浏览器渲染引擎工作流程都差不多，大致分为5步，创建DOM树——创建StyleRules——创建Render树——布局Layout——绘制Painting

 + 第一步，用HTML分析器，分析HTML元素，构建一颗DOM树(标记化和树构建)。    
 + 第二步，用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表。    
 + 第三步，将DOM树和样式表，关联起来，构建一颗Render树(这一过程又称为Attachment)。每个DOM节点都有attach方法，接受样式信息，返回一个render对象(又名renderer)。这些render对象最终会被构建成一颗Render树。    
 + 第四步，有了Render树，浏览器开始布局，为每个Render树上的节点确定一个在显示屏上出现的精确坐标。    
 + 第五步，Render树和节点显示坐标都有了，就调用每个节点paint方法，把它们绘制出来。     
  
  DOM树的构建是文档加载完成开始的？构建DOM数是一个渐进过程，为达到更好用户体验，渲染引擎会尽快将内容显示在屏幕上。它不必等到整个HTML文档解析完毕之后才开始构建render数和布局。
  
  Render树是DOM树和CSSOM树构建完毕才开始构建的吗？这三个过程在实际进行的时候又不是完全独立，而是会有交叉。会造成一边加载，一遍解析，一遍渲染的工作现象。CSS的解析是从右往左逆向解析的(从DOM树的下－上解析比上－下解析效率高)，嵌套标签越多，解析越慢。

  > ## JS操作真实DOM的代价
  用我们传统的开发模式，原生JS或JQ操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程。在一次操作中，我需要更新10个DOM节点，浏览器收到第一个DOM请求后并不知道还有9次更新操作，因此会马上执行流程，最终执行10次。例如，第一次计算完，紧接着下一个DOM更新请求，这个节点的坐标值就变了，前一次计算为无用功。计算DOM节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作DOM的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验。

  > ## 虚拟DOM存在的意义
  Web界面由DOM树(树的意思是数据结构)来构建，当其中一部分发生变化时，其实就是对应某个DOM节点发生了变化，虚拟DOM就是为了解决浏览器性能问题而被设计出来的。如前，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attch到DOM树上，再进行后续操作，避免大量无谓的计算量。所以，用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，操作内存中的JS对象的速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制。

  > ## 虚拟DOM实现
```js
    var Velement = function (tagName, props, children) {
            if (!this instanceof Velement) {
                return new Velement(tagName, props, children)
            }

            if (Array.isArray(props)) {
                children = props;
                props = {};
            }

            //设置虚拟DOM的相关属性
            this.tagName = tagName;
            this.props = props || {};
            this.children = children || [];
            //key是keyItem,在ul标签中用来判断增删改
            this.key = props ? props.key : void 0;
            //count的数量表示节点的深度吗
            var count = 0;
            this.children.forEach((child, index) => {
                if (!child instanceof Velement) {
                    count += child.count;
                } else {
                    children[index] = child;
                }
                count++;
            })
            this.count = count;
        }

        //render
        Velement.prototype.render = function () {
            var el = document.createElement(this.tagName);
            //设置标签的属性
            var props = this.props;
            for (var propName in props) {
                el.setAttribute(propName, props[propName]);
            }

            //依次创建子节点
            this.children.forEach((child) => {
                var child = child instanceof Velement ? child.render() : document.createTextNode(child);
                el.appendChild(child);
            });
            return el;
        }

        var vdomObj = new Velement('div', {
            id: 'container1'
            }, [
            new Velement('h1', {
                style: 'color:red'
            }, ['simple virtual dom']),
            new Velement('p', ['hello world']),
            new Velement('ul', [new Velement('li', ['item #1']), new Velement('li', ['item #2'])])
        ]);

        /**
        * DOM树
        * <div id="container1">
        * <h1 style="color:red">simple virtual dom</h1>
        * <p>hello world</p>
        * <ul>
        * <li>item #1</li>
        * <li>item #2</li>
        * </ul>
        * </div>
        */
        console.log(vdomObj);

        var vdom = vdomObj.render();
        document.getElementById('vm').appendChild(vdom);
```
实际效果图：
![virtual dom](D:/repository_enlove/Road-of-JS/Personal-Blogs/images/virtual_dom.jpg)

>diff算法
两棵树如果完全比较时间复杂度是O(n^3)，但参照《深入浅出React和Redux》一书中的介绍，React的Diff算法的时间复杂度是O(n)。要实现这么低的时间复杂度，意味着只能平层的比较两棵树的节点，放弃了深度遍历。这样做，似乎牺牲掉了一定的精确性来换取速度，但考虑到现实中前端页面通常也不会跨层移动DOM元素，这样做是最优的。因此，我们只需要对同级别节点进行比较，避免了diff算法的复杂性。对同级别节点进行比较的常用方法是深度优先遍历

为了便于说明问题，我当然选取了最简单的DOM结构，两个简单DOM之间的差异似乎是显而易见的，但是真实场景下的DOM结构很复杂，我们必须借助于一个有效的DOM树比较算法。

设计一个diff算法有两个要点：
```html
如何比较两棵DOM树
如何记录节点之间的差异
```
1. 比较两棵DOM树
```js
    function diff(oldTree, newTree) {
        //节点的顺序遍历
        var index = 0;
        //在记录的过程中记录节点的差异
        var patches = {};
        //深度优先遍历两棵树
        dfswalk(oldTree, newTree, index, patches);
        return patches;
    }
```

2. 记录节点之间的差异
由于对DOM树之间采用的是同级比较，因此节点之间的差异可以归结为4种类型。
```html
修改节点属性, 用PROPS表示
修改节点文本内容, 用TEXT表示
替换原有节点, 用REPLACE表示
调整子节点，包括移动、删除等，用REORDER表示
```

对节点之间的差异，我们可以很方便地使用上述四种方式进行记录，比如当旧节点被替换时
```js
{type:REPLACE, node:newNode}
```
而当旧节点之间的属性被修改时
```js
{type:props, props:newProps}
```

在深度优先遍历的过程中，每个节点都有一个编号，如果对应的节点有变化，只需要把相应变化的类别记录下来即可。下面是具体实现：
```js
function dfsWalk(oldNode, newNode, index, patches) {
    var currentPatch = [];
    if (newNode === null) {
        //依赖listdiff算法进行标记为删除
    } else if (util.isString(oldNode) && util.isString(newNode)) {
        if (oldNode !== newNode) {
            //如果是文本节点则直接替换文本
            currentPatch.push({
                type: patch.TEXT,
                content: newNode
            });
        }
    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        //节点类型相同
        //比较节点的属性是否相同
        var propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({
                type: patch.PROPS,
                props: propsPatches
            });
        }
        //比较子节点是否相同
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
    } else {
        //节点的类型不同，直接替换
        currentPatch.push({ type: patch.REPLACE, node: newNode });
    }
 
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}
```
比如对上文图中的两颗虚拟DOM树，可以用如下数据结构记录它们之间的变化
```js
var patches = {
        1:{type:REPLACE,node:newNode}, //h1节点变成h5
        5:{type:REORDER,moves:changObj} //ul新增了子节点li
    }
```

>对真实DOM进行最小化修改

通过虚拟DOM计算出两颗真实DOM树之间的差异后，我们就可以修改真实的DOM结构了。上文深度优先遍历过程产生了用于记录两棵树之间差异的数据结构patches, 通过使用patches我们可以方便对真实DOM做最小化的修改。
```js
//将差异应用到真实DOM
function applyPatches(node, currentPatches) {
    util.each(currentPatches, function(currentPatch) {
        switch (currentPatch.type) {
            //当修改类型为REPLACE时
            case REPLACE:
                var newNode = (typeof currentPatch.node === 'String')
                 ? document.createTextNode(currentPatch.node) 
                 : currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;
            //当修改类型为REORDER时
            case REORDER:
                reoderChildren(node, currentPatch.moves);
                break;
            //当修改类型为PROPS时
            case PROPS:
                setProps(node, currentPatch.props);
                break;
            //当修改类型为TEXT时
            case TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error('Unknow patch type ' + currentPatch.type);
        }
    });
}
```

> ## 参考来源:
>  1. [全面理解虚拟DOM，实现虚拟DOM](https://blog.csdn.net/suhuaiqiang_janlay/article/details/80256561)
>  2. [vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)
