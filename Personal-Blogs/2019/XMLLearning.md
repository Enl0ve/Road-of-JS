## XML(eXtensiable Markup Language, 可扩展标记语言)
### 作用

### XML不是对HTML的替代
#### XML是对HTML的补充
#### 在大多数Web应用程序中，XML用于传输数据，而HTML用于格式化并显示数据.
#### 对XML最好的描述是：
#### XML是独立于软件和硬件的信息传输工具

----
#### 一个简单的XMl实例
```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
<to>yummy</to>
<from>enlove</from>
<heading>reminders</heading>
<contents>Running at 3:00PM</contents>
</note>
```
##### 第一行是xml声明，它定义xml的版本是1.0和所使用的编码。
##### 下一行描述文档的根元素

##### 下面是一个比较复杂的例子
##### bookStore是根元素，子元素是book，且book拥有属性category,book下面拥有子元素，title、price、pages、published_year，其中子元素title带有属性lang.则其代码为：
```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<bookstore>
<book category="id1">
<title lang="1">b1</title>
<price>12</price>
<pages>234</pages>
<published_year>2018</published_year>
</book>
</bookstore>
```
----
#### XML语法
##### 1. 所有的xml元素必须有一个关闭标签
` <book>b1</book> `
##### 这一点于HTML不同，HTML中某些元素是可以不用关闭标签的，比如<br>
```
注：<?xml version="1.0" encoding="ISO-8859-1"?>
这并不错误的，声明本身不是XML文档本身的一部分，它没有关闭标签
```
##### 2.xml标签对大小写敏感
#### ` <book>b2</book> right`
#### ` <Book>b3</Book> right`
#### ` <Book>b3</book> correct`

##### 3.xml标签必须要正确嵌套
##### 4.xml文档必须有根元素
##### 5.xml标签属性必须加引号
##### 6.在xml中用实体引用来代替特殊符号
```
xml中提供了5个实体引用
> &gt; greater than
< &lt; less than
& &amp; 
' &apos;
" &quot;
注：在xml中，只有<和&是非法的，但是用实体引用来表示'>'是一个好习惯
``` 
##### 7. 注释标签
` <!-- this is comment -->`
##### 8. 在XML中空格会被保留，但是html会将空格裁减是一个
##### 9. 在XML中使用LF(换行符)来存储换行
##### 在windows应用程序中，换行通常用一对字符来存储换行，分别是回车符(\r,CR)和换行符(\n,LF)
----
#### xml元素命名规则
#### xml元素命名必须包含以下规则：
+ 名称可以包含字母、数字和字符
+ 名称不能以数字或者标点符号开始
+ 名称不能以XML(或者xml、Xml等等)开始
+ 名称不能包含空格
----
#### xml属性
#### 1. xml属性
##### 一个xml元素可以有多个属性值
#### 2. xml属性值必须加引号
```
<book categroy='book' price="123" mixed="nihao '23'">b1</book>
```
#### 3.xml中并没有规定属性和标签的使用，但是尽量避免使用属性
```xml
<people>
<sex>female</sex>
<name>hae</name>
</people>

<people sex="female">
<name>hae</name>
</people>
```
##### 为什么要避免使用属性？
+ 属性不能拥有多个值
+ 属性不能包含树结构
+ 属性不易扩展
  
#### 4.针对元数据的XML属性
##### 有时候会向元素分配ID引用.这些ID可以用来标识XML元素。它的作用与HTML中的id属性一样。
```xml
<people id="peo1">
<sex>female</sex>
<name>hae</name>
</people>

```
##### 元数据（有关数据的数据）应当存储为属性，而数据本身应当存储为元素
#### 以下是一些属性使用的建议：
+ 属性名称不能在同一起始标签或空元素标签中出现一次
+ 一个属性必须使用属性表声明的文档类型定义(DTD)的声明
+ 属性值不能包含直接或间接的实体引用外部实体
+ 任何实体的替换文本称为直接或间接的属性值中不能包含任何小于号
----
#### XML DTD(Document Type Definition, 文档类型定义)
##### xml DTD用来检验xml语法是否正确，xml schema是xml DTD的替代品
----
#### xml 与 xmlt
##### 通过使用xmlt，可以将xmlt转换成html格式
##### 使用xmlt显示xml
+ xmlt是xml样式表语言的首选
+ xmlt在浏览器显示xml文件之前，将其转化成Html
+ xmlt远比css更加完善
##### 注：使用xmlt来转换xml文件，在不同的浏览器上可能会有不同的结果，为了较少这种问题，可以在服务器上转换xml文件。
----
#### xml JavaScript
##### *XMLHTTPRequest*
```javascript
if(window.XMLHttpRequest){
    var xmlhttp = new XMLHttpRequest();
}else{
    //code for IE5,6
    var xmlhttp = new ActiveXObject("Microsoft.XMLHttp");
}

xmlhttp.open("GET", "albumn.xml", false);
xmlhttp.send();

var xmldoc = xmlhttp.ResponseXML;
var x = xmldoc.getElementByTagName("CD");

document.write("<table border = '1'>");
for(var i = 0; i < x.length; i++){
    //do something here
}

document.write("</table>");
```
----
### **xml进阶**
-----
#### xml命名空间
##### 命名空间是一组唯一的名称，该命名空间是确定的URI(统一资源标识符)
##### 命名空间提供避免元素命名冲突的方法
##### 在xml文件中，元素名称是由开发者定义的，当两个不同的文档使用相同的元素名称时，就会出现命名冲突。
##### 在下面的xml携带HTML表格信息：
```xml
<table>
<tr>
<td>name</td>
<td>price</td>
</tr>
</table>
```
##### 这个xml文档携带的是一张桌子的信息
```xml
<table>
<product_name>tabels</product_name>
<price>20000</price>
</table>
```
##### 假如这两个文件一起使用，就会出现两个包含不同元素内容的table元素，就会出现元素命名冲突，xml解析器不知道如何处理这类的冲突。

