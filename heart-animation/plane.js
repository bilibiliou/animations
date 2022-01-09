let imageURL = './bear.jpg';

class Plane {
  name = '';
  // 平面的宽度分段数
  segmentWidth = 12;
  // 平面的高度分段数
  segmentHeight = 6;

  // Three 的渲染材料
  material = null;
  // Three初始化的几何体实例
  geometry = null;
  // Three初始化的网格实例
  mesh = null;
  // Point 实例集合
  points = [];

  constructor(config) {
    this.name = config.name;
    this.world = config.world;
  }

  createPlane = () => {
    const { world, segmentWidth, segmentHeight } = this;
    const { stageWidth, stageHeight } = world;
    new THREE.TextureLoader().load(imageURL, (texture) => {
      // 纹理贴图在水平方向上将如何包裹，在UV映射中对应于U
      texture.wrapS = THREE.RepeatWrapping;
      // 纹理贴图在垂直方向上将如何包裹，在UV映射中对应于V
      texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;

      const option = {
        color: 0xffffff,
        side: THREE.DoubleSide,
        map: texture,
        wireframe: false,
        transparent: false,
        opacity: 1
      }

      // 初始化网格材质
      this.material = new THREE.MeshBasicMaterial(option);
      this.material.needsUpdate = true;

      // 平面缓冲几何体
      this.geometry = new THREE.PlaneGeometry(stageWidth, stageHeight, segmentWidth, segmentHeight);
      this.geometry.attributes.position.needsUpdate = true;
      this.geometry.attributes.normal.needsUpdate = true;
      const vertices = this.geometry.attributes.position.array;
      for(let i = 0; i < vertices.length; i+=3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];
        const v = new THREE.Vector3(x, y, z);
        const point = new Point(v, i / 3, this);
        this.points.push(point);
      }
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.world.addMesh(this.mesh);
    });
  }

  reRender = () => {
    const { world, mesh, geometry } = this;
    const isClicked = world.isClicked;
    if (!isClicked) {
      mesh.position.z = (mesh.position.z * 0.65) + (10 * 0.15);
      mesh.material.opacity = (mesh.material.opacity * 0.35) + (0.5 * 0.15);
      mesh.material.wireframe = false;
    } else {
      mesh.position.z = (mesh.position.z * 0.85) + 0.15;
      mesh.material.opacity = 1;
      mesh.material.wireframe = true;
    }
    const vertices = this.geometry.attributes.position.array;
    const newPosition = new Float32Array( vertices.length ); // 3 vertices per point

    for (let i = 0; i < this.points.length; i++) {
      const { x, y ,z } = this.points[i].move(isClicked);
      newPosition[i * 3] = x;
      newPosition[i * 3 + 1] = y;
      newPosition[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute( newPosition, 3 ) );
  }
}