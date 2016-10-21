Width = c.width = innerWidth;
Height = c.height = innerHeight;

canvas = document.getElementById("c");
ctx = canvas.getContext("2d")

M = Math;
Cos = M.cos;
Sin = M.sin;
Ran = M.random;
sqrt = M.sqrt;
pow = M.pow;
PI  = M.PI;
v = 32;
e = []; // 轨迹组
w = []; // 图形轨迹组

// 中心点坐标
x0 = ~~(Width / 2); 
y0 = ~~(Height / 2); 
LongAixs = (Width / 4) - (Width * 0.09375);
ShortAixs = (Height / 10);

w.push(ellipseGenerator(x0 , y0, LongAixs, ShortAixs, 0));
w.push(ellipseGenerator(x0 , y0, LongAixs, ShortAixs, (3*PI)/4));
w.push(ellipseGenerator(x0 , y0, LongAixs, ShortAixs, (5*PI)/4));

function ellipseGenerator (x0, y0, a , b , beta) {
  let w = [];

  if (beta % PI === 0) {
    for (let i = 0; i<2*PI; i+= .2) {
      w.push([
        x0 + (a + 50) * Cos(i),
        y0 - b * Sin(i)
      ])
    }
  } else {
    for(i = 0; i<2*PI; i+=.2) {
      w.push([
        x0 + ((a - 30) * Cos(i) * Cos(beta) - (b + 50) * Sin(i) * Sin(beta)),
        y0 - ((a - 30) * Cos(i) * Sin(beta) + (b + 50) * Cos(i) * Sin(beta)) 
      ])
    }
  }

  return w;
}

for(let k = 0, kstack = []; k< w.length; k++) {
  for (let j = 0; j < 32;j++) {
    H = 80;
    S = Ran() * 40 + 60; 
    L = Ran() * 60 + 20;

    stack = [];
    for (let i = 0; i < v; i++) {
      stack[i] = {
        x: x0,   // 位移
        y: y0,
        Xv: 0,     // X速度
        Yv: 0,     // Y速度
        RanDot: 0,
        Rad: (1 - i/v) + 1,  // 半径
        Acc: Ran() + 1,  // 加速度
        Dir: Ran() > 0.5 ? 1 : -1,  // 方向
        Fr: Ran() * .2 + .7, // (0.7 - 0.9)
        Col: `hsla(${~~H}%,${~~S}%,${~~L}%,.1)`
      }
    } 

    kstack.push(stack);
  }
  e.push(kstack)
  kstack = [];
}

function loop () {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, Width, Height);

  ctx.fillStyle = "#6ADAF4";
  ctx.beginPath();
  ctx.arc(x0, y0, Height * 0.0375, 0, 2*PI , 1);
  ctx.closePath();
  ctx.fill();

  // ctx.font = "160px arial";
  // ctx.fillStyle = "#6ADAF4";
  // ctx.fillText("React", x0+400, y0+50);

  for(let k = 0; k<w.length ;k++) {
    z = e[k];
    h = w[k];
    for (let i = 0; i<z.length; i++) {
      
      u = z[i][0];
      q = h[u.RanDot]

      // 计算到 图形轨迹 各点的距离
      D = u.x - q[0];
      E = u.y - q[1];
      G = sqrt( pow(D,2) + pow(E,2) );

      // 环状
      if (G < 10) {
        if(u.Dir === 1) {
          u.RanDot = (u.RanDot != v-1) ? u.RanDot+1 : 0;
        } else {
          u.RanDot = (u.RanDot != 0) ? u.RanDot-1 : v-1;
        }
      }

      // 计算领头点的速度
      u.Xv += -D / G * u.Acc;
      u.Yv += -E / G * u.Acc;

      // 根据速度 刷新领头点距离
      u.x += u.Xv;
      u.y += u.Yv;

      drawCircle(u);

      u.Xv *= u.Fr;
      u.Yv *= u.Fr;

      for(let j = 0; j < v-1; j++) {
        
        T = z[i][j];
        N = z[i][j + 1];

        N.x -= (N.x - T.x) * .7;
        N.y -= (N.y - T.y) * .7;

        drawCircle(N);
      }
    }
  } 
}

function drawCircle ($) {
  // ctx.fillStyle = $.Col;
  ctx.fillStyle = "#6ADAF4";
  ctx.beginPath();
  ctx.arc($.x, $.y, $.Rad, 0, 2*PI , 1);
  ctx.closePath();
  ctx.fill();
}

+function render () {
  requestAnimationFrame(render);
  loop();
}();