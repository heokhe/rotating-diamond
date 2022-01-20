import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PillarLamp } from './objects/pillarLamp';

const canvas = document.querySelector('canvas');
const renderer = new three.WebGLRenderer({ canvas });

const camera = new three.PerspectiveCamera(60, canvas.innerWidth / canvas.innerHeight, 0.1, 100);
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 2;
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true
orbitControls.dampingFactor = 0.2
orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = 0.2

const scene = new three.Scene();

const ground = new three.Mesh(new three.PlaneGeometry(100, 100), new three.MeshStandardMaterial({
  color: '#333',
}))
ground.rotateX(-Math.PI / 2)
ground.position.y = -2
scene.add(ground)

const ambientLight = new three.AmbientLight(0xffffff, 0.05)
scene.add(ambientLight)

const pointLight = new three.PointLight(0xffffff, 0.2)
pointLight.position.set(0, 2, 0)
scene.add(pointLight)

const redLamp = new PillarLamp('#d60d0d')
redLamp.position.set(3.5, 0.5, 0)
redLamp.rotation.y = Math.PI
scene.add(redLamp)

const blueLamp = new PillarLamp('#210dd6')
blueLamp.position.set(-3.5, 0.5, 0)
scene.add(blueLamp)

const diamondHeightRatio = 1.3
const diamondGeometry = new three.OctahedronGeometry(1 / diamondHeightRatio);
const diamondMaterial = new three.MeshStandardMaterial({
  color: 0xffffff,
});
const diamond = new three.Mesh(diamondGeometry, diamondMaterial);
diamond.scale.set(1, diamondHeightRatio, 1)

scene.add(diamond);

function beforeRender() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

const t0 = Date.now() / 1000;
function render() {
  beforeRender()
  orbitControls.update()
  const t = Date.now() / 1000 - t0;
  diamond.rotation.y = t;
  diamond.position.y = Math.sin(2 * t) / 5
  renderer.render(scene, camera);
}

// render()
function renderLoop() {
  render()
  requestAnimationFrame(renderLoop)
}

renderLoop();
