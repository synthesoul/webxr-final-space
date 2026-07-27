# Animated glTF AR with A-Frame

This is the Chapter 10 example. It loads a Khronos glTF 2.0 binary asset with
the A-Frame `gltf-model` component and loops its embedded animation through
`animation-mixer` from A-Frame Extras.

Local preview:

```text
http://127.0.0.1:8081/16-aframe-gltf-ar/
```

On desktop, drag to look and use WASD or the arrow keys to move. In VR, head
and controller tracking provide movement. In handheld AR, movement comes from
the phone's spatial tracking.

For AR, deploy this folder to an HTTPS host such as GitHub Pages. Do not push
automatically from this workspace. A minimal GitHub Pages workflow is:

```bash
git add 16-aframe-gltf-ar
git commit -m "Add animated glTF AR example"
git push
```

The model is loaded from the Khronos glTF Sample Assets repository for this
teaching demo. For a portfolio deployment, download an appropriately licensed
asset into `assets/` and change the `<a-asset-item>` URL to a relative path.
