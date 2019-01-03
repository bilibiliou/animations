window.onload = function () {
  function $(v, d) {
    d = d || document
    return d.querySelector(v)
  }

  function randomRange(min, max) {
    return min + (max - min) * Math.random();
  }

  function clamp(x, min, max) {
    return x < min ? min : (x > max ? max : x);
  }
  // 颜色函数
  function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }

  function byte2Hex (n) {
    var r = Number(n).toString(16);
    var re = n <= 15 ? '0' + r : r
    return re.toUpperCase()
  }

  function colorful (i) {
    var frequency = .0052;
    red = parseInt(Math.sin(frequency*i + 24) * 127 + 128);
    green = parseInt(Math.sin(frequency*i + 32) * 127 + 128);
    blue = parseInt(Math.sin(frequency*i + 64) * 127 + 128);
    return RGB2Color(red,green,blue)
  }
  let M = Math
  let PI = M.PI
  let Cos = M.cos
  let Sin = M.sin
  const box = $('#box')
  let wW = 900
  let wH = 900
  let center = [wW / 2, wH / 2]
  let cx = center[0]
  let cy = center[1]
  const oWorld = createCanvas()
  const wctx = oWorld.getContext('2d')
  box.appendChild(oWorld)
  const colors = ['#EB3333', '#FFAC5D', '#FFDB5D', '#6FC8D8', '#62A2F6']
  const ring = [
    {r: 50, c: 16},
    {r: 100, c: 14},
    {r: 200, c: 12},
    {r: 400, c: 10},
    {r: 800, c: 8},
    {r: 1200, c: 6}
  ]
  // 创建离屏画布
  function createCanvas (w = wW, h = wH) {
    var oCanvas = document.createElement('canvas')
    oCanvas.width = w
    oCanvas.height = h

    oCanvas.style.width = w + 'px'
    oCanvas.style.height = h + 'px'
    return oCanvas
  }
  let curve = []
  let curveTimes = 25
  function getCurveP (i) {
    let x = curveTimes * (16 * M.pow(Sin(i) , 3)) + cx;
    let y = -curveTimes * (13 * Cos(i) - 5 * Cos(2*i) - 2 * Cos(3*i) - Cos(4*i)) + cy;
    return [x, y]
  }
  for (let i = 0; i < 2 * PI; i+=1/(32*PI)) {
    curve.push(getCurveP(i))
  }

  let vertices = []
  let indices = []

  ring.forEach((v) => {
    var radius = v.r,
        count = v.c,
        variance = radius * 0.25;
    for (let i = 0; i < count; i++) {
      let x = Cos((i / count) * 2 * PI) * radius + cx + randomRange(-variance, variance);
      let y = Sin((i / count) * 2 * PI) * radius + cy + randomRange(-variance, variance);

      x = clamp(x, 0, wW)
      y = clamp(y, 0, wH)

      vertices.push([x, y]);
    }

  })
  indices = Delaunay.triangulate(vertices);


  function drawCurve (ctx) {
    ctx.beginPath()

    curve.forEach(v => {
      ctx.save()
      ctx.lineTo(v[0], v[1])
      ctx.lineWidth = '5'
      ctx.strokeStyle = 'white'
      ctx.stroke()
      ctx.restore()
    })
    ctx.clip()
    ctx.closePath()
  }

  function triangulate (ctx, p1, p2 ,p3, fillColor) {
    ctx.save()
    ctx.globalAlpha=0.8;
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.lineTo(p3[0], p3[1]);
    ctx.strokeStyle = "#f5f5f5"
    ctx.lineWidth = "2"
    ctx.stroke()
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.closePath();
    ctx.restore()
  }

  // function dp (ctx, x, y, color, size = 2) {
  //   ctx.beginPath()
  //   ctx.arc(x, y, size, 0, 2 * PI)
  //   ctx.fillStyle = color
  //   ctx.fill()
  //   ctx.closePath()
  // }

  function draw () {
    drawCurve(wctx)

    for (let i = 0; i < indices.length; i+=3) {
      let p1 = vertices[indices[i + 0]]
      let p2 = vertices[indices[i + 1]]
      let p3 = vertices[indices[i + 2]];
        triangulate(wctx, p1, p2 ,p3, colorful(randomRange(-30, 30)))
    }
  }

  function update () {
    wctx.clearRect(0, 0, wW, wW)
    draw()
  }
  update()
}

