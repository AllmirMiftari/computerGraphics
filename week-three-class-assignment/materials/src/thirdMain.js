import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 4, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  roughness: 0.9,
  metalness: 0.1,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1.5;
scene.add(plane);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xff4444, metalness: 0.3, roughness: 0.6 })
);
cube.position.set(-3, -1, 0);
scene.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x44ff44, metalness: 0.5, roughness: 0.4 })
);
sphere.position.set(0, -0.7, 0);
scene.add(sphere);

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.7, 1.5, 32),
  new THREE.MeshStandardMaterial({ color: 0x4488ff, metalness: 0.6, roughness: 0.3 })
);
cone.position.set(3, -0.75, 0);
scene.add(cone);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 6, 4);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
scene.add(lightHelper);

const axes = new THREE.AxesHelper(5);
scene.add(axes);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.02;
  sphere.rotation.y += 0.02;
  cone.rotation.y += 0.02;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
