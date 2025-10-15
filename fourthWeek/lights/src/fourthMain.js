import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const gui = new GUI();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0,0,0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
scene.add(hemisphereLight);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
scene.add(hemisphereLightHelper);

const pointLight = new THREE.PointLight(0xff9000, 1.5, 0.2);
pointLight.position.set(1,-0.5,1);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI*0.1, 0.25, 1);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// Objects
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial()
);
sphereMesh.position.x = -1.5;

const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial()
);
cubeMesh.position.x = 0;

const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  new THREE.MeshStandardMaterial()
);
torusMesh.position.x = 1.5;

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshStandardMaterial()
);
planeMesh.rotation.x = -Math.PI * 0.5;
planeMesh.position.y = -0.65;

scene.add(planeMesh, sphereMesh, cubeMesh, torusMesh);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
  requestAnimationFrame(animate);
  cubeMesh.rotation.y += 0.01;
  torusMesh.rotation.x += 0.02;
  renderer.render(scene, camera);
}
animate();

