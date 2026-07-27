/* Chapter 8: custom A-Frame components and a small Three.js bridge. */

AFRAME.registerComponent('orbit-pulse', {
  schema: {
    radius: {type: 'number', default: 0.5},
    speed: {type: 'number', default: 1},
    height: {type: 'number', default: 0.2}
  },

  init: function () {
    this.origin = this.el.object3D.position.clone();
    this.elapsed = 0;
  },

  tick: function (time, delta) {
    this.elapsed += (delta || 0) / 1000;
    const phase = this.elapsed * this.data.speed;
    this.el.object3D.position.x = this.origin.x + Math.cos(phase) * this.data.radius;
    this.el.object3D.position.z = this.origin.z + Math.sin(phase) * this.data.radius;
    this.el.object3D.position.y = this.origin.y + Math.sin(phase * 2) * this.data.height;
  }
});

AFRAME.registerComponent('three-wireframe', {
  schema: {color: {type: 'color', default: '#ffffff'}},

  init: function () {
    this.applyToMesh = this.applyToMesh.bind(this);
    this.el.addEventListener('object3dset', this.applyToMesh);
    this.applyToMesh();
  },

  applyToMesh: function () {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh || !mesh.material) return;
    mesh.material.wireframe = true;
    mesh.material.color.set(this.data.color);
    mesh.material.needsUpdate = true;
  },

  remove: function () {
    this.el.removeEventListener('object3dset', this.applyToMesh);
  }
});
