<!--
  SectionArchive.svelte
  Section 04: Multidisciplinary Selected Works Archive
  (Projects 01–04 with Tilted Serrated Receipts, 4-Column Assessment Strips,
  Giant Bleed Titles, and Circular VIEW Buttons)
-->
<script>
  import { playMechanicalTick } from '../lib/interactions.js';

  let activeFolder = 0;

  function selectFolder(n) {
    if (n === activeFolder) return;
    activeFolder = n;
    playMechanicalTick(980, 0.03);
    setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 720);
  }
</script>

<section class="editorial-section" id="sec-archive" data-section-index="05" data-section-name="05. ARCHIVE">
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 05</span>
        <span>·</span>
        <span>WORK YANG LAMA // RETROSPECTIVE ARCHIVE (2021 — 2024)</span>
      </div>
      <h2 class="section-oversized-title">
        HISTORICAL <span class="serif-italic">Archive</span> &amp; Past Works
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>ARSIP PROJECT &amp; RISET TERDAHULU · 4 COMPLETED DOSSIERS</div>
      <div>KLIK FOLDER TAB UNTUK MEMBUKA DETAIL SPESIFIKASI [↓]</div>
    </div>
  </div>

  <div class="archive-filter-bar">
    <div class="filter-pills" role="group" aria-label="Filter Archive Projects">
      <button type="button" class="filter-pill-btn active" data-archive-filter="all">ALL WORKS [04]</button>
      <button type="button" class="filter-pill-btn" data-archive-filter="civil">CIVIL // STRUCTURAL</button>
      <button type="button" class="filter-pill-btn" data-archive-filter="it">IT // COMPUTATIONAL</button>
      <button type="button" class="filter-pill-btn" data-archive-filter="design">GRAPHIC // EDITORIAL</button>
    </div>
    <div style="font-family:var(--font-mono); font-size:11px; font-weight:700;">
      DRAWING SCALE: 1:100 // ISO-A1
    </div>
  </div>

  <div class="archive-folder-stack" aria-label="Selected works folders">

    <!-- PROJECT 01 -->
    <article
      class="archive-folder"
      class:is-active={activeFolder === 0}
      style="--i:0; --folder-bg:#6E7160; --folder-fg:#F2EFE9;"
      data-categories="civil it"
      data-thread-anchor="sec04-prj01"
      data-thread-bias="left"
    >
      <button
        type="button"
        class="folder-strip"
        aria-expanded={activeFolder === 0}
        aria-controls="folder-body-0"
        aria-label="Open folder AERO-TRUSS"
        on:click={() => selectFolder(0)}
      >
        <span class="folder-tab" aria-hidden="true">
          <span class="folder-tab-text">
            <span class="folder-tab-name">DIGITAL TWIN</span>
            <span class="folder-tab-code">CODE_001 //</span>
          </span>
        </span>
        <span class="folder-spine-title">AERO-TRUSS</span>
        <span class="folder-spine-file">FILE_01// 2025</span>
      </button>

      <div class="folder-body" id="folder-body-0" inert={activeFolder !== 0 ? true : null}>
      <div class="folder-sheet">
        <div class="dossier-top-meta">
          <span>01 / STRUCTURAL DIGITAL TWIN</span>
          <span style="color:var(--accent-text);">CIVIL ENG × WEBGL WASM</span>
        </div>
        <div class="dossier-visual-preview">
          <svg class="dossier-svg-blueprint" id="svg-truss-blueprint" viewBox="0 0 600 270" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect id="truss-bg-rect" width="600" height="270" fill="#0D0D12"/>
            <g stroke="rgba(0, 85, 255, 0.22)" stroke-width="1">
              <line x1="0" y1="45" x2="600" y2="45"/><line x1="0" y1="90" x2="600" y2="90"/>
              <line x1="0" y1="135" x2="600" y2="135"/><line x1="0" y1="180" x2="600" y2="180"/>
              <line x1="0" y1="225" x2="600" y2="225"/>
              <line x1="100" y1="0" x2="100" y2="270"/><line x1="200" y1="0" x2="200" y2="270"/>
              <line x1="300" y1="0" x2="300" y2="270"/><line x1="400" y1="0" x2="400" y2="270"/>
              <line x1="500" y1="0" x2="500" y2="270"/>
            </g>
            <path id="truss-arch-path" d="M 40 210 Q 300 40 560 210" fill="none" stroke="#D4FF00" stroke-width="3" style="transition: d 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease;"/>
            <line x1="40" y1="210" x2="560" y2="210" stroke="#F2EFE9" stroke-width="2.5"/>
            <polyline id="truss-web-poly" points="40,210 105,152 170,210 235,126 300,210 365,126 430,210 495,152 560,210" fill="none" stroke="#0055FF" stroke-width="2" style="transition: points 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease;"/>
            <circle id="truss-load-dot" cx="300" cy="125" r="6" fill="#FF3355" style="transition: cy 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), r 0.3s ease, fill 0.3s ease;"/>
            <g id="truss-deflection-badge">
              <rect x="420" y="16" width="162" height="24" fill="rgba(13,13,18,0.88)" stroke="#0055FF" stroke-width="1"/>
              <text id="truss-deflection-text" x="430" y="32" fill="#D4FF00" font-family="JetBrains Mono" font-size="10" font-weight="bold">δ = -12.4mm [OK]</text>
            </g>
            <text x="24" y="32" fill="#D4FF00" font-family="JetBrains Mono" font-size="11" font-weight="bold">FIG 1.1 // TIED-ARCH FEM DIGITAL TWIN (L = 180m)</text>
          </svg>
        </div>
        <div class="dossier-content">
          <div class="dossier-col-info">
            <h3 class="dossier-title">AERO-TRUSS // Parametric Bridge Digital Twin</h3>
            <p class="dossier-summary">
              Real-time structural health monitoring &amp; finite-element stress analyzer compiled from Rust to WebAssembly with interactive Three.js orthographic blueprints.
            </p>
            <div class="dossier-tech-tags">
              <span class="tech-chip">STRUCTURAL FEM</span>
              <span class="tech-chip">RUST / WASM</span>
              <span class="tech-chip">THREE.JS</span>
              <span class="tech-chip">SNI 1725</span>
            </div>
            <div class="dossier-footer">
              <span>YEAR: 2025 // JAKARTA</span>
              <button type="button" class="inspect-case-btn" data-open-dossier="prj-01">OPEN DOSSIER [+]</button>
            </div>
          </div>
          <div class="dossier-col-telemetry">
            <div class="system-receipt-card system-receipt--tilted-left" id="receipt-prj-01">
              <div class="receipt-header">
                <span>SPAN BAY 04 // TELEMETRY LEDGER</span>
                <span class="receipt-status-pill">ΦRn ≥ Nu [FILED]</span>
              </div>
              <div class="receipt-ledger-rows">
                <div class="receipt-row">
                  <span>DEAD LOAD (G_k)</span>
                  <span class="val-plus">+ 12,400 kN</span>
                </div>
                <div class="receipt-row">
                  <span>LIVE TRAFFIC (Q_k)</span>
                  <span class="val-plus" id="truss-live-qk">+ 5,800 kN</span>
                </div>
                <div class="receipt-row">
                  <span>TMD WIND DAMPING</span>
                  <span class="val-minus">− 1,920 kN</span>
                </div>
                <div class="receipt-row receipt-row--net">
                  <span>NET AXIAL FORCE (N_Ed)</span>
                  <span id="truss-net-ned">16,280 kN</span>
                </div>
              </div>
              <div class="receipt-action-bar">
                <span>RECORD LINKED // SNI-1725</span>
                <button type="button" class="receipt-micro-btn" id="btn-sim-truss-load">SIMULATE LOAD ↻</button>
              </div>
            </div>

            <div class="daksh-assessment-strip">
              <div class="assessment-header-row">
                <span>STRUCTURAL ASSESSMENT // 0248</span>
                <span>SPAN: 180M</span>
              </div>
              <div class="assessment-4col-grid">
                <div class="assess-col">
                  <span class="assess-label">SPAN</span>
                  <strong class="assess-num">180</strong>
                  <span class="assess-sub">Meters</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">SAFETY</span>
                  <strong class="assess-num">2.14</strong>
                  <span class="assess-sub">Factor FS</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">LATENCY</span>
                  <strong class="assess-num">0.4</strong>
                  <span class="assess-sub">ms / Frame</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">DAMPING</span>
                  <strong class="assess-num">38%</strong>
                  <span class="assess-sub">TMD Ratio</span>
                </div>
              </div>
            </div>

            <div class="daksh-bleed-title-wrap">
              <div class="daksh-giant-bleed-title">AERO-TRUSS</div>
              <button type="button" class="daksh-circle-view-btn" data-open-dossier="prj-01" title="View Project Dossier">VIEW</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </article>

    <!-- PROJECT 02 -->
    <article
      class="archive-folder"
      class:is-active={activeFolder === 1}
      style="--i:1; --folder-bg:#E4DCC6; --folder-fg:#0D0D10;"
      data-categories="it civil design"
      data-thread-anchor="sec04-prj02"
      data-thread-bias="right"
    >
      <button
        type="button"
        class="folder-strip"
        aria-expanded={activeFolder === 1}
        aria-controls="folder-body-1"
        aria-label="Open folder TERRA-GRID"
        on:click={() => selectFolder(1)}
      >
        <span class="folder-tab" aria-hidden="true">
          <span class="folder-tab-text">
            <span class="folder-tab-name">SEISMIC OS</span>
            <span class="folder-tab-code">CODE_002 //</span>
          </span>
        </span>
        <span class="folder-spine-title">TERRA-GRID</span>
        <span class="folder-spine-file">FILE_02// 2025</span>
      </button>

      <div class="folder-body" id="folder-body-1" inert={activeFolder !== 1 ? true : null}>
      <div class="folder-sheet">
        <div class="dossier-top-meta">
          <span>02 / SEISMIC TELEMETRY OS</span>
          <span style="color:var(--accent-text);">IT SYSTEMS × GEOTECHNICAL</span>
        </div>
        <div class="dossier-visual-preview">
          <svg class="dossier-svg-blueprint" id="svg-seismic-blueprint" viewBox="0 0 600 270" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect id="seismic-bg-rect" width="600" height="270" fill="#002299" style="transition: fill 0.4s ease;"/>
            <ellipse id="seismic-ellipse-3" cx="300" cy="140" rx="220" ry="95" fill="none" stroke="rgba(242,239,233,0.25)" stroke-width="1" stroke-dasharray="4 4" style="transition: rx 0.4s ease, ry 0.4s ease, stroke 0.4s ease;"/>
            <ellipse id="seismic-ellipse-2" cx="300" cy="140" rx="150" ry="65" fill="none" stroke="#D4FF00" stroke-width="1.5" style="transition: rx 0.4s ease, ry 0.4s ease, stroke 0.4s ease;"/>
            <ellipse id="seismic-ellipse-1" cx="300" cy="140" rx="80" ry="35" fill="none" stroke="#FF3355" stroke-width="2" style="transition: rx 0.4s ease, ry 0.4s ease, stroke 0.4s ease;"/>
            <polyline id="seismic-waveform" points="20,140 120,140 145,95 170,195 195,60 220,220 245,80 270,175 295,120 320,155 350,140 580,140" fill="none" stroke="#F2EFE9" stroke-width="2" style="transition: points 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease;"/>
            <text id="seismic-fig-title" x="24" y="32" fill="#D4FF00" font-family="JetBrains Mono" font-size="11" font-weight="bold">FIG 2.2 // SPECTRAL ACCELERATION Sa(T) SPECTRUM HUD</text>
          </svg>
        </div>
        <div class="dossier-content">
          <div class="dossier-col-info">
            <h3 class="dossier-title">TERRA-GRID // Seismic Telemetry &amp; GIS Command OS</h3>
            <p class="dossier-summary">
              High-contrast editorial command interface streaming live accelerometer waveforms, Peak Ground Acceleration (PGA) contours, and liquefaction risk maps.
            </p>
            <div class="dossier-tech-tags">
              <span class="tech-chip">TYPESCRIPT</span>
              <span class="tech-chip">WEBSOCKETS</span>
              <span class="tech-chip">GEOTECHNICAL</span>
              <span class="tech-chip">DATA VIZ</span>
            </div>
            <div class="dossier-footer">
              <span>YEAR: 2025 // TOKYO — JKT</span>
              <button type="button" class="inspect-case-btn" data-open-dossier="prj-02">OPEN DOSSIER [+]</button>
            </div>
          </div>
          <div class="dossier-col-telemetry">
            <div class="system-receipt-card system-receipt--tilted-right">
              <div class="receipt-header">
                <span>ORCHESTRATOR // SEISMIC PIPELINE</span>
                <span class="receipt-status-pill">PGA 0.14g // WITHIN LIMIT</span>
              </div>
              <div class="pipeline-stage-pills" role="group" aria-label="Seismic Pipeline Nodes">
                <button type="button" class="pipe-node-btn active" data-pipe-node="sensor">01. SENSOR</button>
                <button type="button" class="pipe-node-btn" data-pipe-node="spectral">02. SPECTRAL</button>
                <button type="button" class="pipe-node-btn" data-pipe-node="gis">03. GIS MAP</button>
                <button type="button" class="pipe-node-btn" data-pipe-node="dispatch">04. ALERT</button>
              </div>
              <div class="pipeline-live-readout" id="seismic-pipe-readout">
                [NODE 01 // P-WAVE INGEST]: 450 triaxial MEMS accelerometers streaming @ 200Hz via WebSocket edge mesh (RTT: 3.2ms).
              </div>
            </div>

            <div class="daksh-assessment-strip">
              <div class="assessment-header-row">
                <span>NETWORK TELEMETRY // TODAY</span>
                <span>200Hz STREAM</span>
              </div>
              <div class="assessment-4col-grid">
                <div class="assess-col">
                  <span class="assess-label">SENSORS</span>
                  <strong class="assess-num">450</strong>
                  <span class="assess-sub">Triaxial</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">LATENCY</span>
                  <strong class="assess-num">3.2</strong>
                  <span class="assess-sub">ms RTT</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">SECTORS</span>
                  <strong class="assess-num">12</strong>
                  <span class="assess-sub">Fault Zones</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">UPTIME</span>
                  <strong class="assess-num">99.9</strong>
                  <span class="assess-sub">SLA %</span>
                </div>
              </div>
            </div>

            <div class="daksh-bleed-title-wrap">
              <div class="daksh-giant-bleed-title">TERRA-GRID</div>
              <button type="button" class="daksh-circle-view-btn" data-open-dossier="prj-02" title="View Project Dossier">VIEW</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </article>

    <!-- PROJECT 03 -->
    <article
      class="archive-folder"
      class:is-active={activeFolder === 2}
      style="--i:2; --folder-bg:#8E97AB; --folder-fg:#0D0D10;"
      data-categories="design it"
      data-thread-anchor="sec04-prj03"
      data-thread-bias="left"
    >
      <button
        type="button"
        class="folder-strip"
        aria-expanded={activeFolder === 2}
        aria-controls="folder-body-2"
        aria-label="Open folder TECTONIC"
        on:click={() => selectFolder(2)}
      >
        <span class="folder-tab" aria-hidden="true">
          <span class="folder-tab-text">
            <span class="folder-tab-name">TYPE FOUNDRY</span>
            <span class="folder-tab-code">CODE_003 //</span>
          </span>
        </span>
        <span class="folder-spine-title">TECTONIC</span>
        <span class="folder-spine-file">FILE_03// 2024</span>
      </button>

      <div class="folder-body" id="folder-body-2" inert={activeFolder !== 2 ? true : null}>
      <div class="folder-sheet">
        <div class="dossier-top-meta">
          <span>03 / STRUCTURAL TYPE FOUNDRY</span>
          <span style="color:var(--accent-text);">GRAPHIC DESIGN × TYPE ENG</span>
        </div>
        <div class="dossier-visual-preview">
          <svg class="dossier-svg-blueprint" id="svg-tectonic-blueprint" viewBox="0 0 600 270" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect id="tectonic-bg-rect" width="600" height="270" fill="#141418"/>
            <line x1="40" y1="65" x2="560" y2="65" stroke="#0055FF" stroke-width="1"/>
            <line x1="40" y1="205" x2="560" y2="205" stroke="#0055FF" stroke-width="1"/>
            <text id="tectonic-glyph-text" x="55" y="185" fill="#F2EFE9" font-family="Syne" font-size="122" font-weight="800" letter-spacing="-4" style="transition: font-weight 0.35s ease, letter-spacing 0.35s ease, font-size 0.35s ease, fill 0.35s ease;">wf-300</text>
            <circle id="tectonic-radius-circle" cx="195" cy="115" r="34" fill="none" stroke="#D4FF00" stroke-width="2" stroke-dasharray="4 3" style="transition: r 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), cx 0.4s ease, stroke 0.3s ease;"/>
            <text id="tectonic-fig-title" x="24" y="32" fill="#D4FF00" font-family="JetBrains Mono" font-size="11" font-weight="bold">FIG 3.0 // WIDE-FLANGE STRUCTURAL VARIABLE FONT</text>
          </svg>
        </div>
        <div class="dossier-content">
          <div class="dossier-col-info">
            <h3 class="dossier-title">TECTONIC GROTESK // Structural Steel Type Foundry</h3>
            <p class="dossier-summary">
              Experimental variable typeface and editorial specimen book where glyph stems, ink traps, and bezier radii follow AISC Wide-Flange steel beam proportions.
            </p>
            <div class="dossier-tech-tags">
              <span class="tech-chip">VARIABLE FONT</span>
              <span class="tech-chip">EDITORIAL PRINT</span>
              <span class="tech-chip">SWISS GRID</span>
              <span class="tech-chip">OPENTYPE</span>
            </div>
            <div class="dossier-footer">
              <span>YEAR: 2024 // ZURICH</span>
              <button type="button" class="inspect-case-btn" data-open-dossier="prj-03">OPEN DOSSIER [+]</button>
            </div>
          </div>
          <div class="dossier-col-telemetry">
            <div class="system-receipt-card system-receipt--tilted-left">
              <div class="receipt-header">
                <span>AISC PROFILE // WF 300×150</span>
                <span class="receipt-status-pill">OTF // 420 GLYPHS</span>
              </div>
              <div class="receipt-ledger-rows">
                <div class="receipt-row">
                  <span>WEB THICKNESS (t_w)</span>
                  <span class="val-plus">6.5 mm → 90px STEM</span>
                </div>
                <div class="receipt-row">
                  <span>FLANGE WIDTH (b_f)</span>
                  <span class="val-plus">150 mm → SERIF SLAB</span>
                </div>
                <div class="receipt-row receipt-row--net">
                  <span>INK TRAP RADIUS (r_0)</span>
                  <span id="type-axis-readout">R = 13.0mm [wght:800]</span>
                </div>
              </div>
              <div class="receipt-action-bar">
                <span>SPECIMEN // REV 4.2</span>
                <button type="button" class="receipt-micro-btn" id="btn-toggle-type-axis">TOGGLE AXIS ↻</button>
              </div>
            </div>

            <div class="daksh-assessment-strip">
              <div class="assessment-header-row">
                <span>TYPOGRAPHIC SPECIMEN // 0310</span>
                <span>AISC WF-300</span>
              </div>
              <div class="assessment-4col-grid">
                <div class="assess-col">
                  <span class="assess-label">GLYPHS</span>
                  <strong class="assess-num">420</strong>
                  <span class="assess-sub">OpenType</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">AXES</span>
                  <strong class="assess-num">03</strong>
                  <span class="assess-sub">Variable</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">PLATES</span>
                  <strong class="assess-num">64</strong>
                  <span class="assess-sub">Riso Print</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">STOCK</span>
                  <strong class="assess-num">300</strong>
                  <span class="assess-sub">GSM Cotton</span>
                </div>
              </div>
            </div>

            <div class="daksh-bleed-title-wrap">
              <div class="daksh-giant-bleed-title">TECTONIC</div>
              <button type="button" class="daksh-circle-view-btn" data-open-dossier="prj-03" title="View Project Dossier">VIEW</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </article>

    <!-- PROJECT 04 -->
    <article
      class="archive-folder"
      class:is-active={activeFolder === 3}
      style="--i:3; --folder-bg:#B98B5C; --folder-fg:#0D0D10;"
      data-categories="civil it design"
      data-thread-anchor="sec04-prj04"
      data-thread-bias="right"
    >
      <button
        type="button"
        class="folder-strip"
        aria-expanded={activeFolder === 3}
        aria-controls="folder-body-3"
        aria-label="Open folder HYDRO-SYNTH"
        on:click={() => selectFolder(3)}
      >
        <span class="folder-tab" aria-hidden="true">
          <span class="folder-tab-text">
            <span class="folder-tab-name">CFD + ZINE</span>
            <span class="folder-tab-code">CODE_004 //</span>
          </span>
        </span>
        <span class="folder-spine-title">HYDRO-SYNTH</span>
        <span class="folder-spine-file">FILE_04// 2026</span>
      </button>

      <div class="folder-body" id="folder-body-3" inert={activeFolder !== 3 ? true : null}>
      <div class="folder-sheet">
        <div class="dossier-top-meta">
          <span>04 / WATERSHED CFD &amp; ZINE</span>
          <span style="color:var(--accent-text);">HYDRAULICS × SHADER ART</span>
        </div>
        <div class="dossier-visual-preview">
          <svg class="dossier-svg-blueprint" id="svg-hydro-blueprint" viewBox="0 0 600 270" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect id="hydro-bg-rect" width="600" height="270" fill="#0B0B10" style="transition: fill 0.4s ease;"/>
            <path id="hydro-flow-path-1" d="M 0 90 C 180 40, 380 160, 600 80" fill="none" stroke="#0055FF" stroke-width="3" style="transition: d 0.4s ease, stroke 0.3s ease, stroke-width 0.3s ease;"/>
            <path id="hydro-flow-path-2" d="M 0 130 C 200 80, 360 200, 600 120" fill="none" stroke="#00B4FF" stroke-width="2.5" style="transition: d 0.4s ease, stroke 0.3s ease, stroke-width 0.3s ease;"/>
            <path id="hydro-flow-path-3" d="M 0 170 C 220 120, 340 240, 600 160" fill="none" stroke="#D4FF00" stroke-width="2" style="transition: d 0.4s ease, stroke 0.3s ease, stroke-width 0.3s ease;"/>
            <g id="hydro-hud-badge">
              <rect x="420" y="16" width="162" height="24" fill="rgba(13,13,18,0.88)" stroke="#0055FF" stroke-width="1"/>
              <text id="hydro-hud-text" x="430" y="32" fill="#D4FF00" font-family="JetBrains Mono" font-size="10" font-weight="bold">RUNOFF: 24.6 m³/s [Q100]</text>
            </g>
            <text id="hydro-fig-title" x="24" y="32" fill="#D4FF00" font-family="JetBrains Mono" font-size="11" font-weight="bold">FIG 4.2 // NAVIER-STOKES URBAN DRAINAGE VECTOR FIELD</text>
          </svg>
        </div>
        <div class="dossier-content">
          <div class="dossier-col-info">
            <h3 class="dossier-title">HYDRO-SYNTH // Urban Watershed CFD &amp; Cartography</h3>
            <p class="dossier-summary">
              GPU-accelerated shallow-water flood simulation paired with an experimental cartographic zine system for resilient coastal infrastructure planning.
            </p>
            <div class="dossier-tech-tags">
              <span class="tech-chip">CFD HYDRAULICS</span>
              <span class="tech-chip">WEBGPU GLSL</span>
              <span class="tech-chip">CARTOGRAPHY</span>
              <span class="tech-chip">CIVIC TECH</span>
            </div>
            <div class="dossier-footer">
              <span>YEAR: 2026 // BANDUNG</span>
              <button type="button" class="inspect-case-btn" data-open-dossier="prj-04">OPEN DOSSIER [+]</button>
            </div>
          </div>
          <div class="dossier-col-telemetry">
            <div class="system-receipt-card system-receipt--tilted-right">
              <div class="receipt-header">
                <span id="hydro-return-label">BASIN 04 // 100-YR STORM</span>
                <span class="receipt-status-pill">CAP: 82% [OK]</span>
              </div>
              <div class="receipt-ledger-rows">
                <div class="receipt-row">
                  <span>PEAK RUNOFF (Q_p)</span>
                  <span class="val-plus" id="hydro-qp-val">+ 24.6 m³/s</span>
                </div>
                <div class="receipt-row">
                  <span>RETENTION BASIN</span>
                  <span class="val-minus" id="hydro-ret-val">− 11.5 m³/s</span>
                </div>
                <div class="receipt-row receipt-row--net">
                  <span>NET CULVERT FLOW</span>
                  <span id="hydro-net-val">13.1 m³/s</span>
                </div>
              </div>
              <div class="receipt-action-bar">
                <span>MANNING n = 0.015</span>
                <button type="button" class="receipt-micro-btn" id="btn-cycle-storm">RETURN PERIOD ↻</button>
              </div>
            </div>

            <div class="daksh-assessment-strip">
              <div class="assessment-header-row">
                <span>HYDRAULIC ASSESSMENT // BASIN 04</span>
                <span>Q100 DESIGN</span>
              </div>
              <div class="assessment-4col-grid">
                <div class="assess-col">
                  <span class="assess-label">CELLS</span>
                  <strong class="assess-num">1.2M</strong>
                  <span class="assess-sub">WebGPU</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">RETURN</span>
                  <strong class="assess-num">100</strong>
                  <span class="assess-sub">Year Storm</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">CAPACITY</span>
                  <strong class="assess-num">82%</strong>
                  <span class="assess-sub">Culvert Max</span>
                </div>
                <div class="assess-col">
                  <span class="assess-label">MANNING</span>
                  <strong class="assess-num">.015</strong>
                  <span class="assess-sub">Roughness</span>
                </div>
              </div>
            </div>

            <div class="daksh-bleed-title-wrap">
              <div class="daksh-giant-bleed-title">HYDRO-SYNTH</div>
              <button type="button" class="daksh-circle-view-btn" data-open-dossier="prj-04" title="View Project Dossier">VIEW</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </article>

  </div>
</section>
