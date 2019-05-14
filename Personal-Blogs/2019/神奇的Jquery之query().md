#### 上周实现一个需求的过程中引发了一些对于jquery(selector, [context])函数的思考。这个需求是这样的，点击设置按钮然后在整个视区上弹出一个模态框，在这样的画面上获取模态框画面中一个带有特定ID的隐藏表单的值，使用$("#ID).val()进行取值，但是取值为undefined。我思考了一下，发现弹出框和整个视区是在同一层次上的。代码层次我简单用伪代码写下：
```html
    <html>
    <head>
    </head>
    <body>
    //弹出框实现层
    <div class="modal">
        //_.template()方法加载模态框内容
    </div>
    //main画面内容
    <div class="main">
        //_.template()方法加载内容
    </div>
    </body>
    </html>
```
#### 这样我在取隐藏表单的值取到的值为Undefined。于是我打开了Jquery的官网，查看了源码，找到了jquery(selector, [context])方法的定义。
```javascript
    // Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
    },
```
#### 源码中看到，jQuery对象被调用是需要init()构造函数初始化，再查看一下init()函数。
```javascript
// Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified ch html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery( document );
```
#### 从上面的代码中我们可以看出"return this.constructor( context ).find( selector )",当init()中存在参数context时，用新的context进行初始化。看到这里，我立即想到了将window.parent.document作为参数传入，这样就能顺利取到值了。
#### 从上面的代码中，还可以了解到使用html tag作为selector进行选取。
```javascript
	<div class="Container">
		<span>Hello World</span>
	</div>

	$("<div class='Container'>")
```