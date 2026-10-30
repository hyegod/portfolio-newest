<!--
  GlobalOverlays.svelte
  Tactile Brutalist Industrial Paper, Halftone Screen-Print & Architectural Watermarks
  Supports Theme Toggles:
  - Option 3: Brutalist Industrial & Halftone Paper (Active default)
  - Option 4: Cyber Kinetic Wave & Seismic Frequency Mesh
-->
<script>
  import { onMount } from 'svelte';
  import { initPrebakedPaperGrain, initKineticWaveBackground } from '../lib/scene3d.js';

  onMount(() => {
    // Set default background style to Option 3: Brutalist Zine
    if (!document.documentElement.getAttribute('data-bg-style')) {
      document.documentElement.setAttribute('data-bg-style', 'zine');
    }
    initPrebakedPaperGrain();
    initKineticWaveBackground();
  });
</script>

<!-- 1. Tactile Rough Pulp & Paper Fiber Grain (256x256 procedural off-screen canvas) -->
<div class="paper-grain-overlay" aria-hidden="true"></div>

<!-- 2. Authentic Screen-Print Halftone Dot Matrix -->
<div class="halftone-screen-overlay" aria-hidden="true"></div>

<!-- 3. Swiss Architectural Graph Grid with 100px Macro & 20px Micro Cadence -->
<div class="architectural-grid-bg" aria-hidden="true"></div>

<!-- 4. Industrial Drafting Watermarks, Rubber Stamps & Stencils (Ghosted behind editorial cards) -->
<div class="industrial-watermarks-layer" aria-hidden="true">
  <!-- Top Left Stamp: Registered Civil & Structural Practitioner Seal -->
  <div class="industrial-stamp stamp--seal-tl">
    <svg viewBox="0 0 160 160" class="stamp-seal-svg">
      <circle cx="80" cy="80" r="74" stroke="currentColor" stroke-width="2.5" fill="none" stroke-dasharray="6 3"/>
      <circle cx="80" cy="80" r="66" stroke="currentColor" stroke-width="1" fill="none"/>
      <path id="seal-text-path-1" d="M 80,80 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" fill="none"/>
      <text font-family="'JetBrains Mono', monospace" font-size="7.6" font-weight="800" letter-spacing="2.2" fill="currentColor">
        <textPath href="#seal-text-path-1" startOffset="50%" text-anchor="middle">
          ★ STRUCTURAL &amp; CIVIL ENG · FARREL KINETIK ★
        </textPath>
      </text>
      <circle cx="80" cy="80" r="28" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <text x="80" y="77" font-family="'Syne', sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="currentColor">SNI</text>
      <text x="80" y="89" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor">1726:2019</text>
    </svg>
  </div>

  <!-- Mid-Right Boxed Inspection Stamp: ISO 19650 Structural Spec -->
  <div class="industrial-stamp stamp--batch-tr">
    <div class="stamp-box-inner">
      <div class="stamp-box-header">★ ISO 19650-2 VERIFIED ★</div>
      <div class="stamp-box-title">TECTONIC CONTINUUM</div>
      <div class="stamp-box-meta">
        <span>BATCH: #2026-CE-08</span>
        <span>GRADE: FE-500D</span>
        <span>TOL: ±0.05mm</span>
      </div>
      <div class="stamp-box-barcode">||| | |||| || ||| |||| | ||</div>
    </div>
  </div>

  <!-- Industrial Corner Diagonal Hazard / Drafting Hatch -->
  <div class="industrial-hatch-corner corner--tl"></div>
  <div class="industrial-hatch-corner corner--br"></div>

  <!-- Left & Right Metric CAD Calibration Rulers -->
  <div class="industrial-cad-ruler ruler--left">
    <span>000</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span><span>700</span><span>800</span><span>900</span><span>1000mm</span>
  </div>
  <div class="industrial-cad-ruler ruler--right">
    <span>000</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span><span>700</span><span>800</span><span>900</span><span>1000mm</span>
  </div>

  <!-- Ghosted Massive Vertical Structural Watermark Typography -->
  <div class="industrial-giant-text giant-text--left">
    CONTINUUM MECHANICS // FINITE ELEMENT EQUILIBRIUM
  </div>
  <div class="industrial-giant-text giant-text--right">
    DIGITAL TECTONICS × SWISS EDITORIAL ARCHITECTURE
  </div>
</div>

<!-- 5. Option 4: Cyber Kinetic Wave & Seismic Frequency Canvas (Interactive layer, active when toggled) -->
<div class="cyber-kinetic-wave-layer" id="cyber-kinetic-wave-layer" aria-hidden="true">
  <canvas id="kinetic-wave-canvas"></canvas>
</div>
