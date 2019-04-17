#  JsTricks

## 平滑滚动到顶部
``` javascript
/**
 @method 重力系数回到顶部
*/
~function goTop(){
 let delta = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
 delta && window.scrollBy(0, - delta / 9.8)
 delta && requestAnimationFrame(goTop)
}()

/**
 @description 页面垂直平滑滚动到指定滚动高度
 @author zhangxinxu(.com)
*/
var scrollSmoothTo = function (position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};

```

## 获取当前滚动位置
```js
/**
 * @param {Element} 当前元素 默认为window
 */
const getScrollPos = (el = window) =>
({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
// getScrollPos() -> {x: 0, y: 200}
```


##  缓动小算法

``` javascript
/**
 @description 缓动小算法
 @param {Number} start 开始位置
 @param {Number} end 结束位置
 @param {Number} rate 缓动速率
 @param {Function} callback 回调函数 参数为当前位置  
*/
function easeout(start,end,rate,callback){
    if(start == end || typeof start != 'number'){
        return;
    }
    end = end || 0;
    rate = rate || 2;
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame =function(fn){
            setTimeout(fn,17);
        }
    }
    var step = function(){
        start = start + (end-start)/rate;
        if(Math.abs(start-end)<1){
          callback && callback(end,true);
            return;
        }
        callback && callback(start,false);
        requestAnimationFrame(step);
    }
    step();
}
  
```

## 　复制到粘贴板

```javascript
/**
 @description 复制到粘贴板
 @param {String|Number} str 复制的内容
*/
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

```
## 每个单词首字母大写

``` js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
```

## 数组去重

```js
const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
```

## 范围内的随机整数

```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2
```

## RGB到十六进制
::: tip
使用按位左移运算符（<<）和toString（16），然后padStart（6，“0”）将给定的RGB参数转换为十六进制字符串以获得6位十六进制值。
:::

```js
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'
```

## UUID生成器
::: tip
使用crypto API生成符合RFC4122版本4的UUID。
:::

```js
 const uuid = _ =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
   );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'
```

## 深度对比是否相等
```js
/**
 * @method 比较两个对象或值是否完全相等
 * @param {Any} 
 * @param {Any}
 * @returns {Boolean} 是否相等
 */
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};
```


