/* Chapter 4 demos: a small self-contained mat4 implementation for learning. */
const m4 = {
  identity() { return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]); },
  multiply(a,b) { const o=new Float32Array(16); for(let c=0;c<4;c++) for(let r=0;r<4;r++) o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3]; return o; },
  translate(a,x,y,z) { const t=m4.identity(); t[12]=x;t[13]=y;t[14]=z; return m4.multiply(a,t); },
  rotateX(a,r) { const c=Math.cos(r),s=Math.sin(r),t=m4.identity();t[5]=c;t[6]=s;t[9]=-s;t[10]=c;return m4.multiply(a,t); },
  rotateY(a,r) { const c=Math.cos(r),s=Math.sin(r),t=m4.identity();t[0]=c;t[2]=-s;t[8]=s;t[10]=c;return m4.multiply(a,t); },
  rotateZ(a,r) { const c=Math.cos(r),s=Math.sin(r),t=m4.identity();t[0]=c;t[1]=s;t[4]=-s;t[5]=c;return m4.multiply(a,t); },
  perspective(fovy,aspect,near,far) { const f=1/Math.tan(fovy/2), nf=1/(near-far),o=new Float32Array(16);o[0]=f/aspect;o[5]=f;o[10]=(far+near)*nf;o[11]=-1;o[14]=2*far*near*nf;return o; },
};
const canvas=document.querySelector('#gl-canvas'),gl=canvas.getContext('webgl'),mode=document.currentScript.dataset.mode;if(!gl)throw Error('WebGL unavailable');
const vs=`attribute vec3 a_position;attribute vec3 a_color;uniform mat4 u_matrix;varying vec3 v_color;void main(){gl_Position=u_matrix*vec4(a_position,1);v_color=a_color;}`;
const fs=`precision mediump float;varying vec3 v_color;void main(){gl_FragColor=vec4(v_color,1);}`;
function shader(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(x));return x;}
const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
const positions=[[-1,-1,1],[1,-1,1],[1,1,1],[-1,-1,1],[1,1,1],[-1,1,1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[-1,-1,-1],[1,1,-1],[1,-1,-1],[-1,1,-1],[-1,1,1],[1,1,1],[-1,1,-1],[1,1,1],[1,1,-1],[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,-1],[1,-1,1],[-1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,-1],[1,1,1],[1,-1,1],[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,-1,-1],[-1,1,1],[-1,1,-1]].flat();
const faceColors=[[0.1,0.8,1],[1,0.25,0.2],[0.3,1,0.4],[1,0.8,0.1],[0.7,0.25,1],[0.1,1,0.8]],colors=[];for(const c of faceColors)for(let i=0;i<6;i++)colors.push(...c);
function attribute(name,data,size){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);}
attribute('a_position',positions,3);attribute('a_color',colors,3);const matrixLocation=gl.getUniformLocation(program,'u_matrix');gl.enable(gl.DEPTH_TEST);
function resize(){const dpr=Math.min(devicePixelRatio||1,2),w=Math.floor(canvas.clientWidth*dpr),h=Math.floor(canvas.clientHeight*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,w,h);}
let then=0,rotation=0;function render(now){now*=0.001;const dt=now-then;then=now;rotation+=dt;resize();let matrix=m4.identity();if(mode==='perspective'){matrix=m4.perspective(Math.PI/4,canvas.width/canvas.height,0.1,100);let model=m4.identity();model=m4.translate(model,0,0,-5);model=m4.rotateY(model,rotation);model=m4.rotateX(model,rotation*0.7);matrix=m4.multiply(matrix,model);}else{matrix=m4.rotateZ(matrix,rotation);matrix=m4.rotateY(matrix,rotation*0.5);}gl.uniformMatrix4fv(matrixLocation,false,matrix);gl.clearColor(0.02,0.03,0.08,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,36);requestAnimationFrame(render);}requestAnimationFrame(render);
