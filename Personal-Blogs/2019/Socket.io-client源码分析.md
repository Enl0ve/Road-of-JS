<h1>Socket.io-client源码分析</h1>

### Socket.io-client source code analysis

### 根据`node_modlues`中`socket.io-client`的文件结构，大概画了张UML图。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019051616490235.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0VubDB2ZQ==,size_16,color_FFFFFF,t_70)


### 从图片中可以清楚地看到模块中`lib`文件夹下各文件的依赖关系。

<h3 style='color:lightblue'>Note:带箭头的虚线表示依赖关系，如<i>socket.js</i>需要依赖<i>on.js</i>  ,则箭头指向<i>on.js</i>，即依赖对象指向被依赖的对象。</h3>

### 下面就对lib目录下文件进行分析
-----
> ## on.js

```js
/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}
/**
 * Emitter是一个模块，实现了mixin模式,obj = Emitter(obj) 或者 obj = new Emitter;
 * obj.on(ev, fn) 是给事件ev注册了一个函数
 * 函数返回一个带有去除监听事件功能的对象。
```

----
> url.js

```js
/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // loc 是一个模仿window.location的对象
  // 默认是window.location
  loc = loc || (typeof location !== 'undefined' && location);
  //如果uri不存在的话，默认值为当前浏览器地址的协议加上主机名。
  //e.g 浏览器地址栏为https://socket.io/docs/client-api/#socket-disconnected
  // 则uri = https://socket.io
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  // 路径支持
  // '//socket.io' => https://socket.io
  // '/docs' => socket.io/docs
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    //不使用超文本安全传输协议或者websocket security
    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        //loc为空的情况下，使用当前浏览器地址使用协议
        uri = loc.protocol + '//' + uri;
      } else {
        //否则使用超文本安全传输协议
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    // 使用engine.io-client解析uri
    obj = parseuri(uri);
  }

  // 确保使用的是默认端口
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}
```

-----
> ## socket.js

```js
    /**
     * module dependencies
     **/
    var parser = require('socket.io-parser');
    var Emitter = require('component-emitter');
    var toArray = require('to-array');
    var on = require('./on');
    var bind = require('component-bind');
    var debug = require('debug')('socket.io-client:socket');
    var parseqs = require('parseqs');
    var hasBin = require('has-binary2');
```
### 先分析一些模块及其作用
|module name|function|
|:--:|:--:|
|socket.io-parser|encoder&decoder|
|component-emitter|Event emitter component|
|component-bind|Function binding utility|
|to-array|Turn an array like into an array|
|parseqs|Provides methods for converting an object into string representation, and vice versa|
|has-binary2|test if an object contains binary data|

```js
var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};
```
### 上面列出的事件是无法被用户emit的,是私有事件名。

```js
    /**
     * `Socket` constructor.
     *
     * @api public
     */

    function Socket (io, nsp, opts) {
        this.io = io;
        this.nsp = nsp;
        this.json = this; // compat
        this.ids = 0;
        this.acks = {};
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.connected = false;
        this.disconnected = true;
        this.flags = {};
        if (opts && opts.query) {
            this.query = opts.query;
        }
        if (this.io.autoConnect) this.open();
    }
```
### `socket`的构造函数。
----
> ## API 解析

