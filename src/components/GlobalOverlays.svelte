<!--
  GlobalOverlays.svelte
  Tactile pre-baked paper grain, magazine fold creases, architectural grid,
  global scroll-driven Three.js WebGL background canvas, and CAD cursor.
-->
<div class="paper-grain-overlay" aria-hidden="true"></div>
<div class="paper-fold-creases" aria-hidden="true"></div>
<div class="architectural-grid-bg" aria-hidden="true"></div>

<canvas id="webgl-bg-canvas" aria-hidden="true"></canvas>

<div class="cad-cursor" id="cad-cursor" aria-hidden="true">
  <div class="cad-cursor-ring"></div>
  <div class="cad-cursor-coords" id="cad-cursor-coords">X:0420 Y:0310</div>
</div>
