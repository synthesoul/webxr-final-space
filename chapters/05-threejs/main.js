import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07101d);
scene.fog = new THREE.Fog(0x07101d, 12, 32);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(0, 3.5, 12);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x9bbcff, 1.4);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffffff, 3.5);
sun.position.set(5, 8, 6);
scene.add(sun);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2.4, 2.4, 2.4),
  new THREE.MeshStandardMaterial({ color: 0xff4f8b, roughness: 0.28, metalness: 0.15 })
);
cube.position.set(2.6, 1.6, 0);
scene.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.45, 32, 20),
  new THREE.MeshStandardMaterial({ color: 0x42d9c8, roughness: 0.78, metalness: 0.05 })
);
sphere.position.set(-2.6, 1.45, 0);
scene.add(sphere);

const textureCanvas = document.createElement('canvas');
textureCanvas.width = textureCanvas.height = 128;
const textureContext = textureCanvas.getContext('2d');
textureContext.fillStyle = '#17253a'; textureContext.fillRect(0, 0, 128, 128);
textureContext.strokeStyle = '#3f6b91'; textureContext.lineWidth = 4;
for (let i = -128; i < 256; i += 24) { textureContext.beginPath(); textureContext.moveTo(i, 0); textureContext.lineTo(i + 128, 128); textureContext.stroke(); }
const groundTexture = new THREE.CanvasTexture(textureCanvas);
groundTexture.colorSpace = THREE.SRGBColorSpace;
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(12, 12);
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ map: groundTexture, roughness: 0.92, metalness: 0.02 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const elapsed = clock.getElapsedTime();
  cube.rotation.x = elapsed * 0.55;
  cube.rotation.y = elapsed * 0.85;
  sphere.position.y = 1.45 + Math.sin(elapsed * 1.4) * 0.35;
  sun.position.x = Math.cos(elapsed * 0.35) * 7;
  sun.position.z = Math.sin(elapsed * 0.35) * 7;
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
