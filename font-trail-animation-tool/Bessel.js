import Curve from './src/Curve.js';
import loaderPanle from './src/panle.js';
import render from './src/GlobalRender.js';
import {testPointHit, getDeg} from './src/util.js';
import {AnimateCurve} from './src/Animation.js';
loaderPanle();

let moused = (ev) => {
    let bRect = oC.getBoundingClientRect();
    // 当通过css 设置画布宽高的时候，就会导致画布被拉伸， 所以需要乘以相应的比例
    let px = (ev.pageX - bRect.left)*(oW/bRect.width);
    let py = (ev.pageY - bRect.top)*(oH/bRect.height);
    
    // 记录被点击的元素
    let ele = null;
    let flag = 0;

    // 查找被点击的元素
    for (let i = 0; i<Control.points.length; i++) {
        ele = Control.points[i];
        if (flag = testPointHit(Control.points[i], px, py)) {
            // 如果有被点击到的元素 将其层级提升
            Control.points.unshift(Control.points.splice(i, 1)[0]);
            break;
        }
    }

    if (flag) {
        // 记录下需要解除绑定的函数 该函数耦合了需要移动的元素
        let whichNeedDel = mousem.bind(this, ele);
        oC.addEventListener('mousemove', whichNeedDel);
        oC.addEventListener('mouseup', mouseup.bind(this, whichNeedDel));
    }
}

let mousem = (P, ev) => {
    ctx.clearRect(0, 0, oW, oH);
    let bRect = oC.getBoundingClientRect();
    let dsx = (ev.pageX - bRect.left)*(oW/bRect.width);
    let dsy = (ev.pageY - bRect.top)*(oH/bRect.height);
    let aP = P.associatePoint;
    
    // 不同种类的控制点 做不同处理
    switch (P.type) {
        case 'circularCenterPoint':
            let betax = dsx - P.x;
            let betay = dsy - P.y;

            for (let i = 0; i<aP.length; i++) {
                aP[i].x += betax;
                aP[i].y += betay;
            }

            P.x = dsx;
            P.y = dsy;
            break;
        case 'sp':
        case 'ep':
            let O = aP[0];
            let deg = getDeg(O.x, O.y, dsx, dsy);

            P.beta = deg;
            P.x = O.x + P.graph.a * Cos(deg);
            P.y = O.y - P.graph.b * Sin(deg);
            break; 
        default:
            P.x = dsx;
            P.y = dsy;
    }

    render();
}

let mouseup = (Del, ev) => {
    oC.removeEventListener('mouseup', mouseup);
    oC.removeEventListener('mousemove', Del);
}

oC.addEventListener('mousedown', moused);
window.addEventListener('resize', () => {
    oC.width = innerWidth;
    oC.height = innerHeight;
    render();
})