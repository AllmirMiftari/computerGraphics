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

// console.log(scene);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cubeMesh = new THREE.Mesh(geometry, material);

// cubeMesh.position.x = 1;
// cubeMesh.position.y = -1;
// cubeMesh.position.z = -3;

// cubeMesh.position.set(1, -1, -3);

console.log(
  "distance from camera to cubemesh: ",
  cubeMesh.position.distanceTo(camera.position)
);

//axes helpers
const axes = new THREE.AxesHelper(7);

//scaling objects
// cubeMesh.scale.x = 3;
// cubeMesh.scale.y = 2;
// cubeMesh.scale.z = 6;

//rotating
// cubeMesh.rotation.x = Math.PI *0.25;
// cubeMesh.rotation.y = Math.PI *0.25;


// cubeMesh.position.x = 0.7;
// cubeMesh.position.y = -0.6;
// cubeMesh.position.z = -1;
// cubeMesh.scale.x = 2;
// cubeMesh.scale.y = 0.25;
// cubeMesh.scale.z = 0.5;
// cubeMesh.rotation.x = Math.PI *0.25;
// cubeMesh.rotation.y = Math.PI *0.25;

const group = new THREE.Group();
group.scale.y=2;
group.rotation.y;

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
cube1.position.x = -2;

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 32),
  new THREE.MeshBasicMaterial({ color: "red" })
);
cylinder.position.x = 0;

const capsule = new THREE.Mesh(
  new THREE.CapsuleGeometry(1, 1, 4, 8),
  new THREE.MeshBasicMaterial({ color: "white" })
);
capsule.position.x = 2;
group.add(cube1, cylinder, capsule);

scene.add(group);
scene.add(axes);

function animate() {
  requestAnimationFrame(animate);
  // cubeMesh.rotation.x += 0.06;
  // cubeMesh.rotation.y += 0.04;
  // cubeMesh.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();



