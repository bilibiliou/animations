class Point {
    constructor(opt) {
        this.type = opt.type;
        this.x = opt.x;
        this.y = opt.y;
        this.associatePoint = opt.associatePoint || [];

        this.graph = opt.graph;
        this.beta = 0;  // 针对圆曲线
        this.bcolor = opt.bcolor;
        this.r = opt.r;
        this.bWeight = opt.bWeight;
        this.notesText = opt.notesText;
        this.font = opt.font;
        this.fontColor = opt.fontColor;
        this.isshow = true;
        this.init();
    }

    init(fontGap=this.r * 0.35) {
        var self = this;
        ctx.beginPath();
        ctx.save();
        
        ctx.strokeStyle = self.bcolor;
        ctx.lineWidth = self.bWeight;
        ctx.arc(self.x, self.y, self.r, 0, 2*PI);
        
        if (self.notesText) {
            ctx.font = self.font;
            ctx.fillStyle = self.fontColor;
            var fGap = fontGap +　self.r;
            ctx.fillText(self.notesText, self.x + fGap, self.y - fGap);
        }
        ctx.stroke();
        ctx.restore();
    }
}

export default Point;