## 缤纷按钮效果

### 知识点

0. 学会配置 gulpfile 进行自动化构建
    I. 可使用 gulp-ruby-sass 进行编译
    II. 可使用 autoprefixer 保证 css 兼容性
    III. 可使用 gulp-plumber 监控错误
    IV. 可使用 minify Css & uglify Js 压缩Css/Js

1. 学会导入 svg 矢量图来保证图片清晰度

```css
background: url(../src/svg/thumb.svg);
```

[设置父级元素控制svg宽高](http://stackoverflow.com/questions/19484707/how-can-i-make-an-svg-scale-with-its-parent-container)

2. 学会使用 flex 布局居中按钮

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

```css
display: flex;
justify-content: center;
align-items: center;
```

3. 学会使用 Sass 进行简单的数学计算

4. 学会js 进行流程控制 （控制class进行动画切换）

```js
let control = Promise.resolve;

control.then(() => {
    // 第一幕动画
})
.then(() => {
    // 第二幕动画
})

function Sleep(timeout) {
    return new Promise(function(resolve) {
        setTimeout(function () {
            resolve();
        },timeout);
    });
}
```

5. 淡入淡出控制


提升部分：

6. 兼容移动端 使用rem 布局

```js
function rem() {
    document.documentElement.style.fontSize = (document.documentElement.clientWidth || document.documentElement.clientWidth) + 'px';
    
    document.body.style.fontSize = '16px';
};


rem();
window.addEventListener('resize', rem);
```

[【原创】移动端高清、多屏适配方案](http://www.html-js.com/article/3041)

7. 原生实现 tap 事件

[原生实现tap](http://tutorials.jenkov.com/responsive-mobile-friendly-web-design/touch-events-in-javascript.html)

```js
var theElement = document.getElementById("theElement");

theElement.addEventListener("mouseup", tapOrClick, false);
theElement.addEventListener("touchend", tapOrClick, false);

function tapOrClick(event) {
   //handle tap or click.

    event.preventDefault();
    return false;
}
```

## Caveat: 

1. 注意运动动画各幕情况（拇指先变花，花圈再运动，伴随花瓣跳动）

2. 点击过程中不允许动画重复播放（加锁）

3. 花瓣随机均匀分布

4. 不允许使用第三方动画库 以及jQuery (可以使用Babel+es6)