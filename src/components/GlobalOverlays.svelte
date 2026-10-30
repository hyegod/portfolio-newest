<!--
  GlobalOverlays.svelte
  Tactile pre-baked paper grain, magazine fold creases, architectural grid,
  global scroll-driven Three.js WebGL background canvas, and custom CAD cursor.
-->
<script>
  import { onMount } from 'svelte';

  let showBottomFade = false;

  onMount(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      showBottomFade = y > 220;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<div class="paper-grain-overlay" aria-hidden="true"></div>
<div class="paper-fold-creases" aria-hidden="true"></div>
<div class="architectural-grid-bg" aria-hidden="true"></div>
<div class="bottom-horizon-slot-fade" class:is-active={showBottomFade} aria-hidden="true"></div>

<canvas id="webgl-bg-canvas" aria-hidden="true"></canvas>

<div class="cad-cursor" id="cad-cursor" aria-hidden="true">
  <div class="cad-cursor-ring"></div>
  <div class="cad-cursor-coords" id="cad-cursor-coords">X:0420 Y:0310</div>
</div>
