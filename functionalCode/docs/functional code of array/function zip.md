<h1></h1>

#### 事情并非总是如你所愿。我们在apressBooks的bookDetails中获取了reviews，并能轻松操作它。但是apressBooks可能来自服务器，而reviews被作为一个单独的数组返回，并不是嵌入式的数据。

```js
    //分割的apressBooks对象
    let apressBooks = [{
        name: 'beginners',
        bookDetails: [{
            "id":111,
            "title": "C# 6.0",
            "author": "ANDREW THOELSEN",
            "rating":[4.7]
        },{
            "id":222,
            "title": "effict learning machine",
            "author": "PAUL Khanna",
            "rating":[4.5],
            "reviews": [], 
        }]
    },{
        name: "pro",
        bookDetails: [{
            "id":333,
            "title": "Pro AngularJS",
            "author": "ADAM THOELSEN",
            "rating":[4.0],
            "reviews": [],
        },{
            "id":444,
            "title": "Pro ASP.NET",
            "author": "ADAM Freeman",
            "rating":[4.2]
        }]
    }]

    //reviewDetails包含了图书的详情
    let reviewDetails = [{
        id: 111,
        reviews:[{good:4, excellent:12}]
    },{
        id: 222,
        reviews:[]
    },{
        id: 333,
        reviews:[]
    },{
        id: 444,
        reviews:[{good:14, excellent:12}]
    }];
```

#### 上面的代码段中，reviews被填充到一个单独的数组中，他们与书的id相匹配。这是数据被分离到不同部分的典型例子。那么要如何处理这些分割的数据呢？

## zip函数
#### zip函数的任务是合并两个给定的数组 。将上面代码段中的apressBooks和reviewsDetails合并到一个单独的数组中，这样我们就可以在一个单一的数组获取数据了。

```js
    const zip = (leftArr, rightArr, fn) => {
        let index, results = [];
        for(index = 0; index < Math.min(leftArr, rightArr); index++) {
            results.push(fn(leftArr[index], rightArr[index]));
        }

        return results;
    }
```

#### 下面就用zip函数来合并上面的数组 。

```js
    //bookDetails
    const bookDetails = concatAll( map(apressBooks, (books) => {
        return book.bookDetails;
    }))

    //zip the results
    const mergedBookDetails = zip(bookDetails, reviewDetails, (book, review) => {
        if(book.id === review.id) {
            let clone =Object.assign({}, book);
            clone.ratings = review;
            return clone;
        }
    });
```
#### mergedBookDetails的结果变成如下所示

```js
    [{
        "id":111,
        "title": "C# 6.0",
        "author": "ANDREW THOELSEN",
        "rating":[4.7],
        "ratings": {id:111, reviews:[Object]}
    },{
        "id":222,
        "title": "effict learning machine",
        "author": "PAUL Khanna",
        "rating":[4.5],
        "reviews": [], 
        "ratings": {id:222, reviews:[]}
    },{
        "id":333,
        "title": "Pro AngularJS",
        "author": "ADAM THOELSEN",
        "rating":[4.0],
        "reviews": [],
        "ratings": {id:333, reviews:[]}
    },{
        "id":444,
        "title": "Pro ASP.NET",
        "author": "ADAM Freeman",
        "rating":[4.2]，
        "ratings": {id:444, reviews:[Object]}
    }]
```
#### 做zip操作时, 我们接受bookDetails数组和reviewDetails数组 。 检查两个数组元素的id是否匹配，如果是，就从book中克隆出一个新的对象clone。

```js
    let clone = Object.assign({}, book);
```

#### 现在clone指向的是一个独立的引用，修改clone的属性并不或改变真实的book引用。
