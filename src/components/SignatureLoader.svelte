<!--
  SignatureLoader.svelte
  True Edge-to-Edge Full-Bleed Architectural Preloader
-->
<div class="signature-intro-loader" id="signature-intro-loader" aria-label="Studio Signature Intro">
  <!-- Top Global System Bar -->
  <header class="loader-top-bar">
    <div class="loader-bar-cell loader-bar-cell--brand">
      <span class="loader-pulse-dot"></span>
      <span class="loader-brand-txt">KINETIK.STRUCT // DEV.BUILD.2026</span>
    </div>
    <div class="loader-bar-cell loader-bar-cell--center">
      <span class="loader-system-status" id="loader-phase-tag">INITIALIZING CONTINUUM MECHANICS</span>
    </div>
    <div class="loader-bar-cell loader-bar-cell--controls">
      <span class="loader-live-clock" id="loader-clock-display">00:00:00 LOCAL</span>
      <button type="button" class="loader-fs-btn" id="loader-fullscreen-btn" title="Toggle Fullscreen">⛶ FULLSCREEN</button>
      <button type="button" class="loader-enter-btn" id="signature-skip-btn">ENTER STUDIO [↵]</button>
    </div>
  </header>

  <!-- Giant Center Full-Screen Canvas -->
  <div class="loader-stage-canvas">
    <!-- Huge Screen-Filling Kinetic Watermark -->
    <div class="loader-big-headline" aria-hidden="true">
      <div class="loader-line-top">KINETIK</div>
      <div class="loader-line-bot">TECTONIC</div>
    </div>

    <!-- Edge-to-Edge Animated Signature Path -->
    <div class="loader-signature-wrap">
      <svg class="loader-signature-svg" viewBox="0 0 1600 360" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sigStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0066FF" />
            <stop offset="50%" stop-color="#D4FF00" />
            <stop offset="100%" stop-color="#FF2A55" />
          </linearGradient>
        </defs>

        <!-- Ambient Backdrop Halo (clean, zero filter) -->
        <path
          d="M 30 210 C 180 200, 440 70, 540 110 C 600 135, 410 270, 350 250 C 300 235, 490 105, 590 75 L 455 285 C 505 215, 595 165, 635 220 C 660 252, 715 170, 750 215 C 780 248, 835 158, 875 210 C 915 258, 1030 50, 1105 78 C 1160 98, 940 308, 905 288 C 870 268, 1060 158, 1135 200 C 1188 230, 1235 165, 1290 208 C 1330 242, 1395 185, 1570 175"
          stroke="rgba(0, 102, 255, 0.22)"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Main Sharp Neon Stroke -->
        <path
          id="signature-one-line-path"
          d="M 30 210 C 180 200, 440 70, 540 110 C 600 135, 410 270, 350 250 C 300 235, 490 105, 590 75 L 455 285 C 505 215, 595 165, 635 220 C 660 252, 715 170, 750 215 C 780 248, 835 158, 875 210 C 915 258, 1030 50, 1105 78 C 1160 98, 940 308, 905 288 C 870 268, 1060 158, 1135 200 C 1188 230, 1235 165, 1290 208 C 1330 242, 1395 185, 1570 175"
          stroke="url(#sigStrokeGrad)"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Giant Screen Percentage & Live Telemetry -->
    <div class="loader-counter-layer">
      <div class="loader-huge-num" id="signature-loader-pct">000%</div>
      <div class="loader-sub-status" id="loader-console-text">INITIALIZING CONTINUUM MECHANICS &amp; TECTONIC SYSTEM...</div>
    </div>
  </div>

  <!-- Bottom Global Full-Bleed Progress Strip -->
  <footer class="loader-bottom-bar">
    <div class="loader-bar-cell loader-bar-cell--meta">
      <span>LAT 6°12'S · LONG 106°50'E</span>
      <span>CIVIL &amp; STRUCTURAL × FULLSTACK</span>
    </div>
    <div class="loader-bar-cell loader-bar-cell--spec">
      <span>ISO-19650-2 VERIFIED</span>
      <span>TECTONIC // BUILT TO LAST</span>
    </div>
  </footer>

  <!-- 100% Full-Bleed Progress Line at the very bottom border -->
  <div class="loader-fullbleed-progress">
    <div class="loader-fullbleed-bar" id="signature-progress-fill" style="width: 0%;"></div>
  </div>
</div>
