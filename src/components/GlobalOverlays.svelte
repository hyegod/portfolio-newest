<!--
  GlobalOverlays.svelte
  Clean Swiss Architectural Grid, Subtle Tactile Paper Grain & Pure Cyber Kinetic Wave
-->
<script>
  import { onMount } from 'svelte';
  import { initPrebakedPaperGrain, initKineticWaveBackground } from '../lib/scene3d.js';

  onMount(() => {
    initPrebakedPaperGrain();

    // Defer wave canvas until loader is dismissed so GPU is 100% dedicated to loader!
    const startWave = () => {
      initKineticWaveBackground();
    };

    const loader = document.getElementById('signature-intro-loader');
    if (!loader || loader.classList.contains('is-dismissed')) {
      startWave();
    } else {
      window.addEventListener('signature-dismissed', startWave, { once: true });
    }
  });
</script>

<!-- Subtle Tactile Paper Grain -->
<div class="paper-grain-overlay" aria-hidden="true"></div>

<!-- Swiss Architectural CAD Blueprint Grid -->
<div class="architectural-grid-bg" aria-hidden="true"></div>

<!-- Cyber Kinetic Wave & Seismic Frequency Canvas (Single Dedicated Background) -->
<div class="cyber-kinetic-wave-layer" id="cyber-kinetic-wave-layer" aria-hidden="true">
  <canvas id="kinetic-wave-canvas"></canvas>
</div>
