/* WebXR Final Space: chapters 2-10 in one A-Frame scene. */

AFRAME.registerComponent('matrix-spin', {
  schema: {speed: {type: 'number', default: 1}},
  tick: function (time, delta) {
    this.el.object3D.rotation.y += (delta || 0) * 0.001 * this.data.speed;
    this.el.object3D.rotation.x += (delta || 0) * 0.00035 * this.data.speed;
  }
});

AFRAME.registerComponent('shader-orb', {
  init: function () {
    this.time = {value: 0};
    this.applyShader = this.applyShader.bind(this);
    this.el.addEventListener('object3dset', this.applyShader);
    this.applyShader();
  },

  applyShader: function () {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh) return;
    mesh.material = new THREE.ShaderMaterial({
      uniforms: {uTime: this.time},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        void main() {
          float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + vNormal.y * 4.0);
          vec3 color = mix(vec3(0.02, 0.25, 0.65), vec3(0.1, 0.95, 0.95), pulse);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });
  },

  tick: function (time) {
    this.time.value = time * 0.001;
  },

  remove: function () {
    this.el.removeEventListener('object3dset', this.applyShader);
  }
});

AFRAME.registerComponent('model-status', {
  init: function () {
    const status = document.querySelector('#model-status');
    this.el.addEventListener('model-loaded', () => {
      status.setAttribute('value', 'GLTF READY');
    });
    this.el.addEventListener('model-error', (event) => {
      console.error('GLTF load failed', event.detail);
      status.setAttribute('value', 'GLTF ERROR');
    });
  }
});

AFRAME.registerComponent('pushable', {
  schema: {strength: {type: 'number', default: 3}},
  init: function () {
    this.ready = false;
    this.onBodyLoaded = () => { this.ready = true; };
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('body-loaded', this.onBodyLoaded);
    this.el.addEventListener('click', this.onClick);
  },

  onClick: function (event) {
    if (!this.ready || !this.el.body || !window.CANNON) return;
    const origin = this.el.body.position;
    const point = event.detail && event.detail.intersection && event.detail.intersection.point;
    const impulse = point
      ? new CANNON.Vec3(origin.x - point.x, 0.5, origin.z - point.z)
      : new CANNON.Vec3(0, 0.5, 1);
    impulse.normalize();
    impulse.scale(this.data.strength, impulse);
    this.el.body.applyImpulse(impulse, origin);
  },

  remove: function () {
    this.el.removeEventListener('body-loaded', this.onBodyLoaded);
    this.el.removeEventListener('click', this.onClick);
  }
});
