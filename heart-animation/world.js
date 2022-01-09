// 摄像机视锥体垂直视野角度
const fov = 45;
// 摄像机视锥体长宽比
let aspect = void 0;
//  摄像机视锥体近端面
const near = 1;
// 摄像机视锥体远端面
const far = 1000;

let rootId = '#bear';

class World {
  plane = null; // Plane 实例
  isClicked = false; // 鼠标是否点击了舞台
  isSetteled = true; // 当前是否处于动画稳定态
  // 舞台的宽高
  stageWidth = innerWidth;
  stageHeight = innerHeight;

  // Three 的容器
  container = null;
  // ThreeJs 的相机实例
  camera = null;
  // Three 的场景实例
  scene = null;
  // Three 的渲染器
  renderer = null;

  constructor() {
    this.initEngine();
    this.initRender();
    this.plane = new Plane({
      name: 'mainPalne',
      world: this
    });
    this.plane.createPlane();
    this.container.addEventListener('click', () => {
      this.isClicked = !this.isClicked;
      this.isSetteled = false;
    });
  }

  initEngine = () => {
    const root = document.querySelector(rootId);
    const { width, height } = root.getBoundingClientRect();
    this.container = root;

    this.stageWidth = width;
    this.stageHeight = height;
    aspect = this.stageWidth / this.stageHeight;
    // camera init
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // scene init
    this.scene = new THREE.Scene();
    this.camera.position.z = 500;
    // this.camera.lookAt(this.scene.position);
  }

  initRender = () => {
    const { stageWidth, stageHeight } = this;
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(0xffc0cb, 1);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(stageWidth, stageHeight);
    this.container.appendChild(this.renderer.domElement);
  }

  refreshStage = () => {
    const { plane, isSetteled, renderer, scene, mesh, camera } = this;

    if (!isSetteled) {
      plane.reRender();
      // setTimeout(() => {
      //   this.isSetteled = true;
      // }, 1000);
    }

    renderer.render(scene, camera);
  }

  // 添加网格，如果需要添加可以添加各种网格
  addMesh = (mesh) => {
    const { scene, renderer, camera } = this;
    scene.add(mesh);
    renderer.render(scene, camera);
  }
}
