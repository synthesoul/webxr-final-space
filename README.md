# WebXR Course Archive and Final Space

This repository organizes the WebXR study demos by chapter and keeps the
capstone research artifact separate. The examples follow the progression from
WebGL to Three.js, WebXR, A-Frame, physics, and animated glTF models.

## Chapters and demos

1. [Chapter 2 — WebGL foundations](./chapters/02-webgl-foundations/)
2. [Chapter 3 — WebGL third dimension](./chapters/03-webgl-third-dimension/)
3. [Chapter 4 — matrices and perspective](./chapters/04-webgl-matrices-perspective/)
4. [Chapter 5 — Three.js](./chapters/05-threejs/)
5. [Chapter 6 — WebXR VR](./chapters/06-webxr-vr/)
6. [Chapter 7 — WebXR AR and hit testing](./chapters/07-webxr-ar/)
7. [Chapter 8 — A-Frame ECS](./chapters/08-aframe/)
8. [Chapter 9 — A-Frame physics and interaction](./chapters/09-aframe-physics/)
9. [Chapter 10 — animated glTF and AR deployment](./chapters/10-aframe-gltf-ar/)

## Capstone

[WebXR Final Space](./capstone/webxr-final-space/)

The capstone combines custom GLSL, transforms, Three.js access, WebXR, A-Frame
components, physics, controller interaction, glTF, and animation.

## Research and licensing

- [APA research article](./RESEARCH_ARTICLE.md)
- [Third-party notices](./THIRD_PARTY_NOTICES.md)
- [MIT License](./LICENSE)

The MIT license applies to Christian Busca's original project files. External
libraries, documentation, and the demonstration model retain their own terms.

## Local preview

Serve the archive's parent directory and open the individual chapter folders:

```bash
python3 -m http.server 8081
```

The deployed repository is public at
<https://github.com/synthesoul/webxr-final-space>.
