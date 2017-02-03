import Point from './Point.js';

class BesselCurve {
    constructor(opt) {
        this.type = 'besselCurve';
        this.controlPoints = [];
        this.inputPoints = opt.inputPoints || [];
        this.t = 1;
        this.n = opt.n;
        this.isEdit = true;
        this.isdraw = 0;
        this.isAnimating = false;
        this.index = Control.graphs.length - 1;
        this.lineWidth = opt.lineWidth;
        this.lineColor = opt.lineColor || 'yellow';
        this.pointColor = opt.pointColor;
        this.fontColor = opt.fontColor;
        this.ease = opt.ease || 'linear';
        this.timeout = opt.timeout;

        if (this.inputPoints.length !== 0 && this.inputPoints.length !== this.n+1) {
            this.n = this.inputPoints.length - 1;
            console.error(`位置控制点个数必等于维度+1`);
        }

        this.init();
    }

    init() {
        let self = this;
        self.bulidPoints();
        self.draw();
        Control.graphs.push(this);
    }

    bulidPoints() {
        let self = this;
        let iP = self.inputPoints;
        let bC = self.pointColor;
        let fC = self.fontColor;

        for (let i = 0; i<self.n + 1; i++) {
            let lx = oW/2;
            let ly = oH/2;
            
            if (iP.length) {
                lx = iP[i].x;
                ly = iP[i].y;
            }

            self.controlPoints.push(
                new Point({
                    type: 'besselCurvePoint',
                    x: lx,
                    y: ly,
                    r: 5,
                    graph: self,
                    bcolor: `rgba(${~~bC[0]},${~~bC[1]},${~~bC[2]},${~~bC[3]})`,
                    fontColor: `rgba(${~~fC[0]},${~~fC[1]},${~~fC[2]},${~~fC[3]})`,
                    bWeight: 3,
                    notesText: `p${note++}`,
                    font: '15px Microsoft YaHei'
                })
            );

            Control.points.push(self.controlPoints[i]);
        }
    }

    // 绘制曲线
    draw() {
        let self = this;
        let p = self.controlPoints;
        let t = self.t;
        let n = self.n;

        let dx = [];
        let dy = [];

        dx.push(p[0].x)
        for (let i = 1; i<=n; i++) {
            let dtemp = 0;
            for (let j = i; j>1; j--) {
                dtemp += dx[j-1];
            }

            if (i >= n) {
                dx.push(p[n].x - p[0].x - dtemp);
            } else {
                dx.push(n * (p[i].x - p[i-1].x) - dtemp);
            }           
        }

        dy.push(p[0].y)
        for (let i = 1; i<=n; i++) {
            let dtemp = 0;
            for (let j = i; j>1; j--) {
                dtemp += dy[j-1];
            }

            if (i >= n) {
                dy.push(p[n].y - p[0].y - dtemp);
            } else {
                dy.push(n * (p[i].y - p[i-1].y) - dtemp);
            }           
        }

        ctx.beginPath();
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = `rgba(${~~this.lineColor[0]},
                                ${~~this.lineColor[1]},
                                ${~~this.lineColor[2]},
                                ${~~this.lineColor[3]})`;

        for (let i = 0; i<=t; i+=.005) {
            let lx = 0;
            let ly = 0;

            for (let j=dx.length - 1; j>=0; j--) {
                lx += dx[j] * Pow(i, j);
                ly += dy[j] * Pow(i, j);
            }

            ctx.lineTo(lx, ly);
            ctx.stroke(); 
        }

        // 弥补绘图误差
        if (t === 1) {
            ctx.lineTo(p[n].x, p[n].y);
            ctx.stroke();
        }

        ctx.restore();

        // 输出线的曲线位置
        // self.printPosition();
    }

    printPosition() {
        let self = this;
        let str = '[';
        let n = self.n;
        let cp = self.controlPoints;
        for (let i = 1; i<=cp.length; i++) {
            str += `{x: ${cp[i - 1].x}, y: ${cp[i - 1].y}},`
        }

        str += ']'
        console.info(str);
    }

    changeControlPointState() {
        let self = this;

        if (self.isEdit) {
            Control.points = self.controlPoints;
        }
    }
}

export default BesselCurve;