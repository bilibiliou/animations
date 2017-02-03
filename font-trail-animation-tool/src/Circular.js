import Point from './Point.js';
import {getDeg} from './util.js';

class Circular {
    constructor(opt) {
        this.type = 'circular';
        this.controlPoints = []; // 第一个是圆心， 第二个为圆弧起始点， 第三个为终点
        this.inputPoints = opt.inputPoints || [];
        this.a = opt.shortAxis;
        this.b = opt.longAxis;
        this.t = 1;
        this.isEdit = true;
        this.isAnimating = false;
        this.clockWise = opt.clockWise; // 是否顺时针
        this.index = Control.graphs.length - 1;
        this.lineWidth = opt.lineWidth;
        this.lineColor = opt.lineColor;
        this.pointColor = opt.pointColor;
        this.fontColor = opt.fontColor;
        this.ease = opt.ease || 'linear';
        this.timeout = opt.timeout;   
        this.init();
    }

    buildPoints() {
        let self = this;
        let iP = self.inputPoints;
        let bC = self.pointColor;
        let fC = self.fontColor;
        let clockWise = self.clockWise;

        let param = {
            type: 'circularPoint',
            r: 5,
            bcolor: `rgba(${~~bC[0]},${~~bC[1]},${~~bC[2]},${~~bC[3]})`,
            fontColor: `rgba(${~~fC[0]},${~~fC[1]},${~~fC[2]},${~~fC[3]})`,
            bWeight: 3,
            graph: self,
            font: `15px Microsoft YaHei`
        };

        let sp;
        let ep;
        let o;

        sp = new Point(Object.assign(param, {
            type: 'sp',
            x: oW/2 + self.a,
            y: oH/2 ,
            notesText: `sp`
        }))

        ep = new Point(Object.assign(param, {
            type: 'ep',
            x: oW/2,
            y: oH/2 - self.b,
            notesText: `ep`
        }))

        o = new Point(Object.assign(param, {
            type: 'circularCenterPoint',
            associatePoint: [sp, ep],
            x: oW/2,
            y: oH/2,
            notesText: `o`
        }))

        // 计算初始beta 值
        sp.beta = getDeg(o.x, o.y, sp.x, sp.y);
        ep.beta = getDeg(o.x, o.y, ep.x, ep.y);

        ep.associatePoint = sp.associatePoint = [o];
        self.controlPoints = [sp,ep,o];
        Control.points = self.controlPoints;
    }

    draw() {
        let self = this;
        let beta = self.beta;
        let t = self.t;
        let p = self.controlPoints;
        let a = self.a;
        let b = self.b;

        let sp;
        let ep;
        let op;

        for(let i = 0; i<p.length; i++) {
            let t = p[i]
            if(t.type === 'sp') sp = t;
            if(t.type === 'ep') ep = t;
            if(t.type === 'circularCenterPoint') op = t;
        }

        let betas = sp.beta;
        let betae = ep.beta;

        
        ctx.beginPath();
        ctx.save();

        ctx.lineWidth = self.lineWidth;
        ctx.strokeStyle = `rgba(${~~self.lineColor[0]},
                                ${~~self.lineColor[1]},
                                ${~~self.lineColor[2]},
                                ${~~self.lineColor[3]})`;
        if (!self.clockWise) {
            if (betae < betas) {
                betae += 2*PI;
            }

            for (let i = betas; i<=betae*t; i+= 1 / (8*PI)) {
                ctx.lineTo(
                    op.x + a * Cos(i),
                    op.y - b * Sin(i)
                )

                ctx.stroke();
            }
        } else {
            // 下移区间
            betae -= 2*PI;
            betas -= 2*PI;
            if (betae > betas) {
                betae -= 2*PI;
            }

            for (let i = betas; i>=betae*t; i-= 1 / (8*PI)) {
                ctx.lineTo(
                    op.x + a * Cos(i),
                    op.y - b * Sin(i) 
                )

                ctx.stroke();
            }
        }

        if (t === 1) {
            ctx.lineTo(
                op.x + a * Cos(betae),
                op.y - b * Sin(betae)
            )

            ctx.stroke();
        }
        ctx.restore();
    }

    init() {
        let self = this;
        self.buildPoints();
        self.draw();
        Control.graphs.push(this);
    }
}

export default Circular;