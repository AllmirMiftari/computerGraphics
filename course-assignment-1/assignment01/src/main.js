import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaed0ff);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(20, 15, 20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ground grass
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x3b8b3b });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), grassMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// roads
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

// horizontal road
const roadH = new THREE.Mesh(new THREE.PlaneGeometry(40, 4), roadMaterial);
roadH.rotation.x = -Math.PI / 2;
roadH.position.y = 0.01; // raised slightly to prevent flicker
scene.add(roadH);

// vertical road
const roadV = new THREE.Mesh(new THREE.PlaneGeometry(4, 25), roadMaterial);
roadV.rotation.x = -Math.PI / 2;
roadV.position.set(-6, 0.01, 4);
scene.add(roadV);

//circle in the road
const roundaboutMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
const roundabout = new THREE.Mesh(new THREE.CircleGeometry(3, 64), roundaboutMaterial);
roundabout.rotation.x = -Math.PI / 2;
roundabout.position.set(-6, 0.02, 0);
scene.add(roundabout);

// buildings material
const matGray = new THREE.MeshPhongMaterial({ color: 0xcccccc });
const matBlue = new THREE.MeshStandardMaterial({ color: 0x4466ff });
const matYellow = new THREE.MeshStandardMaterial({ color: 0xffb84d });
const matLight = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });

//it support building
const building400ItSupport = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 4), matGray);
building400ItSupport.position.set(-13, 1.5, 6); // moved away from road
// building400ItSupport.rotation.y = Math.PI / 8;
building400ItSupport.castShadow = true;
scene.add(building400ItSupport);

//305 building
const building305 = new THREE.Mesh(new THREE.BoxGeometry(6, 3.5, 4), matBlue);
building305.position.set(-13, 1.25, -6);
building305.rotation.y = -Math.PI / 7;
building305.castShadow = true;
scene.add(building305);

// 814 and 815 building
const building814And815 = new THREE.Mesh(new THREE.BoxGeometry(18, 3, 3), matYellow);
building814And815.position.set(8.5, 1.5, -5); // moved further right from road
building814And815.castShadow = true;
scene.add(building814And815);

const divider = new THREE.Mesh(
  new THREE.BoxGeometry(0.15, 3, 3),
  new THREE.MeshBasicMaterial({ color: 0x000000 })
);
divider.position.set(8.5, 1.5, -5);
scene.add(divider);


//LH 1 building
const buildingLH1 = new THREE.Mesh(new THREE.BoxGeometry(9, 4, 6), matLight);
buildingLH1.position.set(8, 1, 10); // slightly above and away from center
buildingLH1.castShadow = true;
scene.add(buildingLH1);

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(15, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffeeaa, 0.8, 30);
pointLight.position.set(-6, 5, 0);
scene.add(pointLight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
