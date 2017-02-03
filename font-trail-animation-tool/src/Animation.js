import * as EASE from './easing.js';

let Vrender = (index) => {
    if(index === Control.graphs.length) {
        ISANIMATING = 0; // 结束动画
        return;
    }
    if(index === 0) {
        ctx.clearRect(0, 0, oW, oH);        
    }

    let Curve = Control.graphs[index];
    let timeout = Curve.timeout || 100;
    let temp = 0
    let ease = EASE[Curve.ease];

    // 动画 起始时间
    let start = Date.now();    

    Curve.t = 0;
    Curve.isAnimating = true;
    Curve.isEdit = false;

    requestAnimationFrame(render);
    
    function render () {
        let now = Date.now();
        let percent = (now - start) / timeout; // 当前运动百分比
        let easePercent = ease(percent) // 时间线已经 到达的百分比
        
        if (easePercent >= 1) {
            easePercent = 1;
        }
        
        Curve.t = easePercent;
        Curve.draw();

        if (easePercent < 1) {
            requestAnimationFrame(render);
        } else {
            Curve.isAnimating = false;
            Vrender(index+1);
        }
    }
}

export default Vrender;