<!--
  SectionTimeline.svelte
  Section 04: Chronological Career & Engineering Trajectory (2017 — 2026)
  Top: Multidisciplinary Convergence Gantt Spectrum (2017–2026)
  Center: Full-Width 5-Segment Station Switcher Bar
  Bottom: Dual-Bay Chrono-Station Terminal (Left: Flight Log Conduit | Right: CAD Blueprint Dossier)
-->
<script>
  import { playMechanicalTick } from '../lib/interactions.js';

  let activeStationIndex = 0;

  const milestones = [
    {
      id: 'station-01',
      code: 'STA_01 // ACTIVE PROTOCOL',
      year: '2026 // PRESENT',
      shortYear: '2026',
      shortRole: 'STUDIO FOUNDER',
      role: 'FOUNDER & CREATIVE TECHNOLOGIST',
      org: 'KINETIK.STRUCT // INDEPENDENT DIGITAL STUDIO',
      status: 'ACTIVE // R&D',
      statusColor: '#D4FF00',
      statusBg: 'rgba(212, 255, 0, 0.12)',
      disciplines: ['FULLSTACK WEBGL', 'THREE.JS', 'STRUCTURAL COMPUTING', 'BRUTALISM'],
      desc: 'Founded independent multidisciplinary studio operating at the intersection of civil engineering and high-performance web graphics. Developing real-time WebGL finite-element visualizers, interactive CAD sandboxes, and Swiss brutalist digital flagships for architecture, engineering, and digital-first clients worldwide.',
      deliverables: [
        'Real-time Browser FEA & Stress Solvers (WebGL/Three.js)',
        'Zero-Jank Responsive Frontends with 100svh Mobile Stability',
        'Tactile Zine & Editorial Design Systems'
      ],
      schematic: {
        fig: 'FIG 1.0 // KINETIK COMPUTE CORE',
        meta: 'WASM FEA · GLSL 3.0 · 120 FPS',
        type: 'webgl'
      }
    },
    {
      id: 'station-02',
      code: 'STA_02 // SYSTEM PRODUCTION',
      year: '2024 — 2025',
      shortYear: '2024–25',
      shortRole: 'BRIDGE FEM',
      role: 'COMPUTATIONAL STRUCTURAL SYSTEMS & BIM SPECIALIST',
      org: 'INFRASTRUCTURE ENGINEERING ALLIANCE',
      status: 'PRODUCTION // OK',
      statusColor: '#00E5FF',
      statusBg: 'rgba(0, 229, 255, 0.12)',
      disciplines: ['PARAMETRIC BRIDGES', 'SEISMIC FEM', 'BIM ISO-19650', 'PYTHON'],
      desc: 'Led computational structural modeling and finite element analyses for multi-span bridges and complex civil infrastructure. Engineered custom Python pipelines to automatically extract analysis data from ETABS and AutoCAD directly into interactive web dashboards for client review.',
      deliverables: [
        '180m Tied-Arch Parametric Digital Twin (FEM Modal Analysis)',
        'Automated Rebar Schedule & Quantities Takeoff Tooling',
        'ISO-19650 BIM Information Exchange Compliance'
      ],
      schematic: {
        fig: 'FIG 2.0 // TIED-ARCH MOMENT ENVELOPE',
        meta: 'SPAN = 180M · Mu = 48,200 kNm · FS 2.15',
        type: 'bridge'
      }
    },
    {
      id: 'station-03',
      code: 'STA_03 // SHADER PIPELINE',
      year: '2022 — 2024',
      shortYear: '2022–24',
      shortRole: 'WEBGL DEV',
      role: 'FULLSTACK DEVELOPER & DIGITAL ARCHITECT',
      org: 'CREATIVE TECH & DIGITAL CONSULTING',
      status: 'COMPLETED // VERIFIED',
      statusColor: '#C084FC',
      statusBg: 'rgba(192, 132, 252, 0.12)',
      disciplines: ['WEBGL / SHADERS', 'SVELTE & VITE', 'REST / WEBSOCKET', 'GSAP'],
      desc: 'Engineered high-frequency, GPU-accelerated web experiences, interactive data visualizers, and typography-rich editorial web platforms. Bridged structural engineering principles (equilibrium, load paths, precision) directly into clean software architectures.',
      deliverables: [
        'Interactive 3D Topographic Terrain Viewers (LiDAR Point-Clouds)',
        'Hardware-Accelerated Kinetic Typography Engines',
        'Responsive Web Architectures (60-120fps Performance)'
      ],
      schematic: {
        fig: 'FIG 3.0 // TOPOGRAPHIC LIDAR & SHADERS',
        meta: '300k PTS/S · RTT: 3.2ms · WebGL 2.0',
        type: 'lidar'
      }
    },
    {
      id: 'station-04',
      code: 'STA_04 // FIELD DEPLOYMENT',
      year: '2020 — 2022',
      shortYear: '2020–22',
      shortRole: 'SITE ENGINEER',
      role: 'CIVIL & INFRASTRUCTURE SITE ENGINEER',
      org: 'HEAVY CIVIL CONTRACTORS & SURVEY CONSULTING',
      status: 'COMPLETED // FILED',
      statusColor: '#94A3B8',
      statusBg: 'rgba(148, 163, 184, 0.12)',
      disciplines: ['REINFORCED CONCRETE', 'GEOTECHNICAL EQUILIBRIUM', 'AUTOCAD', 'SNI/ACI'],
      desc: 'Managed structural site operations, geodetic survey inspections, foundation settlement monitoring, and structural shop drawings review for commercial infrastructure projects. Verified structural integrity against building code tolerances.',
      deliverables: [
        'Geodetic Total Station Network Verification (mm-Tolerance)',
        'Deep Foundation Settlement & Settlement Plate Monitoring',
        'Site QA/QC & Rebar Placement As-Built Dossiers'
      ],
      schematic: {
        fig: 'FIG 4.0 // TOTAL STATION TRIANGULATION',
        meta: 'Δθ = 124°18\' · BM1–BM3 · σ < 2mm',
        type: 'survey'
      }
    },
    {
      id: 'station-05',
      code: 'STA_05 // THEORETICAL FOUNDATION',
      year: '2017 — 2021',
      shortYear: '2017–21',
      shortRole: 'B.ENG CIVIL',
      role: 'B.ENG IN CIVIL & STRUCTURAL ENGINEERING',
      org: 'NATIONAL INSTITUTE OF TECHNOLOGY // FACULTY OF CIVIL ENG',
      status: 'ACADEMIC // HONORS',
      statusColor: '#FF9500',
      statusBg: 'rgba(255, 149, 0, 0.12)',
      disciplines: ['STRUCTURAL MECHANICS', 'TIMOSHENKO BEAMS', 'MOHR STRESS', 'HYDRAULICS'],
      desc: 'Graduated with Honors in Civil Engineering. Mastered continuum mechanics, indeterminate structures, reinforced concrete design, and soil mechanics. Completed capstone thesis on computational structural analysis of composite structures.',
      deliverables: [
        'Bachelor of Engineering (Honors) — Structural Engineering',
        'Capstone Thesis: Non-Linear Finite Element Analysis of Bridges',
        'Academic Excellence in Applied Mathematics & Mechanics'
      ],
      schematic: {
        fig: 'FIG 5.0 // CONTINUUM MECHANICS & MOHR STRESS',
        meta: 'E = 200 GPa · ν = 0.28 · HONORS',
        type: 'academic'
      }
    }
  ];

  function selectStation(idx) {
    if (idx === activeStationIndex) return;
    activeStationIndex = idx;
    playMechanicalTick(1250, 0.035);
  }

  function nextStation() {
    activeStationIndex = (activeStationIndex + 1) % milestones.length;
    playMechanicalTick(1100, 0.03);
  }

  function prevStation() {
    activeStationIndex = (activeStationIndex - 1 + milestones.length) % milestones.length;
    playMechanicalTick(1100, 0.03);
  }

  $: active = milestones[activeStationIndex];