#### 元素名相同的情况如何处理元素冲突
##### *使用前缀名来处理冲突*
```xml
<h:table>
<h:tr>
<h:td>name</h:td>
<h:td>price</h:td>
</h:tr>
</h:table>

<f:table>
<f:product_name>tables</f:product_name>
<f:price>20000</f:price>
</f:table>
```
#### 注：*这样上面的实例就不会存在命名冲突了*
#### xml命名空间-xmlns属性
##### 当在xml中使用前缀时，一个所谓的使用前缀的命名空间必须被定义.
##### 命名空间时在元素的开始标签的xmlns属性中定义的。语法时xmlns:前缀="URI"
```xml
<h:table xmlns:h="http://www.w3scchool.org/html">
<h:tr>
<h:td>name</h:td>
<h:td>price</h:td>
</h:tr>
</h:table>

<f:table xmlns:f="//www.w3cschool.cn/furniture">
<f:product_name>tables</f:product_name>
<f:price>20000</f:price>
</f:table>
```
#### 当命名空间出现在元素的开始标签中时，所有带有相同前缀的元素都会与同一个命名空间相关联。
#### 命名空间,可以在它们的开始标签或者XML根元素中声明
```xml
<root xmlns:h="http://www.w3scchool.org/html"
    xmlns:f="//www.w3cschool.cn/furniture">

<h:table>
<h:tr>
<h:td>name</h:td>
<h:td>price</h:td>
</h:tr>
</h:table>

<f:table>
<f:product_name>tables</f:product_name>
<f:price>20000</f:price>
</f:table>
</root>
```
##### 注：命名空间URI不会被解析器用于查找信息。其目的是赋予命名空间唯一的名称。不过，很多公司常常会作为指针来使用命名空间指向实际存在的网页，这个网页包含关于命名空间的信息。
----
#### xml CDATA
##### CDATA指字符数据，我们将其定义为文本快。
##### xml中的所有文本均会被xml解析器解析，只有CDATA区段中的数据会被xml解析器忽略。
##### 术语CDATA指的是不该由XML解析器解析的文本数据
##### 像"<"和"&"这样都是非法的字符，Javascript中包含大量的类似字符，为了避免错误，可以将脚本代码定义为CDATA。CDATA中的数据会被XML解析器忽略。语法是"<![CDATA[" 开始，由 "]]>" 结束。
```xml
<script>
    <![CDATA[
        function add(a, b){
            if(a < b){
                console.log(a);
            }else{
                coonsole.log(b);
            }
        }
    ]]>
<script>
```
##### 关于 CDATA 部分的注释：
##### CDATA 部分不能包含字符串 "]]>"。也不允许嵌套的 CDATA 部分。
##### 标记 CDATA 部分结尾的 "]]>" 不能包含空格或换行。
-----
### 附录A
#### XML技术列表
+ XHTML(可扩展HTML)
  >更严格更纯净的基于 XML 的 HTML 版本
+ XML DOM(XML文档对象模型)
  >访问和操作 XML 的标准文档模型。
+ XSL(可扩展对象语言)
  + XSLT(XSL转换) - 把 XML 转换为其他格式，比如 HTML
  + XSL-FO(XSL格式化对象) - 用于格式化 XML 文档的语言
  + XPath - 用于导航 XML 文档的语言
+ XQuery(XML查询语言)
  >基于 XML 的用于查询 XML 数据的语言。
+ XSD(XML架构)
  >基于 XML 的 DTD 替代物。
+ DTD(文档类型定义)
  >用于定义 XML 文档中的合法元素的标准。
+ XLink(XML链接语言)
  >在 XML 文档中创建超级链接的语言。
+ XPointer(XML指针语言)
  >允许 XLink 超级链接指向 XML 文档中更多具体的部分。
+ SOAP(简单对象访问协议)
  >允许应用程序在 HTTP 之上交换信息的基于 XML 的协议。
+ WSDL(Web服务描述语言)
  >用于描述网络服务的基于 XML 的语言。
+ RDF(资源描述框架)
  >用于描述网络资源的基于 XML 的语言。
+ RSS(真正简易聚合)
  >聚合新闻以及类新闻站点内容的格式。
+ SVG(可伸缩矢量图形) 
  >##### 定义 XML 格式的图形。
