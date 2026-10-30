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
    <div class="theme-dropdown-wrap">
      <span class="theme-select-prefix">THEME:</span>
      <select class="theme-dropdown-select" id="theme-dropdown-select" aria-label="Visual Theme Mode">
        <option value="editorial">PAPER</option>
        <option value="blueprint">BLUEPRINT</option>
        <option value="cyber">TERMINAL</option>
      </select>
      <span class="theme-select-caret" aria-hidden="true">▾</span>
    </div>

    <button type="button" class="speed-toggle-btn" id="speed-toggle-btn" title="Toggle Speed Mode (Disables 3D Background & Optimizes Animations)">
      <span class="speed-bolt">⚡</span>
      <span class="speed-label">SPEED:</span>
      <span class="speed-state-text">OFF</span>
    </button>

    <button type="button" class="xray-toggle-btn" id="xray-toggle-btn" title="Toggle Structural CAD X-Ray Overlays">
      <span>⌖ X-RAY:</span>
      <span class="xray-state-text">OFF</span>
    </button>

    <div class="page-counter-badge" id="editorial-page-counter">01 / 06</div>
  </div>
</header>
