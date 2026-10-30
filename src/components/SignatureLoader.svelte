<!--
  SignatureLoader.svelte
  One-Line Architectural & Calligraphic Signature Intro Preloader (Daksh Gajjar Homage)
-->
<div class="signature-intro-loader" id="signature-intro-loader" aria-label="Studio Signature Intro">
  <div class="signature-loader-inner">
    <div class="signature-loader-top-meta">
      <span>KINETIK.STRUCT // INDEPENDENT DIGITAL &amp; ENGINEERING STUDIO</span>
      <span id="signature-loader-pct">00%</span>
    </div>

    <svg class="signature-one-line-svg" viewBox="0 0 900 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sigStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0055FF" />
          <stop offset="50%" stop-color="#D4FF00" />
          <stop offset="100%" stop-color="#FF3355" />
        </linearGradient>
      </defs>
      <path
        id="signature-one-line-path"
        d="M 10 155 C 95 152, 260 65, 315 88 C 350 104, 240 198, 205 186 C 175 175, 290 85, 345 62 L 265 205 C 295 155, 345 120, 368 158 C 382 182, 412 125, 432 155 C 448 178, 478 118, 502 152 C 525 185, 595 42, 635 58 C 668 72, 540 218, 518 205 C 498 192, 608 118, 652 146 C 682 165, 708 122, 735 150 C 758 174, 790 138, 890 132"
        stroke="url(#sigStrokeGrad)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <div class="signature-loader-bottom-bar">
      <span class="sig-tagline">INTENT · INTERACTION · TECTONIC SYSTEM</span>
      <button type="button" class="sig-skip-btn" id="signature-skip-btn">ENTER STUDIO [↵]</button>
    </div>
  </div>
</div>
