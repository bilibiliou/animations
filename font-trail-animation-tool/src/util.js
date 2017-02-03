import Point from './Point.js';

/**
 * 判断点击区域是否在任意图形内
 * Long may the sun shine :)
 *
 * @author Owen
 * @email  ouyangxiangyue@baidu.com
 * @github github/numerhero
 * @date   2017-02-03
 * @param  {Array}                 shape 图形的个个点组成的坐标
 * @param  {Object}                 test 触点对象
 * @return {Boolean}                      是or否
 */
export let testInside = (shape, test) => {
    let result = false;

    for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
        if ((shape[i][1] > test[1]) != (shape[j][1] > test[1])
            && (test[0] < (shape[j][0] - shape[i][0]) * (test[1] - shape[i][1]) / (shape[j][1]-shape[i][1]) + shape[i][0])) {
          result = !result;
         }
    }

    return result;
}

/**
 * 判断点击区域是否在点内
 * Long may the sun shine :)
 *
 * @author Owen
 * @email  ouyangxiangyue@baidu.com
 * @github github/numerhero
 * @date   2017-02-03
 * @param  {Object}                 hitPoint 判断点对象
 * @param  {Number}                 x        触点x
 * @param  {Number}                 y        触点y
 * @return {Boolean}                         是否在点内
 */
export let testPointHit = (hitPoint, x, y) =>  {
    let r = hitPoint.r + hitPoint.bWeight;
    let dx = x - hitPoint.x;
    let dy = y - hitPoint.y;

    return Pow(r, 2) > Pow(dx, 2) + Pow(dy, 2);
}

/**
 * 以一个 点为圆心点， 获取另一个点到圆心点的逆时针方向的夹角度数
 * Long may the sun shine :)
 *
 * @author Owen
 * @email  ouyangxiangyue@baidu.com
 * @github github/numerhero
 * @date   2017-02-03
 * @param  {Number}                     x
 * @param  {Number}                     y
 * @param  {Number}                     x1
 * @param  {Number}                     y1
 * @return {Number}                    夹角度数
 */
export let getDeg = (x,y,x1,y1) => {
    let $x = x1 - x;
    let $y = y1 - y;

    let _$x = Abs($x);
    let h = Sqrt(Pow($x, 2) + Pow($y, 2));
    let _deg = Acos(_$x/h);

    let deg = 0;

    switch(true) {
        // 第一象限
        case ($x > 0 && $y <= 0):
            deg = _deg;
            break;
        // 第二象限
        case ($x <= 0 && $y < 0):
            deg = PI - _deg;
            break;
        // 第三象限
        case ($x < 0 && $y >= 0):
            deg = PI + _deg;
            break;
        // 第四象限
        case ($x >= 0 && $y > 0):
            deg = 2*PI - _deg;
            break;
    }
    return deg;
}