> ### Socket#open() 
```js
    /**
     * "Opens" the socket. 手动打开连接
     *
     * @api public
     */

    Socket.prototype.open =
    Socket.prototype.connect = function () {
        if (this.connected) return this;

        this.subEvents();
        this.io.open(); // ensure open
        if ('open' === this.io.readyState) this.onopen();
        this.emit('connecting');
        return this;
    };
    /**
     * 连接之前先检查实例是否已经连接了，连接的话直接发回实例本身。如果没有则需要为本身订阅open、close、packet事件。发射connectting事件。
     **/

    //除了上面之外，我想分析一下subeEvents函数
    /**
     * Subscribe to open, close and packet events
     *
     * @api private
     */

    Socket.prototype.subEvents = function () {
        if (this.subs) return;

        var io = this.io;
        this.subs = [
            on(io, 'open', bind(this, 'onopen')),
            on(io, 'packet', bind(this, 'onpacket')),
            on(io, 'close', bind(this, 'onclose'))
        ];
    };
    /**
     * 上面有对on函数的分析。这里给socket对象本身注册了open、packet、close事件的监听的函数。这三个事件分别对应了Socket.proptotype.onopen、Socket.proptotype.onpacket、Socket.proptotype.onclose。 当我们尝试手动打开连接的时候就会调用subEvents函数。
     * */

    //如果客户端或者服务端被强制断开连接时，就会调用destroy函数。下面的代码中会做一个for循环，在连接断开时，移除对open、packet、close事件的监听。
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @api private.
     */

    Socket.prototype.destroy = function () {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            for (var i = 0; i < this.subs.length; i++) {
            this.subs[i].destroy();
            }
            this.subs = null;
        }

        this.io.destroy(this);
    };
```

> ### Socket#send()
```js
    /**
     * Sends a `message` event.
     *
     * @return {Socket} self
     * @api public
     */

    Socket.prototype.send = function () {
        var args = toArray(arguments);
        args.unshift('message');
        this.emit.apply(this, args);
        return this;
    };

    /**
     * 参数被转化成数组. 并且在数组的首位上添加了'message'。
     * 然后调用emit方法将数组发射出去。
     **/
```

> ### Socket#emit()

```js
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @param {String} event name
     * @return {Socket} self
     * @api public
     */

    Socket.prototype.emit = function (ev) {
        //先检查一下事件名是否是私有的, 具体的私有事件名参考上面event对象 
        //是私有事件的话直接发射。
        if (events.hasOwnProperty(ev)) {
            emit.apply(this, arguments);
            return this;
        }

        //如果不是私有事件的话，则将要发送的arguments封装成数据包packet发送。
        var args = toArray(arguments);
        var packet = {
            type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
            data: args
        };

        packet.options = {};
        packet.options.compress = !this.flags || false !== this.flags.compress;

        // event ack callback
        //emit()函数参数中是否有ack回调
        if ('function' === typeof args[args.length - 1]) {
            debug('emitting packet with ack id %d', this.ids);
            //根据传输的packet的id号作为key,添加ack回调作为value
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
        }

        if (this.connected) {
            this.packet(packet);
        } else {
            this.sendBuffer.push(packet);
        }

        this.flags = {};

        return this;
    };
```
<h3 style='color:lightblue'>Note: 什么是packet?我在socket.io-protocal中找到了这样的定义 。</h3>

```text
 Packet

  Each packet is represented as a vanilla `Object` with a `nsp` key that indicates what namespace it belongs to (see "Multiplexing") and a `type` key that can be one of the following:
```
### 其中type的所有值为：
  - `Packet#CONNECT` (`0`)
  - `Packet#DISCONNECT` (`1`)
  - `Packet#EVENT` (`2`)
  - `Packet#ACK` (`3`)
  - `Packet#ERROR` (`4`)
  - `Packet#BINARY_EVENT` (`5`)
  - `Packet#BINARY_ACK` (`6`)
### 更加具体的内容请参考[socket.io-protocol](https://github.com/learnboost/socket.io-protocol)

> ### Socket#compress()

```js
    /**
     * Sets the compress flag.设置compress标志位
     *
     * @param {Boolean} if `true`, compresses the sending data
     * @return {Socket} self
     * @api public
     */

    Socket.prototype.compress = function (compress) {
        this.flags.compress = compress;
        return this;
    };
```
> ### Socket#compress()

```js
    /**
     * Sets the binary flag,设置binary标志位
     *
     * @param {Boolean} whether the emitted data contains binary
     * @return {Socket} self
     * @api public
     */

    Socket.prototype.binary = function (binary) {
        this.flags.binary = binary;
        return this;
    };
```
