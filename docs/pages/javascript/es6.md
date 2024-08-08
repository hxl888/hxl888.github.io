# es6
1.判断两个值是否相等(es6语法)：

```
Object.is(NAN, NAN); // true
Object.is(+0, -0 ); // false
+0 === -0; // true
```
2.es6 ``特殊用法：

```
let a = '哈哈';
let b = '呵呵';
 let c = func`你说${a}我说${b}！！`;
 func(strings, values) {
     console.log(strings); // 你说 我说   ！！！
     console.log(values); // 哈哈 呵呵
 }
```
3.Object.setPrototypeOf  和  __proto__

```
let dinner = {
    getDrink() {
        return '喝酒';
    }
};
let breakfast = {
    getDrink() {
        return '喝水吧还是';
    }
};
let sunday = Object.create(dinner);
console.log(Object.getPrototypeOf(sunday) === dinner); // true
Object.setPrototypeOf(sunday, breakfast);
console.log(Object.getPrototypeOf(sunday) === breakfast) // true
---------------------
let sundays = {
    __proto__: breakfast
};
console.log(sundays.getDrink()); // 喝水吧还是
console.log(Object.getPrototypeOf(sundays) === breakfast) // true

sundays.__proto__ = dinner;
console.log(sundays.getDrink()); // 喝酒
console.log(Object.getPrototypeOf(sundays) === dinner) // true

---------------------
let sundayss = {
    __proto__: breakfast,
    getDrink() {
        return super.getDrink() + '我是新来的!!';
    }
};
console.log(sundayss.getDrink()); // 喝水吧还是 我是新来的!!

```

4.iterators 迭代器

```
function chef(foods) {
    let i = 0;
    return {
        next() {
            let done = (i >= foods.length);
            let value = !done ? foods[i++] : undefined;
            return {
                value: value,
                done: done
            }
        }
    }
};
let examples = chef(['a', 'b']);
console.log(examples.next()); // value: 'a' done: false
console.log(examples.next()); // value: 'b' done: false
console.log(examples.next()); // value: undifined done: true
```


5.generators生成器

```
function* chef() {
    yield 'a'
    yield 'b'
};
let chefs = chef();
console.log(chefs.next()); // value: 'a' done: false
console.log(chefs.next()); // value: 'b' done: false
console.log(chefs.next()); // value: undefined done: true
```

6.class 类

```
class Chef {
    // 初始化用
    constructor(food) { 
        this.food = food;
        this.dish = [];
    }
    // 1****
    get menu() {
        return this.dish;
    }
    set menu(dish) {
        this.dish.push(dish);
    }
    // 2***
    cook() {
        console.log(this.food);
    }
    
    // 3****静态方法static
    static drink(foods) {
        console.log(foods);
    }
};
let chefs = new Chef('苹果');
chefs.cook();
chefs.menu = '橘子';
chefs.menu = '香蕉';
console.log(chefs.menu); // ["橘子", "香蕉"]

// 调取静态方法不需要实例化方法
Chef.drink('我不需要new实例化哈哈！！');

```

7.class 的继承

```
class Person {
    constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;
    }
    intro() {
        return `${this.name}, ${this.birthday}`;
    }
};

class Chef extends Person {
    constructor(name, birthday) {
        super(name, birthday);
    }
};

let example = new Chef('我啊', '666');
example.intro(); // "我啊, 666"

```

8.set 

```
let desserts = new Set('abc');
desserts.add('d');
console.log(desserts);

// 长度
console.log(desserts.size);

// 判断是否存在
console.log(desserts.has('a'));

// 删除单个数据
desserts.delete('d');
console.log(desserts);

// 清空所有数据
desserts.clear();
console.log(desserts);
```

9.Map

```
let food = new Map();
let fruit = {}, cook = function() {}, dessert = '甜点';

food.set(fruit, '香蕉');
food.set(cook, '苹果');
food.set(dessert, '菠萝');

console.log(food);
console.log(food.size);
console.log(food.get(fruit));
console.log(food.get(cook));
food.delete(dessert);
console.log(food.has(dessert));

food.forEach((value, key) => {
    console.log(`${key}= ${value}`);
});
```

10.export 导出的几中方法

```
    function dinner(name) {
        console.log(name);
    };
1. 
    export default function dinner(name) {
        console.log(name);
    };
    
2. 
    export default dinner;
    
3. 
    export {dinner as default}; 
    
4. 
    export {dinner};
```

