# WebXR Final Space: A Layered Web Architecture for Interactive VR and AR

**Author:** Christian Busca  
**Document type:** Technical research article / portfolio study  
**Date:** July 27, 2026

## Abstract

WebXR development can combine low-level graphics programming with higher-level
frameworks. This study examines WebXR Final Space, a browser-based prototype
that combines custom GLSL, Three.js object access, the WebXR Device API,
A-Frame's entity-component system, physics, controller input, glTF delivery,
and animation. The implementation demonstrates that layered abstractions can
preserve access to rendering operations while reducing boilerplate. Functional
review confirmed that the source parses, the scene is served locally, and the
prototype contains stations for shaders, transforms, physics, input, and
animated assets. This is a teaching and portfolio artifact, not a controlled
performance study.

**Keywords:** WebXR, A-Frame, Three.js, WebGL, glTF, augmented reality,
virtual reality, entity-component system

## Introduction

The WebXR Device API provides web applications with interfaces for virtual and
augmented reality hardware, including sensors, displays, and tracked input
devices (World Wide Web Consortium [W3C], 2026). Developing an XR application
involves several layers: WebGL exposes GPU-oriented rendering, Three.js
organizes rendering into a JavaScript scene graph, and A-Frame adds declarative
HTML syntax and an entity-component-system architecture.

Baruah (2021) presents a progression from WebGL fundamentals through Three.js,
WebXR, A-Frame, physics, and animated glTF models. WebXR Final Space implements
that progression as one integrated demonstration. The design question is
whether a compact A-Frame prototype can combine low-level graphics concepts and
higher-level XR abstractions without removing access to the underlying
rendering system.

## Background

A-Frame's current documentation describes `<a-scene>` as handling much of the
WebGL, camera, renderer, render-loop, and WebXR setup while custom components
remain available through `AFRAME.registerComponent` (Supermedium, n.d.-a,
n.d.-b). The asset layer uses glTF 2.0, an efficient runtime format for
transmitting 3D scenes and models, including meshes, materials, skins, and
animations (Khronos Group, n.d.). The physics layer uses the open-source
A-Frame physics system, which provides dynamic and static bodies, gravity,
collisions, friction, and restitution (n5ro, n.d.).

## Method

The project was implemented as a static A-Frame page with one JavaScript file
and versioned CDN dependencies. The scene contains four stations:

1. **Shader station:** a custom `THREE.ShaderMaterial` uses GLSL vertex and
   fragment shaders to create a pulsing orb.
2. **Model station:** a Khronos CesiumMan `.glb` asset is loaded with
   `gltf-model` and animated with A-Frame Extras' `animation-mixer`.
3. **Physics station:** dynamic sphere, box, and cylinder bodies fall under
   gravity and respond to mouse clicks or XR controller selections.
4. **Navigation and XR station:** camera controls support mouse-look,
   WASD/arrow-key movement, WebXR mode entry, and controller rays.

The custom `matrix-spin` component changes rotation each frame. `shader-orb`
waits for the underlying Three.js mesh and replaces its material with a shader
material. `model-status` reports model loading events. `pushable` translates
A-Frame click events into impulses applied to a physics body.

## Results

The prototype unified the requested layers in a small scene. The custom shader
executes inside an A-Frame entity, demonstrating that framework abstraction
does not prevent direct Three.js and GLSL work. Physics bodies provide visible
movement and user-triggered impulses. The glTF station demonstrates how an
external asset can carry geometry, materials, hierarchy, and animation data
without manually defining every vertex. Camera and controller configuration
provide desktop fallback while preserving an XR path.

Validation was proportionate to the prototype's scope: `main.js` passed Node.js
syntax checking, the page loaded from the local HTTP server, and the repository
contains deployment and attribution notes. These checks establish that the
artifact is structurally runnable; they do not prove device compatibility,
frame-rate targets, accessibility compliance, or cross-browser equivalence.

## Discussion

The main design benefit is progressive disclosure. A learner can first view the
scene as HTML entities, then inspect a custom component, then follow the call
through `getObject3D('mesh')` to a Three.js material and GLSL shader. This makes
the project both a working demo and a map of the graphics stack.

The design also exposes tradeoffs. CDN dependencies reduce setup cost but make
the demo dependent on network availability and external version stability. A
remote sample model is convenient for study, but a public portfolio should
download an appropriately licensed asset and serve it from the repository.
Physics systems simplify collision behavior but add runtime cost and do not
automatically solve locomotion comfort. WebXR support varies by browser,
permissions, and hardware; the W3C specification remains a Candidate
Recommendation Draft and may change (W3C, 2026).

## Deployment and responsible publication

The repository is prepared for GitHub Pages. GitHub documents that Pages sites
support HTTPS and can enforce HTTPS, which is important for XR permissions and
for preventing mixed-content failures (GitHub, n.d.). Before publication, the
asset URL should be reviewed, third-party licenses should remain documented,
and deployment should be tested from the target phone or headset.

The original project code is released under the MIT License. The MIT notice
does not replace the licenses of A-Frame, A-Frame Extras, the physics system,
or the Khronos sample asset; those dependencies remain governed by their own
terms in `THIRD_PARTY_NOTICES.md`.

## AI-use disclosure

Generative AI was used as a development assistant to organize chapter concepts,
draft portions of the technical documentation, suggest code structure, and
identify official documentation sources. Christian Busca reviewed the files,
selected the implementation scope, tested the JavaScript and local server
behavior, and remains responsible for the final code, claims, citations,
licensing decisions, and publication. AI output is not treated as a source;
external claims are attributed to the cited documentation or book.

## Limitations and future work

This article reports a functional prototype, not a user study or benchmark.
Future work should measure frame time and memory on target devices, replace the
remote model with a licensed local asset, add accessible non-XR controls and
captions, test immersive AR hit testing on multiple devices, and compare the
same scene implemented with raw WebGL, Three.js, and A-Frame.

## Conclusion

WebXR Final Space demonstrates a layered architecture for learning and
prototyping immersive web content. The project preserves the path from shaders
and transformations to scene graphs, XR sessions, ECS components, physics,
models, and deployment. A-Frame does not eliminate the graphics pipeline; it
makes that pipeline approachable while leaving an escape hatch to Three.js and
GLSL when the application needs it.

## References

Baruah, R. (2021). *AR and VR using the WebXR API: Learn to create immersive
content with WebGL, Three.js, and A-Frame*. Apress.
https://doi.org/10.1007/978-1-4842-6318-1

GitHub. (n.d.). *Securing your GitHub Pages site with HTTPS*. Retrieved July 27,
2026, from https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

Khronos Group. (n.d.). *glTF registry*. Retrieved July 27, 2026, from
https://registry.khronos.org/glTF/

n5ro. (n.d.). *aframe-physics-system*. Retrieved July 27, 2026, from
https://github.com/n5ro/aframe-physics-system

Supermedium. (n.d.-a). *A-Frame documentation* (Version 1.8.0). Retrieved July
27, 2026, from https://aframe.io/docs/1.8.0/introduction/

Supermedium. (n.d.-b). *Entity-component-system*. Retrieved July 27, 2026,
from https://aframe.io/docs/1.8.0/introduction/entity-component-system.html

World Wide Web Consortium. (2026, March 16). *WebXR Device API: Candidate
Recommendation Draft*. https://www.w3.org/TR/webxr/
