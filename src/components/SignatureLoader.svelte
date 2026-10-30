<!--
  SignatureLoader.svelte
  Full-Screen Architectural CAD & Calligraphic Editorial Preloader
-->
<div class="signature-intro-loader" id="signature-intro-loader" aria-label="Studio Signature Intro">
  <!-- Precision Technical Viewport Corners -->
  <div class="loader-corner-bracket loader-corner--tl">[+ 0,0] // SYS.INIT</div>
  <div class="loader-corner-bracket loader-corner--tr">[+ 1,0] // CIVIL ENG × DIGITAL</div>
  <div class="loader-corner-bracket loader-corner--bl">[+ 0,1] // 6°12'S 106°50'E</div>
  <div class="loader-corner-bracket loader-corner--br">[+ 1,1] // REV.2026</div>

  <!-- Background Blueprint Technical Watermark & Compass Rings (Static high-precision vector, 0% GPU tile invalidation) -->
  <div class="loader-bg-blueprint" aria-hidden="true">
    <svg class="loader-compass-svg" viewBox="0 0 600 600" fill="none">
      <circle cx="300" cy="300" r="280" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
      <circle cx="300" cy="300" r="220" stroke="rgba(0, 85, 255, 0.12)" stroke-width="1" stroke-dasharray="4 6" />
      <circle cx="300" cy="300" r="140" stroke="rgba(212, 255, 0, 0.08)" stroke-width="1" stroke-dasharray="8 8" />
      <circle cx="300" cy="300" r="60" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1" />
      <line x1="20" y1="300" x2="580" y2="300" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
      <line x1="300" y1="20" x2="300" y2="580" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
      <rect x="295" y="295" width="10" height="10" stroke="#D4FF00" stroke-width="1" fill="none" opacity="0.3" />
    </svg>
  </div>

  <div class="signature-loader-inner">
    <!-- Top Meta Telemetry -->
    <header class="signature-loader-top-meta">
      <div class="loader-meta-left">
        <span class="loader-status-pulse"></span>
        <span class="loader-meta-title">KINETIK.STRUCT // BOOT SEQUENCE</span>
        <span class="loader-iso-badge">ISO-19650 VERIFIED</span>
      </div>
      <div class="loader-meta-right">
        <span class="loader-phase-tag" id="loader-phase-tag">PHASE 01 // CONTINUUM BOOT</span>
        <span class="loader-clock" id="loader-clock-display">00:00:00 LOCAL</span>
      </div>
    </header>

    <!-- Center Hero Presentation -->
    <div class="loader-center-hero">
      <!-- Watermark Name Reveal -->
      <div class="loader-hero-watermark">FARREL</div>
      <div class="loader-hero-sub">CIVIL &amp; STRUCTURAL ENGINEER // FULLSTACK CREATIVE TECHNOLOGIST</div>

      <!-- Signature Vector Stage -->
      <div class="loader-signature-stage">
        <svg class="signature-one-line-svg" viewBox="0 0 1000 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sigStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0066FF" />
              <stop offset="50%" stop-color="#D4FF00" />
              <stop offset="100%" stop-color="#FF2A55" />
            </linearGradient>
          </defs>

          <!-- Halo Trace Layer (crisp, zero filter overhead) -->
          <path
            class="sig-path-trace"
            d="M 20 160 C 110 155, 280 65, 340 90 C 378 106, 260 205, 222 192 C 190 180, 310 86, 370 62 L 285 215 C 318 162, 372 124, 396 165 C 412 190, 444 130, 466 162 C 484 186, 516 122, 542 158 C 568 192, 642 42, 686 60 C 722 75, 584 228, 560 214 C 538 200, 656 122, 704 152 C 736 172, 764 126, 794 156 C 820 182, 856 142, 970 136"
            stroke="rgba(0, 102, 255, 0.18)"
            stroke-width="12"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Main Drawing Calligraphic Path -->
          <path
            id="signature-one-line-path"
            d="M 20 160 C 110 155, 280 65, 340 90 C 378 106, 260 205, 222 192 C 190 180, 310 86, 370 62 L 285 215 C 318 162, 372 124, 396 165 C 412 190, 444 130, 466 162 C 484 186, 516 122, 542 158 C 568 192, 642 42, 686 60 C 722 75, 584 228, 560 214 C 538 200, 656 122, 704 152 C 736 172, 764 126, 794 156 C 820 182, 856 142, 970 136"
            stroke="url(#sigStrokeGrad)"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Real-Time Dynamic Engineering Status Readout -->
      <div class="loader-telemetry-console">
        <div class="loader-pct-huge" id="signature-loader-pct">000%</div>
        <div class="loader-console-line" id="loader-status-msg">
          <span class="console-prefix">&gt;&gt;</span>
          <span class="console-text" id="loader-console-text">INITIALIZING CONTINUUM MECHANICS &amp; TECTONIC SYSTEM...</span>
        </div>
      </div>
    </div>

    <!-- Bottom Architectural Progress Track & Skip CTA -->
    <div class="signature-loader-bottom-bar">
      <div class="loader-progress-track-wrapper">
        <div class="loader-progress-scale">
          <span>000</span>
          <span>025</span>
          <span>050</span>
          <span>075</span>
          <span>100 // TECTONIC LOCK</span>
        </div>
        <div class="loader-progress-track">
          <div class="loader-progress-fill" id="signature-progress-fill" style="width: 0%;"></div>
        </div>
      </div>

      <div class="loader-bottom-actions">
        <div class="loader-tagline-group">
          <span class="sig-tagline">INTENT · INTERACTION · TECTONIC SYSTEM</span>
          <span class="loader-coord-pill">JAKARTA / STUTTGART CAD LAB</span>
        </div>
        <button type="button" class="sig-skip-btn" id="signature-skip-btn">
          <span>ENTER STUDIO</span>
          <span class="key-hint">[↵]</span>
        </button>
      </div>
    </div>
  </div>
</div>
