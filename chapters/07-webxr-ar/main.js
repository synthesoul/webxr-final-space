import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local');
document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer, {
  requiredFeatures: ['hit-test'],
  optionalFeatures: ['local-floor', 'dom-overlay'],
  domOverlay: { root: document.body }
}));

scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 2));

const reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 0x35ff8a })
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;
scene.add(reticle);

const controller = renderer.xr.getController(0);
controller.addEventListener('select', () => {
  if (!reticle.visible) return;
  const object = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 0.16, 24),
    new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(Math.random(), 0.8, 0.55) })
  );
  object.applyMatrix4(reticle.matrix);
  scene.add(object);
});
scene.add(controller);

let hitTestSource = null;
let hitTestSourceRequested = false;

function requestHitTestSource(session) {
  session.requestReferenceSpace('viewer').then((viewerSpace) => {
    session.requestHitTestSource({ space: viewerSpace }).then((source) => {
      hitTestSource = source;
    });
  });
  session.addEventListener('end', () => {
    hitTestSource = null;
    hitTestSourceRequested = false;
    reticle.visible = false;
  }, { once: true });
}

renderer.setAnimationLoop((time, frame) => {
  if (frame) {
    const session = renderer.xr.getSession();
    const referenceSpace = renderer.xr.getReferenceSpace();
    if (session && !hitTestSourceRequested) {
      hitTestSourceRequested = true;
      requestHitTestSource(session);
    }
    if (hitTestSource && referenceSpace) {
      const results = frame.getHitTestResults(hitTestSource);
      if (results.length > 0) {
        const pose = results[0].getPose(referenceSpace);
        if (pose) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        }
      } else {
        reticle.visible = false;
      }
    }
  }
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
