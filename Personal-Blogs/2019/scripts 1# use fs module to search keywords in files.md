<h1>scripts 1# use fs module to search keywords in files</h1>

### 场景:
### 固定的一组关键词, 需要判断关键字是否存在于文件中。

### 思路:
### 利用nodejs的fs模块获取指定路径下所有的以.json后缀名结尾的文件，读取内容并判断关键字是否存在于该文件中，如果存在，则返回该文件名。

### 实现:

```js
    const fs = require('fs');
    const path = require('path');

    const dir = ('./test/');
    const keyWord = []; //write yourself keyword here

    const dirents = fs.readdirSync(path.resolve(__dirname, dir), options={
        encoding:'utf8',
        withFileTypes: true
    });

    const direntsJsonSuffix = dirents.filter( (dirent) => dirent.name.endsWith('.json')).map( (dirent) => dirent.name);

    for (const d of direntJsonSuffix) {
        var contents = fs.readFileSync(path.resolve(__dirname, dir, d), options={
            encoding: 'utf8'
        });
        try{
            entries = Object.entries(eval('('+contents+')'));

            for( const [key, value] of entries) {
                if(keyWord.indexOf(key) != -1) {
                    console.log(`key word ${key} in lang file ${d}`);
                };
            }
        }catch(error){
            throw error;
        }
    }
```
