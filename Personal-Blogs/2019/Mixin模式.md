> ### 介绍
#### mixin模式就是一些提供能够被一个或者一组子类简单继承功能的类,意在重用其功能。在面向对象的语言中，我们会通过接口继承的方式来实现功能的复用。但是在javascript中，我们没办法通过接口继承的方式，但是我们可以通过javascript特有的原型链属性，将功能引用复制到原型链上，达到功能的注入。

> ### 代码实现

```js
    function Mixin(recClass, giveClass) {
        if (arguments.length > 2) {
            for (let i = 2; i < arguments.length; i++) {
                recClass.prototype[arguments[i]] = giveClass.prototype[arguments[i]];
            }
        } else {
            for (let property in giveClass.prototype) {
                recClass.prototype[property] = giveClass.prototype[property];
            }
        }
    };
```

> ### 实例

```js
    function Car(name, speed){
        this.name = name;
        this.speed = speed;
    }

    Car.prototype.now = function() {
        console.log(this.name,this.speed);
    }

    Car.prototype.limit = function() {
        console.log('speed limit 120km/h')
    }

    Car.prototype.drive = function() {
        console.log('Car can drive');
    }

    function Future() {

    }

    Future.prototype.fly = function() {
        console.log('Car can fly in future');
    }
    
    Future.prototype.limit = function() {
        console.log('speed not limit');
    }

    var car = new Car('ferrari', 80);
    car.now();
    car.limit();
    car.drive();

    Mixin(Car, Future);

    var carFuture = new Car('future', 200);
    carFuture.now();
    carFuture.limit();
    carFuture.drive();
    carFuture.fly();

    //=>
    // ferrari 80
    // speed limit 120km/h
    // Car can drive

    // future 200
    // speed not limit
    // Car can drive
    // Car can fly in future
```

```js
    Mixin(Car, Future, 'fly');
    var car = new Car('ferrari', 80);
    car.now();
    car.limit();
    car.drive();

    Mixin(Car, Future);

    var carFuture = new Car('future', 200);
    carFuture.now();
    carFuture.limit();
    carFuture.drive();
    carFuture.fly();

    //=>
    // ferrari 80
    // speed limit 120km/h
    // Car can drive

    // future 200
    // speed limit 120km/h
    // Car can drive
    // Car can fly in future    
```

> ### 优缺比较

### Mixin支持在一个系统中降解功能的重复性,增加功能的重用性.在一些应用程序也许需要在所有的对象实体共享行为的地方,我们能够通过在一个Mixin中维护这个共享的功能,来很容易的避免任何重复,而因此专注于只实现我们系统中真正彼此不同的功能。

### 也就是说,对Mixin的副作用是值得商榷的.一些开发者感觉将功能注入到对象的原型中是一个坏点子,因为它会同时导致原型污染和一定程度上的对我们原有功能的不确定性.在大型的系统中,很可能是有这种情况的。
