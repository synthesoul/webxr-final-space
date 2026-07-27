# WebXR Final Space

This capstone combines the course progression into one A-Frame scene:

| Course idea | Demo feature |
| --- | --- |
| WebGL and GLSL | `shader-orb` uses a custom vertex/fragment shader |
| Matrices and transformations | `matrix-spin`, rotations, positions, and scales |
| Three.js | A-Frame reaches `THREE.ShaderMaterial` and `object3D` |
| WebXR VR/AR | A-Frame XR mode UI, WebXR optional features, controllers |
| A-Frame ECS | Declarative entities plus custom components |
| Physics | CANNON-based dynamic bodies, gravity, collisions, impulses |
| User interaction | Mouse cursor and XR controller rays push objects |
| glTF | Khronos CesiumMan `.glb` asset |
| Animation | A-Frame Extras `animation-mixer` |
| Deployment | HTTPS-ready structure for GitHub Pages |

Run locally:

```text
http://127.0.0.1:8081/17-final-space/
```

Desktop controls: drag to look, use WASD/arrow keys to move, and click the
physics bodies. In immersive XR, use physical movement and controller triggers.

The model is loaded from the Khronos sample repository for demonstration. For
public deployment, replace it with a locally hosted asset whose license you
have verified. This project is prepared locally; it has not been pushed to
GitHub.
