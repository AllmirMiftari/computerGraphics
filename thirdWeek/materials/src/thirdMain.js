import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(2, 0.6, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  // wireframe: true,
  metalness: 0.4,
  roughness: 0.3,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // soft overall light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(1,5,1);
scene.add(directionalLight);

//light axes helper
const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0,4);
scene.add(lightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// Axes helper 
const axes = new THREE.AxesHelper(5);
scene.add(axes);


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.02;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
