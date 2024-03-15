---
layout: default
title: Assemblage
parent: Etapes de fabrication
nav_order: 2
---

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Mon modeèle 3D</title>
        <script src="https://modelviewer.dev/shared/model-viewer-base.js"></script>
    </head>
    <body>
        <p>mon nouveau projet !</p>
        <model-viewer src="Part.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="commerce" poster="poster.webp" shadow-intensity="1.4" environment-image="1570644046.jpg" skybox-image="1570644046.jpg" exposure="2" shadow-softness="0.46" auto-rotate>
            <div class="progress-bar hide" slot="progress-bar">
                <div class="update-bar"></div>
            </div>
            <button slot="ar-button" id="ar-button">
                View in your space
            </button>
            <div id="ar-prompt">
                <img src="https://modelviewer.dev/shared-assets/icons/hand.png">
            </div>
        </model-viewer>
          </body>
</html>
