AFRAME.registerComponent('model-status', {
  init: function () {
    const status = document.querySelector('#status');
    this.el.addEventListener('model-loaded', () => {
      status.setAttribute('value', 'glTF loaded — enter AR or inspect on desktop');
    });
    this.el.addEventListener('model-error', (event) => {
      console.error('glTF model failed to load', event.detail);
      status.setAttribute('value', 'Model failed to load — check the console');
    });
  }
});
