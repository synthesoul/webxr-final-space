AFRAME.registerComponent('pushable', {
  schema: {strength: {type: 'number', default: 2.5}},

  init: function () {
    this.ready = false;
    this.onBodyLoaded = () => { this.ready = true; };
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('body-loaded', this.onBodyLoaded);
    this.el.addEventListener('click', this.onClick);
    this.el.addEventListener('collide', () => {
      this.el.setAttribute('material', 'emissive', '#ffffff');
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => {
        this.el.setAttribute('material', 'emissive', '#000000');
      }, 100);
    });
  },

  onClick: function (event) {
    if (!this.ready || !this.el.body || !window.CANNON) return;
    const origin = this.el.body.position;
    const point = event.detail && event.detail.intersection && event.detail.intersection.point;
    const direction = point
      ? new CANNON.Vec3(origin.x - point.x, 0.35, origin.z - point.z)
      : new CANNON.Vec3(0, 0.35, 1);
    direction.normalize();
    direction.scale(this.data.strength, direction);
    this.el.body.applyImpulse(direction, origin);
  },

  remove: function () {
    this.el.removeEventListener('body-loaded', this.onBodyLoaded);
    this.el.removeEventListener('click', this.onClick);
    clearTimeout(this.flashTimer);
  }
});
