var oC = document.querySelector('.oC');
var ctx = oC.getContext('2d');
var M = Math;
var Cos = M.cos;
var Sin = M.sin;
var Acos = M.acos;
var Abs = M.abs;
var Pow = M.pow;
var Sqrt = M.sqrt;
var PI = M.PI;

var oW = innerWidth;
var oH = innerHeight;

var ISANIMATING = 0;
// 全局标记
var note = 1;

// 控制栈
var Control = {
    points: [],
    graphs: [],
    nowEdit: null
};

oC.width = oW;
oC.height = oH;

// 控制数据
function data () {
    // curve set
    this['dimension'] = 1;
    this['point color'] = [0, 128, 255, 1];
    this['curve color'] = [0, 128, 255, 1];
    this['new curve'] = null;

    // circular set
    this['short axis'] = 50;
    this['long axis'] = 50;
    this['circular color'] = [0, 128, 255, 1];
    this['clockwise'] = true;
    this['new circular'] = null;

    // global set    
    this['Time Function'] = 'linear';
    this['font color'] = [0, 128, 255, 1];
    this['curve weight'] = 2;
    this['Timeout(ms)'] = 1000;
    this['animate'] = null;
    this['redraw'] = null;
}

var ControlData = new data(); 