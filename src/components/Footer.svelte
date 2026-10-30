<!--
  Footer.svelte
  Fixed Editorial Footer Bar with Concentric Registration Crosshair (⌖)
-->
<footer class="editorial-footer-bar">
  <div class="registration-crosshair-dock" title="Registration Target Crosshair">
    <svg id="footer-crosshair-svg" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10" stroke="currentColor" stroke-width="1.3"/>
      <circle cx="16" cy="16" r="5" stroke="currentColor" stroke-width="1.2"/>
      <line x1="16" y1="0" x2="16" y2="32" stroke="currentColor" stroke-width="1.3"/>
      <line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" stroke-width="1.3"/>
    </svg>
  </div>

  <div class="footer-telemetry">
    <span class="telemetry-live-dot"></span>
    <span id="footer-live-coords">GRID [0420, 0310]</span>
  </div>

  <div class="footer-pillars-ticker">
    <span>CIVIL ENG</span>
    <span class="bullet">·</span>
    <span>IT SYSTEMS</span>
    <span class="bullet">·</span>
    <span>GRAPHIC DESIGN</span>
    <span class="bullet">·</span>
    <span>CULTURE</span>
  </div>

  <div class="footer-domain">
    KINETIK-STRUCT.STUDIO
  </div>
</footer>
