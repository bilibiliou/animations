webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Curve = __webpack_require__(2);

	var _Curve2 = _interopRequireDefault(_Curve);

	var _panle = __webpack_require__(4);

	var _panle2 = _interopRequireDefault(_panle);

	var _GlobalRender = __webpack_require__(11);

	var _GlobalRender2 = _interopRequireDefault(_GlobalRender);

	var _util = __webpack_require__(8);

	var _Animation = __webpack_require__(9);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	(0, _panle2.default)();

	var moused = function moused(ev) {
	    var bRect = oC.getBoundingClientRect();
	    // 当通过css 设置画布宽高的时候，就会导致画布被拉伸， 所以需要乘以相应的比例
	    var px = (ev.pageX - bRect.left) * (oW / bRect.width);
	    var py = (ev.pageY - bRect.top) * (oH / bRect.height);

	    // 记录被点击的元素
	    var ele = null;
	    var flag = 0;

	    // 查找被点击的元素
	    for (var i = 0; i < Control.points.length; i++) {
	        ele = Control.points[i];
	        if (flag = (0, _util.testPointHit)(Control.points[i], px, py)) {
	            // 如果有被点击到的元素 将其层级提升
	            Control.points.unshift(Control.points.splice(i, 1)[0]);
	            break;
	        }
	    }

	    if (flag) {
	        // 记录下需要解除绑定的函数 该函数耦合了需要移动的元素
	        var whichNeedDel = mousem.bind(undefined, ele);
	        oC.addEventListener('mousemove', whichNeedDel);
	        oC.addEventListener('mouseup', mouseup.bind(undefined, whichNeedDel));
	    }
	};

	var mousem = function mousem(P, ev) {
	    ctx.clearRect(0, 0, oW, oH);
	    var bRect = oC.getBoundingClientRect();
	    var dsx = (ev.pageX - bRect.left) * (oW / bRect.width);
	    var dsy = (ev.pageY - bRect.top) * (oH / bRect.height);
	    var aP = P.associatePoint;

	    // 不同种类的控制点 做不同处理
	    switch (P.type) {
	        case 'circularCenterPoint':
	            var betax = dsx - P.x;
	            var betay = dsy - P.y;

	            for (var i = 0; i < aP.length; i++) {
	                aP[i].x += betax;
	                aP[i].y += betay;
	            }

	            P.x = dsx;
	            P.y = dsy;
	            break;
	        case 'sp':
	        case 'ep':
	            var O = aP[0];
	            var deg = (0, _util.getDeg)(O.x, O.y, dsx, dsy);

	            P.beta = deg;
	            P.x = O.x + P.graph.a * Cos(deg);
	            P.y = O.y - P.graph.b * Sin(deg);
	            break;
	        default:
	            P.x = dsx;
	            P.y = dsy;
	    }

	    (0, _GlobalRender2.default)();
	};

	var mouseup = function mouseup(Del, ev) {
	    oC.removeEventListener('mouseup', mouseup);
	    oC.removeEventListener('mousemove', Del);
	};

	oC.addEventListener('mousedown', moused);
	window.addEventListener('resize', function () {
	    oC.width = innerWidth;
	    oC.height = innerHeight;
	    (0, _GlobalRender2.default)();
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	var _Point = __webpack_require__(3);

	var _Point2 = _interopRequireDefault(_Point);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var BesselCurve = function () {
	    function BesselCurve(opt) {
	        _classCallCheck(this, BesselCurve);

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

	        if (this.inputPoints.length !== 0 && this.inputPoints.length !== this.n + 1) {
	            this.n = this.inputPoints.length - 1;
	            console.error("\u4F4D\u7F6E\u63A7\u5236\u70B9\u4E2A\u6570\u5FC5\u7B49\u4E8E\u7EF4\u5EA6+1");
	        }

	        this.init();
	    }

	    _createClass(BesselCurve, [{
	        key: 'init',
	        value: function init() {
	            var self = this;
	            self.bulidPoints();
	            self.draw();
	            Control.graphs.push(this);
	        }
	    }, {
	        key: 'bulidPoints',
	        value: function bulidPoints() {
	            var self = this;
	            var iP = self.inputPoints;
	            var bC = self.pointColor;
	            var fC = self.fontColor;

	            for (var i = 0; i < self.n + 1; i++) {
	                var lx = oW / 2;
	                var ly = oH / 2;

	                if (iP.length) {
	                    lx = iP[i].x;
	                    ly = iP[i].y;
	                }

	                self.controlPoints.push(new _Point2.default({
	                    type: 'besselCurvePoint',
	                    x: lx,
	                    y: ly,
	                    r: 5,
	                    graph: self,
	                    bcolor: 'rgba(' + ~~bC[0] + ',' + ~~bC[1] + ',' + ~~bC[2] + ',' + ~~bC[3] + ')',
	                    fontColor: 'rgba(' + ~~fC[0] + ',' + ~~fC[1] + ',' + ~~fC[2] + ',' + ~~fC[3] + ')',
	                    bWeight: 3,
	                    notesText: 'p' + note++,
	                    font: '15px Microsoft YaHei'
	                }));

	                Control.points.push(self.controlPoints[i]);
	            }
	        }

	        // 绘制曲线

	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	            var p = self.controlPoints;
	            var t = self.t;
	            var n = self.n;

	            var dx = [];
	            var dy = [];

	            dx.push(p[0].x);
	            for (var i = 1; i <= n; i++) {
	                var dtemp = 0;
	                for (var j = i; j > 1; j--) {
	                    dtemp += dx[j - 1];
	                }

	                if (i >= n) {
	                    dx.push(p[n].x - p[0].x - dtemp);
	                } else {
	                    dx.push(n * (p[i].x - p[i - 1].x) - dtemp);
	                }
	            }

	            dy.push(p[0].y);
	            for (var _i = 1; _i <= n; _i++) {
	                var _dtemp = 0;
	                for (var _j = _i; _j > 1; _j--) {
	                    _dtemp += dy[_j - 1];
	                }

	                if (_i >= n) {
	                    dy.push(p[n].y - p[0].y - _dtemp);
	                } else {
	                    dy.push(n * (p[_i].y - p[_i - 1].y) - _dtemp);
	                }
	            }

	            ctx.beginPath();
	            ctx.save();
	            ctx.lineWidth = this.lineWidth;
	            ctx.strokeStyle = 'rgba(' + ~~this.lineColor[0] + ',\n                                ' + ~~this.lineColor[1] + ',\n                                ' + ~~this.lineColor[2] + ',\n                                ' + ~~this.lineColor[3] + ')';

	            for (var _i2 = 0; _i2 <= t; _i2 += .005) {
	                var lx = 0;
	                var ly = 0;

	                for (var _j2 = dx.length - 1; _j2 >= 0; _j2--) {
	                    lx += dx[_j2] * Pow(_i2, _j2);
	                    ly += dy[_j2] * Pow(_i2, _j2);
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
	    }, {
	        key: 'printPosition',
	        value: function printPosition() {
	            var self = this;
	            var str = '[';
	            var n = self.n;
	            var cp = self.controlPoints;
	            for (var i = 1; i <= cp.length; i++) {
	                str += '{x: ' + cp[i - 1].x + ', y: ' + cp[i - 1].y + '},';
	            }

	            str += ']';
	            console.info(str);
	        }
	    }, {
	        key: 'changeControlPointState',
	        value: function changeControlPointState() {
	            var self = this;

	            if (self.isEdit) {
	                Control.points = self.controlPoints;
	            }
	        }
	    }]);

	    return BesselCurve;
	}();

	exports.default = BesselCurve;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var Point = function () {
	    function Point(opt) {
	        _classCallCheck(this, Point);

	        this.type = opt.type;
	        this.x = opt.x;
	        this.y = opt.y;
	        this.associatePoint = opt.associatePoint || [];

	        this.graph = opt.graph;
	        this.beta = 0; // 针对圆曲线
	        this.bcolor = opt.bcolor;
	        this.r = opt.r;
	        this.bWeight = opt.bWeight;
	        this.notesText = opt.notesText;
	        this.font = opt.font;
	        this.fontColor = opt.fontColor;
	        this.isshow = true;
	        this.init();
	    }

	    _createClass(Point, [{
	        key: "init",
	        value: function init() {
	            var fontGap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.r * 0.35;

	            var self = this;
	            ctx.beginPath();
	            ctx.save();

	            ctx.strokeStyle = self.bcolor;
	            ctx.lineWidth = self.bWeight;
	            ctx.arc(self.x, self.y, self.r, 0, 2 * PI);

	            if (self.notesText) {
	                ctx.font = self.font;
	                ctx.fillStyle = self.fontColor;
	                var fGap = fontGap + self.r;
	                ctx.fillText(self.notesText, self.x + fGap, self.y - fGap);
	            }
	            ctx.stroke();
	            ctx.restore();
	        }
	    }]);

	    return Point;
	}();

	exports.default = Point;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _datGuiMin = __webpack_require__(5);

	var _datGuiMin2 = _interopRequireDefault(_datGuiMin);

	var _Curve = __webpack_require__(2);

	var _Curve2 = _interopRequireDefault(_Curve);

	var _Circular = __webpack_require__(7);

	var _Circular2 = _interopRequireDefault(_Circular);

	var _Animation = __webpack_require__(9);

	var _Animation2 = _interopRequireDefault(_Animation);

	var _easing = __webpack_require__(10);

	var EASE = _interopRequireWildcard(_easing);

	function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	        return obj;
	    } else {
	        var newObj = {};if (obj != null) {
	            for (var key in obj) {
	                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	            }
	        }newObj.default = obj;return newObj;
	    }
	}

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = function () {
	    var gui = new _datGuiMin2.default.gui.GUI();

	    ControlData['new curve'] = function () {
	        if (ISANIMATING) return;
	        ctx.clearRect(oW, oH, 0, 0);

	        var cg = Control.graphs;
	        Control.points = [];

	        for (var i = 0; i < cg.length; i++) {
	            cg[i].isEdit = false;
	        }

	        new _Curve2.default({
	            n: ControlData.dimension,
	            ease: ControlData['Time Function'],
	            timeout: ControlData['Timeout(ms)'],
	            pointColor: ControlData['point color'],
	            lineColor: ControlData['curve color'],
	            fontColor: ControlData['font color'],
	            lineWidth: ControlData['curve weight']
	        });
	    };

	    ControlData['new circular'] = function () {
	        if (ISANIMATING) return;
	        ctx.clearRect(oW, oH, 0, 0);

	        var cg = Control.graphs;
	        Control.points = [];

	        for (var i = 0; i < cg.length; i++) {
	            cg[i].isEdit = false;
	        }

	        new _Circular2.default({
	            shortAxis: ControlData['short axis'],
	            longAxis: ControlData['long axis'],
	            timeout: ControlData['Timeout(ms)'],
	            pointColor: ControlData['point color'],
	            lineColor: ControlData['curve color'],
	            fontColor: ControlData['font color'],
	            clockWise: ControlData['clockwise'],
	            lineWidth: ControlData['curve weight']
	        });
	    };

	    ControlData['animate'] = function () {
	        if (ISANIMATING) return;
	        if (Control.graphs.length) {
	            ISANIMATING = 1;
	            (0, _Animation2.default)(0);
	        } else {
	            alert('Please new a graph firstly!');
	        }
	    };

	    ControlData['redraw'] = function () {
	        if (ISANIMATING) return;
	        ctx.clearRect(0, 0, oW, oH);
	        note = 1;
	        Control = {
	            points: [],
	            graphs: [],
	            nowEdit: null
	        };
	    };

	    // bessel curve
	    gui.remember(ControlData);
	    var curveFolder = gui.addFolder('curve folder');

	    var curveParam = curveFolder.addFolder('curve params');
	    curveParam.add(ControlData, 'dimension').min(1).step(1).max(10).onChange(function (value) {
	        ControlData['n'] = value;
	    });

	    curveParam.open();

	    var curveStyle = curveFolder.addFolder('curve style');
	    curveStyle.addColor(ControlData, 'point color').onChange(function (color) {
	        ControlData['point color'] = color;
	    });

	    curveStyle.addColor(ControlData, 'curve color').onChange(function (color) {
	        ControlData['curve color'] = color;
	    });
	    curveStyle.open();

	    // circular
	    var circularFolder = gui.addFolder('circular folder');

	    var circularParam = circularFolder.addFolder('circular param');
	    circularParam.add(ControlData, 'short axis').min(50).step(10).max((oH - 10) / 2).onChange(function (value) {
	        ControlData['short axis'] = value;
	    });

	    circularParam.add(ControlData, 'long axis').min(50).step(10).max((oH - 10) / 2).onChange(function (value) {
	        ControlData['long axis'] = value;
	    });

	    circularParam.addColor(ControlData, 'circular color').onChange(function (value) {
	        ControlData['circular color'] = value;
	    });

	    circularParam.add(ControlData, 'clockwise');
	    circularParam.open();

	    // gui golbal
	    gui.addColor(ControlData, 'font color').onChange(function (color) {
	        ControlData['font color'] = color;
	    });

	    gui.add(ControlData, 'curve weight').min(2).step(1).max(20).onChange(function (value) {
	        ControlData['curve weight'] = value;
	    });
	    gui.add(ControlData, 'Time Function', Object.keys(EASE)).onChange(function (value) {
	        ControlData['Time Function'] = value;
	    });

	    gui.add(ControlData, 'Timeout(ms)').min(100).step(10).max(10000).onChange(function (value) {
	        ControlData['Timeout(ms)'] = value;
	    });
	    gui.add(ControlData, 'new curve');
	    gui.add(ControlData, 'new circular');

	    gui.add(ControlData, 'animate');
	    gui.add(ControlData, 'redraw');
	};

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	var _Point = __webpack_require__(3);

	var _Point2 = _interopRequireDefault(_Point);

	var _util = __webpack_require__(8);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var Circular = function () {
	    function Circular(opt) {
	        _classCallCheck(this, Circular);

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

	    _createClass(Circular, [{
	        key: 'buildPoints',
	        value: function buildPoints() {
	            var self = this;
	            var iP = self.inputPoints;
	            var bC = self.pointColor;
	            var fC = self.fontColor;
	            var clockWise = self.clockWise;

	            var param = {
	                type: 'circularPoint',
	                r: 5,
	                bcolor: 'rgba(' + ~~bC[0] + ',' + ~~bC[1] + ',' + ~~bC[2] + ',' + ~~bC[3] + ')',
	                fontColor: 'rgba(' + ~~fC[0] + ',' + ~~fC[1] + ',' + ~~fC[2] + ',' + ~~fC[3] + ')',
	                bWeight: 3,
	                graph: self,
	                font: '15px Microsoft YaHei'
	            };

	            var sp = void 0;
	            var ep = void 0;
	            var o = void 0;

	            sp = new _Point2.default(Object.assign(param, {
	                type: 'sp',
	                x: oW / 2 + self.a,
	                y: oH / 2,
	                notesText: 'sp'
	            }));

	            ep = new _Point2.default(Object.assign(param, {
	                type: 'ep',
	                x: oW / 2,
	                y: oH / 2 - self.b,
	                notesText: 'ep'
	            }));

	            o = new _Point2.default(Object.assign(param, {
	                type: 'circularCenterPoint',
	                associatePoint: [sp, ep],
	                x: oW / 2,
	                y: oH / 2,
	                notesText: 'o'
	            }));

	            // 计算初始beta 值
	            sp.beta = (0, _util.getDeg)(o.x, o.y, sp.x, sp.y);
	            ep.beta = (0, _util.getDeg)(o.x, o.y, ep.x, ep.y);

	            ep.associatePoint = sp.associatePoint = [o];
	            self.controlPoints = [sp, ep, o];
	            Control.points = self.controlPoints;
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var self = this;
	            var beta = self.beta;
	            var t = self.t;
	            var p = self.controlPoints;
	            var a = self.a;
	            var b = self.b;

	            var sp = void 0;
	            var ep = void 0;
	            var op = void 0;

	            for (var i = 0; i < p.length; i++) {
	                var _t = p[i];
	                if (_t.type === 'sp') sp = _t;
	                if (_t.type === 'ep') ep = _t;
	                if (_t.type === 'circularCenterPoint') op = _t;
	            }

	            var betas = sp.beta;
	            var betae = ep.beta;

	            ctx.beginPath();
	            ctx.save();

	            ctx.lineWidth = self.lineWidth;
	            ctx.strokeStyle = 'rgba(' + ~~self.lineColor[0] + ',\n                                ' + ~~self.lineColor[1] + ',\n                                ' + ~~self.lineColor[2] + ',\n                                ' + ~~self.lineColor[3] + ')';
	            if (!self.clockWise) {
	                if (betae < betas) {
	                    betae += 2 * PI;
	                }

	                for (var _i = betas; _i <= betae * t; _i += 1 / (8 * PI)) {
	                    ctx.lineTo(op.x + a * Cos(_i), op.y - b * Sin(_i));

	                    ctx.stroke();
	                }
	            } else {
	                // 下移区间
	                betae -= 2 * PI;
	                betas -= 2 * PI;
	                if (betae > betas) {
	                    betae -= 2 * PI;
	                }

	                for (var _i2 = betas; _i2 >= betae * t; _i2 -= 1 / (8 * PI)) {
	                    ctx.lineTo(op.x + a * Cos(_i2), op.y - b * Sin(_i2));

	                    ctx.stroke();
	                }
	            }

	            if (t === 1) {
	                ctx.lineTo(op.x + a * Cos(betae), op.y - b * Sin(betae));

	                ctx.stroke();
	            }
	            ctx.restore();
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var self = this;
	            self.buildPoints();
	            self.draw();
	            Control.graphs.push(this);
	        }
	    }]);

	    return Circular;
	}();

	exports.default = Circular;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDeg = exports.testPointHit = exports.testInside = undefined;

	var _Point = __webpack_require__(3);

	var _Point2 = _interopRequireDefault(_Point);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * 判断点击区域是否在任意图形内
	 * Long may the sun shine :)
	 *
	 * @author Owen
	 * @email  ouyangxiangyue@baidu.com
	 * @github github/bilibiliou
	 * @date   2017-02-03
	 * @param  {Array}                 shape 图形的个个点组成的坐标
	 * @param  {Object}                 test 触点对象
	 * @return {Boolean}                      是or否
	 */
	var testInside = exports.testInside = function testInside(shape, test) {
	    var result = false;

	    for (var i = 0, j = shape.length - 1; i < shape.length; j = i++) {
	        if (shape[i][1] > test[1] != shape[j][1] > test[1] && test[0] < (shape[j][0] - shape[i][0]) * (test[1] - shape[i][1]) / (shape[j][1] - shape[i][1]) + shape[i][0]) {
	            result = !result;
	        }
	    }

	    return result;
	};

	/**
	 * 判断点击区域是否在点内
	 * Long may the sun shine :)
	 *
	 * @author Owen
	 * @email  ouyangxiangyue@baidu.com
	 * @github github/bilibiliou
	 * @date   2017-02-03
	 * @param  {Object}                 hitPoint 判断点对象
	 * @param  {Number}                 x        触点x
	 * @param  {Number}                 y        触点y
	 * @return {Boolean}                         是否在点内
	 */
	var testPointHit = exports.testPointHit = function testPointHit(hitPoint, x, y) {
	    var r = hitPoint.r + hitPoint.bWeight;
	    var dx = x - hitPoint.x;
	    var dy = y - hitPoint.y;

	    return Pow(r, 2) > Pow(dx, 2) + Pow(dy, 2);
	};

	/**
	 * 以一个 点为圆心点， 获取另一个点到圆心点的逆时针方向的夹角度数
	 * Long may the sun shine :)
	 *
	 * @author Owen
	 * @email  ouyangxiangyue@baidu.com
	 * @github github/bilibiliou
	 * @date   2017-02-03
	 * @param  {Number}                     x
	 * @param  {Number}                     y
	 * @param  {Number}                     x1
	 * @param  {Number}                     y1
	 * @return {Number}                    夹角度数
	 */
	var getDeg = exports.getDeg = function getDeg(x, y, x1, y1) {
	    var $x = x1 - x;
	    var $y = y1 - y;

	    var _$x = Abs($x);
	    var h = Sqrt(Pow($x, 2) + Pow($y, 2));
	    var _deg = Acos(_$x / h);

	    var deg = 0;

	    switch (true) {
	        // 第一象限
	        case $x > 0 && $y <= 0:
	            deg = _deg;
	            break;
	        // 第二象限
	        case $x <= 0 && $y < 0:
	            deg = PI - _deg;
	            break;
	        // 第三象限
	        case $x < 0 && $y >= 0:
	            deg = PI + _deg;
	            break;
	        // 第四象限
	        case $x >= 0 && $y > 0:
	            deg = 2 * PI - _deg;
	            break;
	    }
	    return deg;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _easing = __webpack_require__(10);

	var EASE = _interopRequireWildcard(_easing);

	function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	        return obj;
	    } else {
	        var newObj = {};if (obj != null) {
	            for (var key in obj) {
	                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	            }
	        }newObj.default = obj;return newObj;
	    }
	}

	var Vrender = function Vrender(index) {
	    if (index === Control.graphs.length) {
	        ISANIMATING = 0; // 结束动画
	        return;
	    }
	    if (index === 0) {
	        ctx.clearRect(0, 0, oW, oH);
	    }

	    var Curve = Control.graphs[index];
	    var timeout = Curve.timeout || 100;
	    var temp = 0;
	    var ease = EASE[Curve.ease];

	    // 动画 起始时间
	    var start = Date.now();

	    Curve.t = 0;
	    Curve.isAnimating = true;
	    Curve.isEdit = false;

	    requestAnimationFrame(render);

	    function render() {
	        var now = Date.now();
	        var percent = (now - start) / timeout; // 当前运动百分比
	        var easePercent = ease(percent); // 时间线已经 到达的百分比

	        if (easePercent >= 1) {
	            easePercent = 1;
	        }

	        Curve.t = easePercent;
	        Curve.draw();

	        if (easePercent < 1) {
	            requestAnimationFrame(render);
	        } else {
	            Curve.isAnimating = false;
	            Vrender(index + 1);
	        }
	    }
	};

	exports.default = Vrender;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// 缓动函数 参数t 为当前 已运动的时间 / 运动完成所需的总时间
	// return 已经运动完成的百分比
	var linear = exports.linear = function linear(t) {
	    return t;
	};
	var easeInQuad = exports.easeInQuad = function easeInQuad(t) {
	    return t * t;
	};
	var easeOutQuad = exports.easeOutQuad = function easeOutQuad(t) {
	    return t * (2 - t);
	};
	var easeInCubic = exports.easeInCubic = function easeInCubic(t) {
	    return t * t * t;
	};
	var easeOutCubic = exports.easeOutCubic = function easeOutCubic(t) {
	    return --t * t * t + 1;
	};
	var easeInOutCubic = exports.easeInOutCubic = function easeInOutCubic(t) {
	    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	};
	var easeInQuart = exports.easeInQuart = function easeInQuart(t) {
	    return t * t * t * t;
	};
	var easeInQuint = exports.easeInQuint = function easeInQuint(t) {
	    return t * t * t * t * t;
	};
	var inSine = exports.inSine = function inSine(t) {
	    return 1 - Math.cos(t * Math.PI / 2);
	};
	var inExpo = exports.inExpo = function inExpo(t) {
	    return 0 === t ? 0 : Math.pow(1024, t - 1);
	};
	var inCirc = exports.inCirc = function inCirc(t) {
	    return 1 - Math.sqrt(1 - t * t);
	};
	var inBack = exports.inBack = function inBack(t) {
	    var s = 1.70158;
	    return t * t * ((s + 1) * t - s);
	};
	var outBack = exports.outBack = function outBack(t) {
	    var s = 1.70158;
	    return --t * t * ((s + 1) * t + s) + 1;
	};
	var inOutBack = exports.inOutBack = function inOutBack(t) {
	    var s = 1.70158 * 1.525;
	    if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
	    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
	};
	var outBounce = exports.outBounce = function outBounce(t) {
	    if (t < 1 / 2.75) {
	        return 7.5625 * t * t;
	    } else if (t < 2 / 2.75) {
	        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
	    } else if (t < 2.5 / 2.75) {
	        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
	    } else {
	        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
	    }
	};
	var inElastic = exports.inElastic = function inElastic(t) {
	    var s = void 0,
	        a = 0.1,
	        p = 0.4;
	    if (t === 0) return 0;
	    if (t === 1) return 1;
	    if (!a || a < 1) {
	        a = 1;s = p / 4;
	    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
	    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	};
	var outElastic = exports.outElastic = function outElastic(t) {
	    var s = void 0,
	        a = 0.1,
	        p = 0.4;
	    if (t === 0) return 0;
	    if (t === 1) return 1;
	    if (!a || a < 1) {
	        a = 1;s = p / 4;
	    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
	    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
	};
	var inOutElastic = exports.inOutElastic = function inOutElastic(t) {
	    var s = void 0,
	        a = 0.1,
	        p = 0.4;
	    if (t === 0) return 0;
	    if (t === 1) return 1;
	    if (!a || a < 1) {
	        a = 1;s = p / 4;
	    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
	    if ((t *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// 调用 Frame 渲染
	exports.default = function () {
	    return requestAnimationFrame(function () {
	        for (var i = 0; i < Control.points.length; i++) {
	            Control.points[i].init();
	        }

	        for (var _i = 0; _i < Control.graphs.length; _i++) {
	            Control.graphs[_i].draw();
	        }
	    });
	};

/***/ }
]);