import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050812);

const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local-floor');
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

scene.add(new THREE.HemisphereLight(0x9ecbff, 0x172030, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 3);
key.position.set(4, 6, 3);
scene.add(key);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(7, 64),
  new THREE.MeshStandardMaterial({ color: 0x14243a, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.3, 0.08, 16, 64),
  new THREE.MeshStandardMaterial({ color: 0x55e6ff, emissive: 0x063a4a, emissiveIntensity: 2 })
);
ring.position.set(0, 2, -2);
scene.add(ring);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  new THREE.MeshStandardMaterial({ color: 0xff4f8b, roughness: 0.35, metalness: 0.2 })
);
cube.position.set(0, 1.3, -2);
scene.add(cube);

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const time = clock.getElapsedTime();
  ring.rotation.y = time * 0.7;
  ring.rotation.x = Math.sin(time * 0.6) * 0.35;
  cube.rotation.x = time * 0.9;
  cube.rotation.y = time * 1.1;
  renderer.render(scene, camera);
});

function resize() {
  const width = window.innerWidth, height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
resize();
