// 调用 Frame 渲染
export default () => requestAnimationFrame(() => {
    for (let i = 0; i<Control.points.length; i++) {
        Control.points[i].init();
    }
    
    for (let i = 0; i<Control.graphs.length; i++) {
        Control.graphs[i].draw();
    }    
});