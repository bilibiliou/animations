import dat from './dat.gui.min.js';
import Curve from './Curve.js';
import Circular from './Circular.js';
import animate from './Animation.js';
import * as EASE from './easing.js';

export default () => {
    let gui = new dat.gui.GUI();

    ControlData['new curve'] = () => {
        if(ISANIMATING) return;
        ctx.clearRect(oW, oH, 0, 0);

        let cg = Control.graphs
        Control.points = [];

        for (let i = 0; i<cg.length; i++) {
            cg[i].isEdit = false;
        }

        new Curve({
            n: ControlData.dimension,
            ease: ControlData['Time Function'],
            timeout: ControlData['Timeout(ms)'],
            pointColor: ControlData['point color'],
            lineColor: ControlData['curve color'],
            fontColor: ControlData['font color'],
            lineWidth: ControlData['curve weight']
        })
    }

    ControlData['new circular'] = () => {
        if(ISANIMATING) return;
        ctx.clearRect(oW, oH, 0, 0);

        let cg = Control.graphs;
        Control.points = [];
        
        for (let i = 0; i<cg.length; i++) {
            cg[i].isEdit = false;
        }

        new Circular({
            shortAxis: ControlData['short axis'],
            longAxis: ControlData['long axis'],
            timeout: ControlData['Timeout(ms)'],
            pointColor: ControlData['point color'],
            lineColor: ControlData['curve color'],
            fontColor: ControlData['font color'],
            clockWise: ControlData['clockwise'],
            lineWidth: ControlData['curve weight']
        })
    }

    ControlData['animate'] = () => {
        if (ISANIMATING) return;
        if(Control.graphs.length) {
            ISANIMATING = 1;
            animate(0);
        } else {
            alert('Please new a graph firstly!');
        }
    }

    ControlData['redraw'] = () => {
        if (ISANIMATING) return;
        ctx.clearRect(0, 0, oW, oH);
        note = 1;
        Control = {
            points: [],
            graphs: [],
            nowEdit: null
        };
    }

    // bessel curve
    gui.remember(ControlData);
    let curveFolder = gui.addFolder('curve folder');
        
    let curveParam = curveFolder.addFolder('curve params');
    curveParam.add(ControlData, 'dimension').min(1).step(1).max(10).onChange((value) => {
        ControlData['n'] = value;
    });

    curveParam.open();
    
    let curveStyle = curveFolder.addFolder('curve style');
    curveStyle.addColor(ControlData, 'point color').onChange((color) => {
        ControlData['point color'] = color;
    });
    
    curveStyle.addColor(ControlData, 'curve color').onChange((color) => {
        ControlData['curve color'] = color;
    });
    curveStyle.open();

    // circular
    let circularFolder = gui.addFolder('circular folder');

    let circularParam = circularFolder.addFolder('circular param');
    circularParam.add(ControlData, 'short axis').min(50).step(10).max((oH - 10)/2).onChange((value) => {
        ControlData['short axis'] = value;
    });

    circularParam.add(ControlData, 'long axis').min(50).step(10).max((oH - 10)/2).onChange((value) => {
        ControlData['long axis'] = value;
    });

    circularParam.addColor(ControlData, 'circular color').onChange((value) => {
        ControlData['circular color'] = value;
    });

    circularParam.add(ControlData, 'clockwise');
    circularParam.open();

    // gui golbal
    gui.addColor(ControlData, 'font color').onChange((color) => {
        ControlData['font color'] = color;
    });

    gui.add(ControlData, 'curve weight').min(2).step(1).max(20).onChange((value) => {
        ControlData['curve weight'] = value;
    })
    gui.add(ControlData, 'Time Function', Object.keys(EASE)).onChange((value) => {
        ControlData['Time Function'] = value;
    });

    gui.add(ControlData, 'Timeout(ms)').min(100).step(10).max(10000).onChange((value) => {
        ControlData['Timeout(ms)'] = value;
    })
    gui.add(ControlData, 'new curve');
    gui.add(ControlData, 'new circular');

    gui.add(ControlData, 'animate');
    gui.add(ControlData, 'redraw');
    
}
