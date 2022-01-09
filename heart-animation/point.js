const tween = (a, b, p) => (1 - p) * a + p * b;
class Point {
  vertice = null; // geometry.vertices 里的顶点实例
  index; // geometry.vertices 里的顶点索引
  plane = null; // Plane 实例
  // 图片变型前的三维坐标
  initVector;
  // 当前的坐标
  currentVector = new THREE.Vector3();
  // 图片变形后的三维坐标
  targetVector = new THREE.Vector3();
  constructor (v, index, plane, pointsTotal) {
    const { PI } = Math;
    this.vertice = v;
    this.index = index;
    this.plane = plane;
    this.initVector = new THREE.Vector3(v.x, v.y, v.z);
    const degree = 2 * PI / pointsTotal * (index + 1);
    const {x, y} = calcHeartPosition(degree);
    const z = index * 0.1; // 让它们有个层级关系
    // 我们希望变化成一个心形，所以把心形计算出来的坐标设置给Vector的xy
    this.targetVector.x = x;
    this.targetVector.y = y;
    this.targetVector.z = z;

    // 初始化一开始点的位置，是展开铺在图片的
    this.currentVector.x = v.x;
    this.currentVector.y = v.y;
    this.currentVector.z = z;
  }

  move = (isClicked) => {
    const { x: cx, y: cy, z: cz } = this.currentVector;
    const { x: ix, y: iy, z: iz } = this.initVector;
    const { x: tx, y: ty, z: tz } = this.targetVector;
    const p = 0.01; // 补间的系数，这里简单来就用线性的
    if (isClicked) {
      // 判断点击态，如果第一次点就揉成爱你的心
      this.currentVector.x = tween(cx, tx, p);
      this.currentVector.y = tween(cy, ty, p);
      this.currentVector.z = tween(cz, tz, p);
    } else {
      // 第二次点击就还原为女朋友的照片
      this.currentVector.x = tween(cx, ix, p);
      this.currentVector.y = tween(cy, iy, p);
      this.currentVector.z = tween(cz, iz, p);
    }
    return this.currentVector;
  }
}