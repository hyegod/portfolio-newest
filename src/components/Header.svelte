<!--
  Header.svelte
  Fixed Editorial Header Bar ("KINETIK.STRUCT | STUDIO KIT | 01 / 06")
-->
<header class="editorial-header">
  <div class="header-brand">
    <span class="header-brand-dot"></span>
    <span class="header-brand-title">KINETIK.STRUCT</span>
    <span class="header-brand-sub">STUDIO KIT</span>
    <span class="header-availability-pill" title="Available for Q4 Commissions &amp; R&amp;D">
      <span class="avail-dot"></span>
      <span>AVAILABLE // Q4</span>
    </span>
  </div>

  <nav class="header-center-nav" aria-label="Primary Editorial Navigation">
    <a href="#sec-spread" class="header-nav-link active">01. SPREAD</a>
    <a href="#sec-pillars" class="header-nav-link">02. IDENTITY</a>
    <a href="#sec-cad-3d" class="header-nav-link">03. 3D CAD</a>
    <a href="#sec-archive" class="header-nav-link">04. ARCHIVE</a>
    <a href="#sec-pasteup" class="header-nav-link">05. COLLAGE</a>
    <a href="#sec-dispatch" class="header-nav-link">06. DISPATCH</a>
  </nav>

  <div class="header-right-controls">
    <div class="mode-pill-group" role="group" aria-label="Visual Mode Switcher">
      <button type="button" class="mode-btn active" data-theme-mode="editorial" title="Warm Cream Editorial Paper">PAPER</button>
      <button type="button" class="mode-btn" data-theme-mode="blueprint" title="Electric Blue Engineering Blueprint">BLUEPRINT</button>
      <button type="button" class="mode-btn" data-theme-mode="cyber" title="Deep Black Cyber Terminal">TERMINAL</button>
    </div>

    <button type="button" class="xray-toggle-btn" id="xray-toggle-btn" title="Toggle Structural CAD X-Ray Overlays">
      <span>⌖ X-RAY:</span>
      <span class="xray-state-text">OFF</span>
    </button>

    <div class="page-counter-badge" id="editorial-page-counter">01 / 06</div>
  </div>
</header>
