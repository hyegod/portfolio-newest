<!--
  SectionPasteup.svelte
  Section 05: Draggable Collage Paste-Up Wall & Technical Spec Matrix
-->
<section class="editorial-section" id="sec-collage" data-section-index="06" data-section-name="06. COLLAGE">
  <div id="sec-pasteup" style="position:absolute; top:0; pointer-events:none;" aria-hidden="true"></div>
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 06</span>
        <span>·</span>
        <span>TACTILE STUDIO COLLAGE &amp; CAPABILITY SPEC SHEET</span>
      </div>
      <h2 class="section-oversized-title">
        CREATIVE <span class="serif-italic">Collage</span> &amp; Spec Matrix
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>DRAG ANY STICKER / TAPE ON THE BOARD · CLICK TO STAMP NEW CUTOUTS</div>
      <div style="color:var(--accent-text); font-weight:800;">INTERACTIVE STUDIO MOODBOARD [↓]</div>
    </div>
  </div>

  <div class="collage-sandbox-grid">

    <!-- Left: Interactive Draggable Paste-Up Wall -->
    <div class="draggable-pasteup-board" id="pasteup-board" data-thread-anchor="sec05-pasteup" data-thread-bias="left">
      <div class="pasteup-board-toolbar">
        <div class="pasteup-toolbar-meta">
          <span class="pasteup-toolbar-pill">DRAGGABLE ARTBOARD</span>
          <div class="pasteup-zoom-controls" role="group" aria-label="Pasteup Board Zoom">
            <button type="button" class="pasteup-zoom-btn" id="pasteup-zoom-out" title="Zoom Out" aria-label="Zoom Out">−</button>
            <span class="pasteup-zoom-readout" id="pasteup-zoom-readout">100%</span>
            <button type="button" class="pasteup-zoom-btn" id="pasteup-zoom-in" title="Zoom In" aria-label="Zoom In">+</button>
            <button type="button" class="pasteup-zoom-btn pasteup-zoom-btn--reset" id="pasteup-zoom-reset" title="Reset Zoom" aria-label="Reset Zoom">RESET</button>
          </div>
        </div>
        <button type="button" class="inspect-case-btn" id="spawn-sticker-btn" style="pointer-events:auto; background:var(--acid-lime); color:#0D0D10; font-weight:900;">
          + STAMP NEW CUTOUT
        </button>
      </div>

      <div class="pasteup-canvas-stage" id="pasteup-stage">
        <!-- Draggable Cutout 1 -->
        <div class="draggable-sticker badge-num-circle" style="top: 86px; left: 6%;">04</div>

        <!-- Draggable Cutout 2 -->
        <div class="draggable-sticker torn-tape-sticker" style="top: 88px; left: 32%; background: var(--tape-rose); color: #0D0D10; font-size: 16px; transform: rotate(-7deg);">
          TECTONIC TRIBE<br /><u>EST. 2021</u>
        </div>

        <!-- Draggable Cutout 3 -->
        <div class="draggable-sticker torn-tape-sticker" style="top: 195px; left: 6%; background: var(--electric-blue); color: #FFFFFF; font-family: var(--font-mono); font-size: 11px; font-weight: 800; transform: rotate(3deg);">
          STRUCTURAL ANALYSIS // SAP2000 + ETABS<br />
          SEISMIC BASE SHEAR V = Cs · W
        </div>

        <!-- Draggable Cutout 4 -->
        <div class="draggable-sticker torn-tape-sticker" style="top: 285px; left: 14%; background: var(--tape-slate); color: #F2EFE9; font-family: var(--font-grotesk); font-size: 11.5px; font-weight: 700; transform: rotate(-4deg);">
          BUILT FOR THE STREETS.<br />
          COMPILED FOR THE BROWSER.<br />
          PRINTED ON 300GSM ARCHIVAL STOCK.
        </div>

        <!-- Draggable Cutout 5: Barcode -->
        <div class="draggable-sticker barcode-sticker-box" style="top: 390px; left: 54%; bottom: auto; right: auto;">
          <div class="barcode-bars">
            <div class="barcode-laser-line"></div>
          </div>
          <div class="barcode-digits">9 780201 379624</div>
        </div>

        <!-- Draggable Cutout 6: Acid Lime Spec Stamp -->
        <div class="draggable-sticker" style="top: 395px; left: 6%; background: var(--acid-lime); color: #0D0D10; border: 2px solid #0D0D10; padding: 8px 12px; font-family: var(--font-display); font-weight: 800; font-size: 13px; transform: rotate(4deg); box-shadow: 4px 4px 0 #0D0D10;">
          CIV-ENG × IT × DESIGN
        </div>
      </div>

      <div class="pasteup-board-hint" aria-hidden="true">
        PINCH / WHEEL TO ZOOM · DRAG STAMP
      </div>
    </div>

    <!-- Right: Engineering & Creative Capability Specification Sheet -->
    <div class="engineering-spec-sheet" data-thread-anchor="sec05-specs" data-thread-bias="right">
      <table class="spec-table">
        <thead>
          <tr>
            <th>DOMAIN VECTOR</th>
            <th>CORE STACK &amp; METHODOLOGY</th>
            <th>INDEX</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>01. STRUCTURAL ENG</strong></td>
            <td>
              SAP2000, ETABS, AutoCAD, Civil 3D, BIM (Revit), Finite Element Analysis, Steel &amp; RC Design
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:94%;"></div></div>
            </td>
            <td><strong>94%</strong></td>
          </tr>
          <tr>
            <td><strong>02. CREATIVE TECH / IT</strong></td>
            <td>
              TypeScript, JavaScript (ES2026), Three.js / WebGL, Svelte, GSAP, Anime.js, Python, Rust WASM
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:92%;"></div></div>
            </td>
            <td><strong>92%</strong></td>
          </tr>
          <tr>
            <td><strong>03. EDITORIAL DESIGN</strong></td>
            <td>
              Swiss Typographic Grids, Brand Systems, Print Prepress, Halftone Direction, Blender 3D, Motion
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:96%;"></div></div>
            </td>
            <td><strong>96%</strong></td>
          </tr>
          <tr>
            <td><strong>04. COMPUTATIONAL BIM</strong></td>
            <td>
              Parametric Scripting, GIS Topographic Processing, Automated Drawing Pipelines, Data Visualization
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:89%;"></div></div>
            </td>
            <td><strong>89%</strong></td>
          </tr>
        </tbody>
      </table>

      <div style="padding: 20px; background: var(--bg-paper-alt); border-top: 1.5px solid var(--ink-black); font-family: var(--font-mono); font-size: 11px; display: flex; justify-content: space-between; align-items: center;">
        <span>CERTIFICATION: MULTIDISCIPLINARY STUDIO READY</span>
        <span style="background:var(--acid-lime); color:#0D0D10; padding:3px 8px; font-weight:800; border:1px solid #0D0D10;">ISO-9001 // VERIFIED</span>
      </div>
    </div>

  </div>
</section>
