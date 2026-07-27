const canvas = document.querySelector('#gl-canvas');
const gl = canvas.getContext('webgl');
if (!gl) throw new Error('WebGL unavailable');
gl.clearColor(0.14, 0.05, 0.25, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
