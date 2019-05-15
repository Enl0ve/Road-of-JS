<h1>Google I/O 2019观后整理之What's new in javascript</h1>

> <h2>class fields</h2>

```js
//now
class IncreasingCounter{
    constructor(){
        this._count = 0;
    }

    get value() {
        console.log('Getting the current value');
        return this._count;
    }

    increament() {
        this._count++;
    }
}

//new class fields syntax can allow us to simply the definition 
class IncreasingCounter{
    //the property 'value' is public
    count = 0;

    get value() {
        console.log('Getting the current value');
        return this.count;
    }

    increament() {
        this.count++;
    }
}

//use the "#" symbol can make the property treated ad private
class IncreasingCounter{
    //the property 'value' is treated as private
    #count = 0;

    get value() {
        console.log('Getting the current value');
        return this.#count;
    }

    increament() {
        this.#count++;
    }
}


//subclass
//now
class Animal {
    constructor(name){
        this.name = name;
    }
}
/**
 * here you have to call `super()`, this likes a boilerplte
 * */
class Cat extends Animal{
    constructor(name){
        super(name);
        this.likesBaths = false;
    }

    meow() {
        console.log('Meow!')
    }
}

//luckily, the class field syntax removes the need for whole constructor
class Cat extends Animal{
    likesBaths = false;

    meow() {
        console.log('Meow!')
    }
}
```

> <h2>Regex</h2>

```js
    const string = 'Magic hex numbers: DEADBEF CAFE';
    const regex = /\b\p{ASCII_Hex_Digit}+\b/gu;

    for(const match of string.match(regex)) {
        console.log(match);
    }

    //Output:
    //'DEADBEEF'
    //'CAFE'

    /**
     * above, the output is just the match. If you want to more information, it's already possible to achieve that by writing your own loop and then keeping track of the match yourself
     **/
    let match;
    while(match = regex.exec(string)) {
        console.log(match);
    }

    //Output:
    //['DEADBEEF', index:19, input:"Magic hex numbers: DEADBEF CAFE"]
    //['CAFE', index:28, input:"Magic hex numbers: DEADBEF CAFE"]

    //but above may be annoy and just not very convenient
    //The new String#matchAll API makes this easier than before
    for (const match of string.matchAll(regex)) {
        consoel.log(match);
    }

    //Output:
    //['DEADBEEF', index:19, input:"Magic hex numbers: DEADBEF CAFE"]
    //['CAFE', index:28, input:"Magic hex numbers: DEADBEF CAFE"]

    //that API is especially useful for regular experssions with capture groups
    const string = 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev';
    const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;
    for (const match of string.matchAll(regex)) {
        console.log(`${match[0]} at ${match.index} with ${match.input}`);
        console.log(`owner: ${match.groups.owner}`);
        console.log(`repo: ${match.groups.repo}`);
    }

    //Output:
    //tc39/ecma262 at 23 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'
    //owner: tc39
    //repo: ecma262
    //v8/v8.dev at 36 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'
    //owner: v8
    //repo: v8.dev
```
> <h3 styles="color:red">Note: the String#MatchAll API has support in chrome, firefox, nodejs. And in other browsers, a pollfill is available.</h3>

> <h2>Numberic</h2>

```js
    /**
    * largest number is difficult for human to read
    * such as:
    *     10000000000000, 1019436871.42
    * To improve readability, a new JavaScript feature enables underscore as separators in numeric literals  
    **/

    // grouping the digits three thousands
    //supported in Chrome 75, and transpliers like Babel
    1_000_000_000_000, 1_019_436_871.42 

    //e.g
    1234567890123456789 * 123;
    // → 151851850485185200000
    // above results is not right obviously.
    //BigInt(2018)
    1234567890123456789n * 123n;
    // → 151851850485185185047n

    //what happend compare to last year?
    //now we can format a BigInt in a Locale-aware manner by using the 'toLocalString()'
    12345678901234567890n.toLocaleString('en'); //slow like snail
    // → '12,345,678,901,234,567,890'
    12345678901234567890n.toLocaleString('de'); //slow like snail
    // → '12.345.678.901.234.567.890'

    const nf = new Intl.NumberFormat('fr');
    nf.format(12345678901234567890n); //fast like rocket
    // → '12 345 678 901 234 567 890'

    //now we can write above like this:
    12_345_678_901_234_567_890n.toLocaleString('en'); //slow like snail
    // → '12,345,678,901,234,567,890'
    12_345_678_901_234_567_890n.toLocaleString('de'); //slow like snail
    // → '12.345.678.901.234.567.890'

    const nf = new Intl.NumberFormat('fr');
    nf.format(12_345_678_901_234_567_890n); //fast like rocket
    // → '12 345 678 901 234 567 890'
```
> <h3 styles="color:red">Note: the BigInt has support in chrome, firefox Nightly, nodejs. And in other browsers, a pollfill called JSBI is available.</h3>

