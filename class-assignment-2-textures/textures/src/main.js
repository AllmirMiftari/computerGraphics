import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture loader
const loader = new THREE.TextureLoader();

const colorMap = loader.load('/Poliigon_WoodVeneerOak_7760/2K/Poliigon_WoodVeneerOak_7760_BaseColor.jpg');

const roughnessMap = loader.load('/Poliigon_WoodVeneerOak_7760/2K/Poliigon_WoodVeneerOak_7760_Roughness.jpg');

const metalnessMap = loader.load('/Poliigon_WoodVeneerOak_7760/2K/Poliigon_WoodVeneerOak_7760_Metallic.jpg');

const normalMap = loader.load('/Poliigon_WoodVeneerOak_7760/2K/Poliigon_WoodVeneerOak_7760_Normal.jpg');

const aoMap = loader.load('/Poliigon_WoodVeneerOak_7760/2K/Poliigon_WoodVeneerOak_7760_AmbientOcclusion.jpg');

const displacementMap = loader.load('/Poliigon_WoodVeneerOak_7760/2K/Poliigon_WoodVeneerOak_7760_Displacement.jpg');


// Create geometry
const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);

// PBR Material
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  roughnessMap: roughnessMap,
  metalnessMap: metalnessMap,
  normalMap: normalMap,
  aoMap: aoMap,
  displacementMap: displacementMap,
  displacementScale: 0.05,
});

// Mesh
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(3, 3, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Animate
function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