</script>

<section class="editorial-section" id="sec-timeline" data-section-index="04" data-section-name="04. TIMELINE">
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 04</span>
        <span>·</span>
        <span>CAREER TRAJECTORY &amp; CHRONO-ENGINEERING STATIONS</span>
      </div>
      <h2 class="section-oversized-title">
        CAREER <span class="serif-italic">Trajectory</span> &amp; Stations
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>DISCIPLINARY CONVERGENCE · CIVIL ENGINEERING × FULLSTACK WEBGL × SWISS DESIGN</div>
      <div style="color:var(--accent-text); font-weight:800;">5 OPERATIONAL STATIONS INDEXED [↓]</div>
    </div>
  </div>

  <div class="timeline-master-wrapper" data-thread-anchor="sec04-timeline">

    <!-- 1. Multi-Disciplinary Convergence Gantt Spectrum (Top Matrix - Loved by User) -->
    <div class="timeline-gantt-panel">
      <div class="gantt-panel-header">
        <div class="gantt-title">
          <span class="gantt-live-indicator"></span>
          MULTIDISCIPLINARY CONVERGENCE SPECTRUM // 2017 — 2026
        </div>
        <div class="gantt-meta">3 CO-EVOLVING VECTORS SYNTHESIZED INTO KINETIK.STRUCT</div>
      </div>

      <div class="gantt-spectrum-grid">
        <div class="gantt-row">
          <div class="gantt-label">
            <span class="gantt-dot" style="background:#0055FF;"></span>
            01. CIVIL &amp; STRUCTURAL
          </div>
          <div class="gantt-track">
            <div class="gantt-bar gantt-bar--civil" style="left: 0%; width: 100%;">
              <span>B.Eng Honors → Site Engineering → Parametric Bridge FEM → Studio Compute Core</span>
            </div>
          </div>
        </div>

        <div class="gantt-row">
          <div class="gantt-label">
            <span class="gantt-dot" style="background:#00E5FF;"></span>
            02. COMPUTING &amp; WEBGL
          </div>
          <div class="gantt-track">
            <div class="gantt-bar gantt-bar--tech" style="left: 36%; width: 64%;">
              <span>Python Automation → Svelte &amp; Three.js → WebAssembly Solvers &amp; Shaders</span>
            </div>
          </div>
        </div>

        <div class="gantt-row">
          <div class="gantt-label">
            <span class="gantt-dot" style="background:#D4FF00;"></span>
            03. EDITORIAL &amp; DESIGN
          </div>
          <div class="gantt-track">
            <div class="gantt-bar gantt-bar--design" style="left: 56%; width: 44%;">
              <span>Swiss Typographic Systems → Tactile Zine Print → Brutalist Digital Systems</span>
            </div>
          </div>
        </div>
      </div>

      <div class="gantt-timeline-ticks" aria-hidden="true">
        <span>2017</span>
        <span>2019</span>
        <span>2021</span>
        <span>2023</span>
        <span>2025</span>
        <span class="tick-current">2026 // NOW [CONVERGENCE]</span>
      </div>
    </div>

    <!-- 2. Full-Width 5-Segment Station Switcher Bar (Spans 100% cleanly!) -->
    <div class="timeline-station-segmented-bar" role="tablist" aria-label="Timeline Station Navigation">
      {#each milestones as m, idx}
        <button
          type="button"
          class="segmented-station-tab"
          class:is-active={activeStationIndex === idx}
          role="tab"
          aria-selected={activeStationIndex === idx}
          on:click={() => selectStation(idx)}
        >
          <div class="tab-top-row">
            <span class="tab-index-badge">0{idx + 1}</span>
            <span class="tab-year-text">{m.shortYear}</span>
          </div>
          <div class="tab-role-title">{m.shortRole}</div>
          <div class="tab-active-indicator"></div>
        </button>
      {/each}
    </div>

    <!-- 3. Dual-Bay Chrono-Station Terminal (Kiri: Stations List | Kanan: Master Dossier & CAD Blueprint) -->
    <div class="chrono-console-wrapper">

      <!-- LEFT BAY: Chronological Station Flight Log (Continuous Vertical Conduit) -->
      <div class="chrono-stations-log-bay" aria-label="Career Stations List">
        <div class="log-bay-header">
          <span>// CHRONO FLIGHT RECORDER</span>
          <span class="log-index-count">5 STATIONS INDEXED</span>
        </div>

        <div class="stations-conduit-list">
          <div class="stations-vertical-rail" aria-hidden="true"></div>

          {#each milestones as item, i}
            <button
              type="button"
              class="station-log-capsule"
              class:is-active={activeStationIndex === i}
              on:click={() => selectStation(i)}
            >
              <div class="capsule-node-anchor">
                <span class="node-pip">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <div class="capsule-body">
                <div class="capsule-meta-row">
                  <span class="capsule-year">{item.year}</span>
                  <span
                    class="capsule-status-tag"
                    style="border-color:{item.statusColor}; color:{item.statusColor}; background:{item.statusBg};"
                  >
                    {item.status}
                  </span>
                </div>
                <div class="capsule-role">{item.role}</div>
                <div class="capsule-org">{item.org}</div>
              </div>

              <div class="capsule-active-arrow" aria-hidden="true">→</div>
            </button>
          {/each}
        </div>
      </div>

      <!-- RIGHT BAY: Master Station Dossier & CAD Blueprint (Detailed Inspector) -->
      <div class="chrono-dossier-inspector-bay" aria-live="polite">
        {#key activeStationIndex}
          <article class="active-dossier-card">
            <!-- Dossier Top Meta Bar -->
            <div class="active-dossier-top-bar">
              <div class="dossier-code-pill">{active.code}</div>
              <div class="dossier-counter-pill">
                <span>STATION</span>
                <strong>0{activeStationIndex + 1} // 05</strong>
              </div>
            </div>

            <!-- Role Title & Organization -->
            <div class="active-dossier-headline">
              <h3 class="active-role-title">{active.role}</h3>
              <div class="active-org-name">{active.org}</div>

              <div class="active-discipline-chips">
                {#each active.disciplines as tag}
                  <span class="discipline-pill">{tag}</span>
                {/each}
              </div>
            </div>

            <!-- Vector CAD Blueprint Box -->
            <div class="active-schematic-terminal">
              {#if active.schematic.type === 'webgl'}
                <svg viewBox="0 0 500 130" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <rect width="500" height="130" fill="#0C0D12"/>
                  <g stroke="rgba(212,255,0,0.18)" stroke-width="0.8">
                    <line x1="0" y1="32" x2="500" y2="32"/><line x1="0" y1="65" x2="500" y2="65"/><line x1="0" y1="98" x2="500" y2="98"/>
                    <line x1="80" y1="0" x2="80" y2="130"/><line x1="180" y1="0" x2="180" y2="130"/><line x1="280" y1="0" x2="280" y2="130"/><line x1="380" y1="0" x2="380" y2="130"/>
                  </g>
                  <g transform="translate(90, 65)">
                    <circle cx="0" cy="0" r="18" fill="none" stroke="#D4FF00" stroke-width="2"/>
                    <circle cx="0" cy="0" r="4.5" fill="#D4FF00"/>
                    <line x1="-38" y1="0" x2="38" y2="0" stroke="#00E5FF" stroke-width="1.8"/>
                    <line x1="0" y1="-35" x2="0" y2="35" stroke="#00E5FF" stroke-width="1.8"/>
                    <line x1="-24" y1="-22" x2="24" y2="22" stroke="#FF3355" stroke-width="1.8"/>
                    <text x="24" y="-14" fill="#D4FF00" font-family="JetBrains Mono" font-size="9" font-weight="bold">NODE_01</text>
                  </g>
                  <path d="M 180 65 Q 230 20, 280 65 T 380 65 T 480 65" fill="none" stroke="#00E5FF" stroke-width="2.5"/>
                  <path d="M 180 65 Q 230 108, 280 65 T 380 65 T 480 65" fill="none" stroke="#D4FF00" stroke-width="1.6" stroke-dasharray="4 3"/>
                  <text x="290" y="24" fill="#D4FF00" font-family="JetBrains Mono" font-size="9.5" font-weight="bold">// GLSL SHADER PIPELINE</text>
                  <text x="365" y="116" fill="#00E5FF" font-family="JetBrains Mono" font-size="9">WASM SOLVER: 120 FPS</text>
                </svg>

              {:else if active.schematic.type === 'bridge'}
                <svg viewBox="0 0 500 130" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <rect width="500" height="130" fill="#0A0E1A"/>
                  <g stroke="rgba(0,229,255,0.18)" stroke-width="0.8">
                    <line x1="0" y1="35" x2="500" y2="35"/><line x1="0" y1="70" x2="500" y2="70"/><line x1="0" y1="105" x2="500" y2="105"/>
                    <line x1="100" y1="0" x2="100" y2="130"/><line x1="250" y1="0" x2="250" y2="130"/><line x1="400" y1="0" x2="400" y2="130"/>
                  </g>
                  <path d="M 40 105 Q 250 20 460 105" fill="none" stroke="#00E5FF" stroke-width="2.8"/>
                  <line x1="40" y1="105" x2="460" y2="105" stroke="#F2EFE9" stroke-width="2.2"/>
                  <line x1="110" y1="105" x2="110" y2="58" stroke="#D4FF00" stroke-width="1.4"/>
                  <line x1="180" y1="105" x2="180" y2="32" stroke="#D4FF00" stroke-width="1.4"/>
                  <line x1="250" y1="105" x2="250" y2="21" stroke="#FF3355" stroke-width="2"/>
                  <line x1="320" y1="105" x2="320" y2="32" stroke="#D4FF00" stroke-width="1.4"/>
                  <line x1="390" y1="105" x2="390" y2="58" stroke="#D4FF00" stroke-width="1.4"/>
                  <circle cx="250" cy="21" r="4" fill="#FF3355"/>
                  <text x="45" y="24" fill="#00E5FF" font-family="JetBrains Mono" font-size="9.5" font-weight="bold">// 180M TIED-ARCH ENVELOPE</text>
                  <text x="260" y="24" fill="#FF3355" font-family="JetBrains Mono" font-size="9" font-weight="bold">Mu = 48,200 kNm</text>
                </svg>

              {:else if active.schematic.type === 'lidar'}
                <svg viewBox="0 0 500 130" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <rect width="500" height="130" fill="#0D0A14"/>
                  <g stroke="rgba(192,132,252,0.18)" stroke-width="0.8">
                    <line x1="0" y1="32" x2="500" y2="32"/><line x1="0" y1="65" x2="500" y2="65"/><line x1="0" y1="98" x2="500" y2="98"/>
                  </g>
                  <path d="M 30 110 C 120 80, 200 115, 310 95 S 420 58, 480 75" fill="none" stroke="#C084FC" stroke-width="1.8"/>
                  <path d="M 30 85 C 130 60, 210 92, 320 72 S 410 38, 480 52" fill="none" stroke="#C084FC" stroke-width="2.2"/>
                  <path d="M 30 60 C 140 36, 220 68, 330 48 S 400 20, 480 32" fill="none" stroke="#D4FF00" stroke-width="2.5"/>
                  <circle cx="330" cy="48" r="4.5" fill="#D4FF00"/>
                  <text x="40" y="24" fill="#C084FC" font-family="JetBrains Mono" font-size="9.5" font-weight="bold">// LIDAR 3D POINT-CLOUD</text>
                  <text x="310" y="118" fill="#D4FF00" font-family="JetBrains Mono" font-size="9">RTT: 3.2ms · 300K PTS/S</text>
                </svg>

              {:else if active.schematic.type === 'survey'}
                <svg viewBox="0 0 500 130" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <rect width="500" height="130" fill="#0D1117"/>
                  <g stroke="rgba(148,163,184,0.18)" stroke-width="0.8">
                    <line x1="0" y1="35" x2="500" y2="35"/><line x1="0" y1="70" x2="500" y2="70"/><line x1="0" y1="105" x2="500" y2="105"/>
                  </g>
                  <polygon points="70,102 230,32 350,102" fill="rgba(0,229,255,0.06)" stroke="#00E5FF" stroke-width="2"/>
                  <polygon points="230,32 350,102 440,45" fill="rgba(212,255,0,0.06)" stroke="#D4FF00" stroke-width="1.8" stroke-dasharray="3 3"/>
                  <circle cx="70" cy="102" r="4.5" fill="#00E5FF"/>
                  <text x="42" y="120" fill="#00E5FF" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">BM_1</text>
                  <circle cx="230" cy="32" r="5" fill="#D4FF00"/>
                  <text x="216" y="22" fill="#D4FF00" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">TS_01</text>
                  <circle cx="350" cy="102" r="4.5" fill="#00E5FF"/>
                  <text x="345" y="120" fill="#00E5FF" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">P_3</text>
                  <text x="40" y="24" fill="#94A3B8" font-family="JetBrains Mono" font-size="9.5" font-weight="bold">// GEODETIC TOTAL STATION</text>
                  <text x="310" y="28" fill="#00E5FF" font-family="JetBrains Mono" font-size="9">TOLERANCE &lt; 2.0mm</text>
                </svg>

              {:else if active.schematic.type === 'academic'}
                <svg viewBox="0 0 500 130" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <rect width="500" height="130" fill="#120D09"/>
                  <g stroke="rgba(255,149,0,0.18)" stroke-width="0.8">
                    <line x1="0" y1="35" x2="500" y2="35"/><line x1="0" y1="70" x2="500" y2="70"/><line x1="0" y1="105" x2="500" y2="105"/>
                  </g>
                  <rect x="50" y="66" width="180" height="14" fill="#291F18" stroke="#FF9500" stroke-width="1.8"/>
                  <polygon points="40,96 50,80 60,96" fill="#F2EFE9" stroke="#FF9500" stroke-width="1.4"/>
                  <circle cx="220" cy="87" r="7" fill="#F2EFE9" stroke="#FF9500" stroke-width="1.4"/>
                  <line x1="140" y1="32" x2="140" y2="64" stroke="#D4FF00" stroke-width="2.4"/>
                  <text x="145" y="46" fill="#D4FF00" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">P = 240 kN</text>
                  <g transform="translate(370, 70)">
                    <line x1="-55" y1="0" x2="55" y2="0" stroke="#64748B" stroke-width="1.4"/>
                    <line x1="0" y1="-46" x2="0" y2="46" stroke="#64748B" stroke-width="1.4"/>
                    <circle cx="7" cy="0" r="34" fill="rgba(255,149,0,0.12)" stroke="#FF9500" stroke-width="1.8"/>
                    <circle cx="41" cy="0" r="3.2" fill="#D4FF00"/>
                    <text x="36" y="14" fill="#D4FF00" font-family="JetBrains Mono" font-size="8" font-weight="bold">σ₁</text>
                    <circle cx="-27" cy="0" r="3.2" fill="#D4FF00"/>
                    <text x="-32" y="14" fill="#D4FF00" font-family="JetBrains Mono" font-size="8" font-weight="bold">σ₂</text>
                  </g>
                  <text x="40" y="24" fill="#FF9500" font-family="JetBrains Mono" font-size="9.5" font-weight="bold">// CONTINUUM MECHANICS &amp; MOHR STRESS</text>
                  <text x="270" y="118" fill="#F2EFE9" font-family="JetBrains Mono" font-size="9">HONORS // TIMOSHENKO</text>
                </svg>
              {/if}

              <div class="schematic-caption-bar">
                <span>{active.schematic.fig}</span>
                <strong>{active.schematic.meta}</strong>
              </div>
            </div>

            <!-- Narrative Text -->
            <div class="active-narrative-box">
              <div class="narrative-label">// OPERATIONAL FIELD LOG &amp; SYNTHESIS</div>
              <p class="narrative-text">{active.desc}</p>
            </div>

            <!-- Deliverables & Capabilities Checklist -->
            <div class="active-deliverables-panel">
              <div class="deliv-header-bar">
                <span>// VERIFIED DELIVERABLES &amp; CODE COMPLIANCE</span>
                <span class="deliv-ok-badge">[VERIFIED OK]</span>
              </div>
              <ul class="deliv-checklist">
                {#each active.deliverables as d}
                  <li>
                    <span class="deliv-check-mark">✓</span>
                    <span>{d}</span>
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Bottom Navigation Controls -->
            <div class="active-dossier-footer-nav">
              <button type="button" class="dossier-nav-btn" on:click={prevStation} aria-label="Previous station">
                <span>← PREV STATION</span>
              </button>

              <div class="footer-station-indicator" aria-hidden="true">
                {#each milestones as _, idx}
                  <button
                    type="button"
                    class="station-dot-indicator"
                    class:is-active={activeStationIndex === idx}
                    on:click={() => selectStation(idx)}
                    aria-label={`Jump to station ${idx + 1}`}
                  ></button>
                {/each}
              </div>

              <button type="button" class="dossier-nav-btn" on:click={nextStation} aria-label="Next station">
                <span>NEXT STATION →</span>
              </button>
            </div>
          </article>
        {/key}
      </div>

    </div>

  </div>
</section>
