
* [素数分解](#素数分解)
* [整除](#整除)
    * [最大公约数最小公倍数](#最大公约数最小公倍数)
    * [生成素数序列](#生成素数序列)
        * [最大公约数](#最大公约数)
    * [使用位操作和减法求解最大公约数](#使用位操作和减法求解最大公约数)
* [进制转换](#进制转换)
    * [7 进制](#7-进制)
    * [16 进制](#16-进制)
    * [26 进制](#26-进制)
* [阶乘](#阶乘)
    * [统计阶乘尾部有多少个 0](#统计阶乘尾部有多少个-0)
* [字符串加法减法](#字符串加法减法)
    * [二进制加法](#二进制加法)
    * [字符串加法](#字符串加法)
* [相遇问题](#相遇问题)
    * [改变数组元素使所有的数组元素都相等](#改变数组元素使所有的数组元素都相等)
    * [解法 1](#解法-1)
    * [解法 2](#解法-2)
* [多数投票问题](#多数投票问题)
    * [数组中出现次数多于 n / 2 的元素](#数组中出现次数多于-n--2-的元素)
* [其它](#其它)
    * [平方数](#平方数)
    * [3 的 n 次方](#3-的-n-次方)
    * [乘积数组](#乘积数组)
    * [找出数组中的乘积最大的三个数](#找出数组中的乘积最大的三个数)


# 素数分解

每一个数都可以分解成素数的乘积，例如 84 = 2<sup>2</sup> \* 3<sup>1</sup> \* 5<sup>0</sup> \* 7<sup>1</sup> \* 11<sup>0</sup> \* 13<sup>0</sup> \* 17<sup>0</sup> \* …

# 整除

令 x = 2<sup>m0</sup> \* 3<sup>m1</sup> \* 5<sup>m2</sup> \* 7<sup>m3</sup> \* 11<sup>m4</sup> \* …

令 y = 2<sup>n0</sup> \* 3<sup>n1</sup> \* 5<sup>n2</sup> \* 7<sup>n3</sup> \* 11<sup>n4</sup> \* …

如果 x 整除 y（y mod x == 0），则对于所有 i，mi <= ni。

## 最大公约数最小公倍数

x 和 y 的最大公约数为：gcd(x,y) =  2<sup>min(m0,n0)</sup> \* 3<sup>min(m1,n1)</sup> \* 5<sup>min(m2,n2)</sup> \* ...

x 和 y 的最小公倍数为：lcm(x,y) =  2<sup>max(m0,n0)</sup> \* 3<sup>max(m1,n1)</sup> \* 5<sup>max(m2,n2)</sup> \* ...

## 生成素数序列

[204. Count Primes (Easy)](https://leetcode.com/problems/count-primes/description/)

埃拉托斯特尼筛法在每次找到一个素数时，将能被素数整除的数排除掉。

```js
function countPrimes(n) {
    var notPrimes = [];
    for (var i = 0; i < n+1; i++) {
        notPrimes.push(false);
    }

    var count = 0;
    for(var j = 2; j < n; j++) {
        if(notPrimes[j]) {
            continue;
        }
        count++;
        for(var k = j*j; k < n; k += j) {
            notPrimes[k] = true;
        }
    }
    return count;
}
```

```python
def notPrimes(n):
    notPrimes = [False for _ in range(n+1)]
    count = 0
    for i in range(2, n+1):
        if notPrimes[i]:
            continue
        count += 1
        for j in range(i*i, n+1, i):
            notPrimes[j] = True
    return count
```

### 最大公约数

```js
function gcd(a, b) {
    return b == 0? a :gcd(b, a%b);
}
```

```python
def gcd(a, b):
    return a if b == 0 else gcd(b, a%b)
```

最小公倍数为两数的乘积除以最大公约数。

```js
function lcm(a, b){
    return a*b/gcd(a, b)
}
```

```py
def lcm(a, b):
    return a*b//gcd(a, b)
```

## 使用位操作和减法求解最大公约数

[编程之美：2.7](#)

对于 a 和 b 的最大公约数 f(a, b)，有：

- 如果 a 和 b 均为偶数，f(a, b) = 2\*f(a/2, b/2);
- 如果 a 是偶数 b 是奇数，f(a, b) = f(a/2, b);
- 如果 b 是偶数 a 是奇数，f(a, b) = f(a, b/2);
- 如果 a 和 b 均为奇数，f(a, b) = f(b, a-b);

乘 2 和除 2 都可以转换为移位操作。

```js
function gcd(a,b) {
    //使用位操作和减法求最大公约数
    if(a<b) {
        return gcd(b,a);
    }

    if(b == 0) {
        return a;
    }

    function isEven(n){
        if(typeof n !== 'number')
            throw TypeError('Cannot pass non-number param');
        return n%2==0?true:false;
    }
    var isAEven = isEven(a),
        isBEven = isEven(b);
    
    if(isAEven && isBEven) {
        return 2*gcd(a>>1, b>>2);
    }else if(isAEven && !isBEven){
        return gcd(a>>1, b);
    }else if(!isAEven && isBEven){
        return gcd(a, b>>1);
    }else{
        return gcd(b, a-b);
    }
}
```

```py
def gcd(a, b):
    if b==0:
        return a
    if a < b:
        return gcd(b, a)
    isAEven = True if a%2==0 else False
    isBEven = True if b%2==0 else False

    if isAEven and isBEven:
        return 2*gcd(a>>2, b>>2)
    elif isAEven and not isBEven:
        return gcd(a>>2, b)
    elif isBEven and not isAEven:
        return gcd(a,b>>2)
    else:
        return gcd(a, a - b)
```

# 进制转换

## 7 进制

[504. Base 7 (Easy)](https://leetcode.com/problems/base-7/description/)

```js
function ConvertTo7(n) {
    if (n == 0) {
        return '0';
    }
    var str = [],
        isNegative = n < 0 ? true : false;
    n = isNegative ? -n : n;
    while (n > 0) {
        str.push(n % 7);
        n = Math.floor(n / 7);
    }

    return isNegative ? '-' + str.reverse().join('') : str.reverse().join('');
}
```

## 16 进制

[405. Convert a Number to Hexadecimal (Easy)](https://leetcode.com/problems/convert-a-number-to-hexadecimal/description/)

```html
Input:
26

Output:
"1a"

Input:
-1

Output:
"ffffffff"
```

负数要用它的补码形式。

```js
function ConvertTo16(n) {
    var map = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    ret = [];
    if(n == 0) {
        return 0;
    }
    while(n != 0) {
        ret.push(map[n & 0b1111]);
        n >>>= 4; // 因为考虑的是补码形式，因此符号位就不能有特殊的意义，需要使用无符号右移，左边填 0
    }
    return ret.reverse().join('');
}
```

## 26 进制

[168. Excel Sheet Column Title (Easy)](https://leetcode.com/problems/excel-sheet-column-title/description/)

```html
1 -> A
2 -> B
3 -> C
...
26 -> Z
27 -> AA
28 -> AB
```

因为是从 1 开始计算的，而不是从 0 开始，因此需要对 n 执行 -1 操作。

```js
function convertTo26(n) {
    if (n == 0) {
        return "";
    }
    n--;
    return convertTo26(Math.floor(n / 26)) + String.fromCharCode(n % 26 + 65);
}
```

# 阶乘

## 统计阶乘尾部有多少个 0

[172. Factorial Trailing Zeroes (Easy)](https://leetcode.com/problems/factorial-trailing-zeroes/description/)

尾部的 0 由 2 * 5 得来，2 的数量明显多于 5 的数量，因此只要统计有多少个 5 即可。

对于一个数 N，它所包含 5 的个数为：N/5 + N/5<sup>2</sup> + N/5<sup>3</sup> + ...，其中 N/5 表示不大于 N 的数中 5 的倍数贡献一个 5，N/5<sup>2</sup> 表示不大于 N 的数中 5<sup>2</sup> 的倍数再贡献一个 5 ...。

```js
function trailingZeroes(n) {
    return n == 0 ? 0 : Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5))
}
```

如果统计的是 N! 的二进制表示中最低位 1 的位置，只要统计有多少个 2 即可，该题目出自 [编程之美：2.2](#) 。和求解有多少个 5 一样，2 的个数为 N/2 + N/2<sup>2</sup> + N/2<sup>3</sup> + ...

# 字符串加法减法

## 二进制加法

[67. Add Binary (Easy)](https://leetcode.com/problems/add-binary/description/)

```html
a = "11"
b = "1"
Return "100".
```

```js
function addBinary(a, b) {
    //二进制加减从低位开始,i,j对应字符串索引的高位
    var i = a.length - 1,
        j = b.length - 1,
        carry = 0,
        ret = [];
    while (carry == 1 || i >= 0 || j >= 0) {
        if (i >= 0 && a.charAt(i--) == '1') {
            carry++
        }
        if (j >= 0 && a.charAt(j--) == '1') {
            carry++
        }

        ret.push(carry % 2);
        carry = Math.floor(carry / 2);
    }

    return ret.reverse().join('');
}
```

## 字符串加法

[415. Add Strings (Easy)](https://leetcode.com/problems/add-strings/description/)

字符串的值为非负整数。

```js
function addStrings(a, b) {
    var ret = [],
        i = a.length - 1,
        j = b.length - 1,
        carry = 0;
    while (carry == 1 || i >= 0 || j >= 0) {
        var x = i < 0 ? 0 : a.charAt(i--) - '0';
        var y = j < 0 ? 0 : b.charAt(j--) - '0';
        ret.push((x + y + carry) % 10);
        carry = Math.floor((x + y + carry) / 10);
    }

    return ret.reverse().join('');
}
```

# 相遇问题

## 改变数组元素使所有的数组元素都相等

[462. Minimum Moves to Equal Array Elements II (Medium)](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/description/)

```html
Input:
[1,2,3]

Output:
2

Explanation:
Only two moves are needed (remember each move increments or decrements one element):

[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
```

每次可以对一个数组元素加一或者减一，求最小的改变次数。

这是个典型的相遇问题，移动距离最小的方式是所有元素都移动到中位数。理由如下：

设 m 为中位数。a 和 b 是 m 两边的两个元素，且 b > a。要使 a 和 b 相等，它们总共移动的次数为 b - a，这个值等于 (b - m) + (m - a)，也就是把这两个数移动到中位数的移动次数。

设数组长度为 N，则可以找到 N/2 对 a 和 b 的组合，使它们都移动到 m 的位置。

## 解法 1

先排序，时间复杂度：O(NlogN)

```js
function minMoves2(num) {
    num.sort();
    var l = 0,
        h = num.length - 1,
        count = 0;
    while (l < h) {
        count += h - l;
        l++;
        h--;
    }
    return count;
}
```

## 解法 2

使用快速选择找到中位数，时间复杂度 O(N)

```js
function minMoves2(nums) {
    var move = 0,
        median = findKthSmallest(nums, nums.length >> 1);
    for (var num of nums) {
        move += Math.abs(num - median);
    }
    return move;
}

function findKthSmallest(nums, k) {
    var l = 0,
        h = nums.length - 1;
    while (l < h) {
        var j = partition(nums, l, h);
        if (j == k) {
            break;
        }
        if (j < k) {
            l = j + 1;
        } else {
            h = j - 1;
        }
    }
    return nums[k];
}

function partition(nums, l, h) {
    var i = l,
        j = h + 1;
    while (true) {
        while (nums[++i] < nums[l] && i < h);
        while (nums[--j] > nums[l] && j > l);
        if (i >= j) {
            break;
        }
        swap(nums, i, j);
    }
    swap(nums, l, j);
    return j;
}

function swap(num, i, j) {
    num[i] = num[i] ^ num[j];
    num[j] = num[i] ^ num[j];
    num[i] = num[i] ^ num[j];
}
```

# 多数投票问题

## 数组中出现次数多于 n / 2 的元素

[169. Majority Element (Easy)](https://leetcode.com/problems/majority-element/description/)

先对数组排序，最中间那个数出现次数一定多于 n / 2。

```js
function majorityElement(nums) {
    nums.sort();

    return nums[nums.length >> 1]
}
```

可以利用 Boyer-Moore Majority Vote Algorithm 来解决这个问题，使得时间复杂度为 O(N)。可以这么理解该算法：使用 cnt 来统计一个元素出现的次数，当遍历到的元素和统计元素不相等时，令 cnt--。如果前面查找了 i 个元素，且 cnt == 0，说明前 i 个元素没有 majority，或者有 majority，但是出现的次数少于 i / 2，因为如果多于 i / 2 的话 cnt 就一定不会为 0。此时剩下的 n - i 个元素中，majority 的数目依然多于 (n - i) / 2，因此继续查找就能找出 majority。

```js
function majorityElement(nums) {
    var cnt = 0,
        majority = 0;
    for (var num of nums) {
        if (cnt == 0) {
            majority = num;
        }
        if (majority == num) {
            cnt++;
        } else {
            cnt--;
        }
    }
    return majority;
}
```

# 其它

## 平方数

[367. Valid Perfect Square (Easy)](https://leetcode.com/problems/valid-perfect-square/description/)

```html
Input: 16
Returns: True
```

平方序列：1,4,9,16,..

间隔：3,5,7,...

间隔为等差数列，使用这个特性可以得到从 1 开始的平方序列。

```js
function isPerfectSquare(num) {
    var subNum = 1;
    while (num > 0) {
        num -= subNum;
        subNum += 2;
    }
    return num == 0;
}
```

## 3 的 n 次方

[326. Power of Three (Easy)](https://leetcode.com/problems/power-of-three/description/)

```js
function isPowerThree(n) {
    if(n===1) {
        return true;
    }

    if(n < 3 || n % 1 != 0 || n === 0){
        return false;
    }else {
        isPowerThree(n / 3)
    }
    //奇技淫巧
    //n是整形，1162261467是最大的3的n次方
    //return n>0&& 1162261467%n==0
}
```

## 乘积数组

[238. Product of Array Except Self (Medium)](https://leetcode.com/problems/product-of-array-except-self/description/)

```html
For example, given [1,2,3,4], return [24,12,8,6].
```

给定一个数组，创建一个新数组，新数组的每个元素为原始数组中除了该位置上的元素之外所有元素的乘积。

要求时间复杂度为 O(N)，并且不能使用除法。

```js
function productExceptSelf(nums) {
    var n = nums.length;
    var products = [];
    for (var i = 0; i < n; i++) {
        products.push(1);
    }
    
    var left = 1;
    for (var i = 1; i < n; i++) {
        left *= nums[i - 1];
        products[i] *= left;
    }

    var right = 1;
    for (var i = n - 2; i>=0; i--) {
        right *= nums[i + 1];
        products[i] *= right;
    }

    return products;
}
```

## 找出数组中的乘积最大的三个数

[628. Maximum Product of Three Numbers (Easy)](https://leetcode.com/problems/maximum-product-of-three-numbers/description/)

```html
Input: [1,2,3,4]
Output: 24
```

```js
function maximumProduct(nums) {
    var max1 = Number.MIN_VALUE,
        max2 = Number.MIN_VALUE,
        max3 = Number.MIN_VALUE,
        min1 = Number.MAX_VALUE,
        min2 = Number.MAX_VALUE;
    for (var num of nums) {
        if (num > max1) {
            max3 = max2;
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max3 = max2;
            max2 = num;
        } else if (num > max3) {
            max3 = num;
        }
        //console.log(`max1:${max1},max2:${max2},max3:${max3}`);

        if (num < min1) {
            min2 = min1;
            min1 = num;
        } else if (num < min2) {
            min2 = num;
        }
        //console.log(`min1:${min1},min2:${min2}`)
    }
    return Math.max(max1*max2*max3, max1*min1*min2);
}

//Input
// [1,2,3,4,5]
// Output
// => 
// max1:1,max2:5e-324,max3:5e-324
// min1:1,min2:1.7976931348623157e+308
// max1:2,max2:1,max3:5e-324
// min1:1,min2:2
// max1:3,max2:2,max3:1
// min1:1,min2:2
// max1:4,max2:3,max3:2
// min1:1,min2:2
// max1:5,max2:4,max3:3
// min1:1,min2:2
```

### 以上内容节选自[CS-Notes](https://github.com/CyC2018/CS-Notes),后面会继续补充相关主题的题目。