> <h2>Array#flat & flatMap</h2>

```js
    /**
    * function:flat
    * @description: return a flattened(扁平的) version of a given array
    **/
    //flatten one level
    const array = [1, [2, [3]]];
    arry.flat();
    // → [1, 2, [3]]

    //flatten recursively until the array contains no more nested arrays
    array.flat(Inifinity);
    // → [1, 2, 3]

    const duplicate = x => [x, x];

    [1, 2, 3].map(duplicate);
    // → [[1, 1], [2, 2], [3, 3]]
    [1, 2, 3].map(duplicate).flat();
    // → [1, 1, 2, 2, 3, 3]

    [1, 2, 3].flatMap(duplicate); //more effective
    // → [1, 1, 2, 2, 3, 3]
```
> <h3 styles="color:red">Note: the API Array#flat & flatMap has support in chrome, firefox, safari, nodejs. And in other browsers, a pollfill called JSBI is available.</h3>

> <h2>Object#fromEntries</h2>

```js
    //Obejct.entries
    const object = {'x':50, 'y':40};
    const entries = Object.entries(object);
    // → [['x': 50], ['y': 40]]

    for (const [key, value] of entries) {
        console.log(`The value of ${key} is ${value}`);
    }
    //Logs:
    //The value of x is 50
    //The value of y id 40

    //reconstruct 
    const object2 = {'x':50, 'y':40, 'abc':100};
    const result = Object.fromEntries(
        Object.entries(object2)
                .fliter(([key, value]) => key.length >= 1)
                .map(([key, value]) => [key, value * 2])
    );
    // → {'x':100, 'y':80}

    //convert the object into a map
    const map = new Map(Object.entries(object));

    //convert the map back into a object
    const object = Object.fromEntries(map);
```

> <h2>global this</h2>

```js
    const getGlobalThis = () => {
        if(typeof self !== 'undefined') return self;
        if(typeof window !== 'undefined') return window;
        if(typeof global !== 'undefined') return global;
        if(typeof this !== 'undefined') return this;
        throw new Error('Unable to locate global object');
    }
    const theGlobalThis = getGlobalThis();
    //above conditions can't wrap all envirnment

    //so 'globalThis' occurs
    const theGlobalThis = globalThis
```

> <h2>Intl</h2>

```js
    const rtf = new Intl.RelativeTimeFormat('en', {numeric:'atuo'});

    rtf.format(-1, 'week');
    // → 'last week'
    rtf.format(0 , 'week');
    // → 'this week'
    rtf.format(1, 'week');
    // → 'next week'
    rtf.format(-1, 'day');
    // → 'yesterday'
    rtf.format(0, 'day');
    // → 'today'
    rtf.format(1, 'day');
    // → 'tomorrow'


    /**
    * Intl.DateTimeFormat#formatRange
    * @description: provides a convenient way of formatting ranges in a locale-specific manner
    **/
    //below examples create two dates and print the data range using 'DateTimeFormat' API which is an existing API that has been shipping in
    const start = new Date(startTimestamp);
    // → 'May 7, 2019'
    const end = new Date(endTimestamp);
    // → 'May 9, 2019'
    const fmt = new Intl.DateTimeFormat('en', {
        year: 'numberic',
        month: 'long',
        day: 'numberic'
    })
    const output = `${fmt.format(start)} - ${fmt.format(end)}`;
    // → 'May 7, 2o19 - May 9, 2019'

    const output2 = fmt.formatRange(start, end);
    // → 'May 7 - 9, 2019'

    /**
    * Intl.Local
    **/
    const locale = new Intl.Locale('es-419-u-hc-h12', {
        calendar: 'gregory'
    });
    locale.language
    // → 'es'
    locale.region
    // → '419'
    locale.hourCycle
    // → 'h12'
    locale.calendar
    // → 'gregory'
    locale.toString();
    // → 'es-419-u-ca-gregory-hc-h12'
```
> <h3 styles="color:red">Note: the API has support in chrome, nodejs.</h3>

> <h2>Promise</h2>

```js
    //Promise add two methods：Promise.allSettled() & Promise.any
    const promises = [
        fetch('/api-call-1'),
        fetch('/api-call-2'),
        fetch('/api-call-3')
    ]

    Promise.allSettled(promises);
    //Promise.allSettled gives you a singal when all of the input promises are settled, and that means they're either fulfilled or rejected. This is uesful in those cases where you don't really care about the state of the promise-you just want to know when the work is done, regardless of whether it was successful.

    //Promise.any() is not supported, but the other hand, Promise.allSetted() has supported in Chrome 76, FireFox Nightly. For other browsers, a polyfill is available. 
```