import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const gui = new GUI();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080); 

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(4, 4, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

// SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(2, 5, 2);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.2;
spotLight.castShadow = true;
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// PointLight 
const pointLight = new THREE.PointLight(0xffffff, 0.8, 50);
pointLight.position.set(-3, 3, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLightHelper);

//plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// Cube 
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0.5;
cube.castShadow = true;
scene.add(cube);

// Sphere 
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0.5, 0);
sphere.castShadow = true;
scene.add(sphere);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.y -= 0.01;

//   pointLight.position.x = Math.sin(Date.now() * 0.001) * 3;
//   pointLight.position.z = Math.cos(Date.now() * 0.001) * 3;
//   pointLightHelper.update();

//   controls.update();
//   renderer.render(scene, camera);
// }


const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();

  cube.rotation.y -= 0.01;

  pointLight.position.x = Math.sin(elapsedTime) * 3;
  pointLight.position.z = Math.cos(elapsedTime) * 3;
  pointLightHelper.update();

sphere.position.x = Math.cos(elapsedTime) * 1.5;
sphere.position.z = Math.sin(elapsedTime) * 1.5;
sphere.position.y = Math.abs(Math.sin(elapsedTime * 2)) * 2 + 0.5;


  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

tick();
