<!--
  SectionTimeline.svelte
  Section 04: Chronological Career & Engineering Trajectory (2017 — 2026)
  Top: Multidisciplinary Convergence Gantt Matrix (2017–2026) + Station Jump Navigator
  Bottom: Sleek Architectural Alternating Left-Right Spine Timeline
-->
<script>
  const milestones = [
    {
      id: 'station-01',
      code: 'STA_01 // ACTIVE PROTOCOL',
      year: '2026 // PRESENT',
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
        meta: 'Δθ = 124°18\' · BM1–BM3 · σ &lt; 2mm',
        type: 'survey'
      }
    },
    {
      id: 'station-05',
      code: 'STA_05 // THEORETICAL FOUNDATION',
      year: '2017 — 2021',
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

    <!-- 1. Multi-Disciplinary Convergence Gantt Spectrum -->
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

    <!-- 2. Interactive Station Jump Navigator -->
    <nav class="station-nav-bar" aria-label="Timeline Station Navigation">
      <button type="button" class="station-jump-btn active" data-jump-station="0">
        <span class="station-jump-num">01</span>
        <span class="station-jump-text">2026 // STUDIO FOUNDER</span>
      </button>
      <button type="button" class="station-jump-btn" data-jump-station="1">
        <span class="station-jump-num">02</span>
        <span class="station-jump-text">2024–2025 // BRIDGE FEM</span>
      </button>
      <button type="button" class="station-jump-btn" data-jump-station="2">
        <span class="station-jump-num">03</span>
        <span class="station-jump-text">2022–2024 // WEBGL DEV</span>
      </button>
      <button type="button" class="station-jump-btn" data-jump-station="3">
        <span class="station-jump-num">04</span>
        <span class="station-jump-text">2020–2022 // SITE ENGINEER</span>
      </button>
      <button type="button" class="station-jump-btn" data-jump-station="4">
        <span class="station-jump-num">05</span>
        <span class="station-jump-text">2017–2021 // B.ENG CIVIL</span>
      </button>
    </nav>

    <!-- 3. Alternating Left-Right Spine Timeline (Kanan - Kiri) -->
    <div class="timeline-zigzag-wrapper">
      <!-- Central Structural Coordinate Spine Line -->
      <div class="zigzag-center-spine" aria-hidden="true">
        <div class="spine-cap-tag spine-cap-top">+0.00 // DATUM 2026</div>
        <div class="spine-vertical-line"></div>
        <div class="spine-cap-tag spine-cap-bottom">ORIGIN // 2017</div>
      </div>

      <div class="zigzag-milestones-track">
        {#each milestones as item, i}
          <div
            class="zigzag-milestone-row"
            class:is-left={i % 2 === 0}
            class:is-right={i % 2 === 1}
          >
            <!-- Center Node Pin Pip on Spine -->
            <div class="zigzag-node-pin" aria-hidden="true">
              <span class="pin-station-num">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <!-- Horizontal Branch Arm Bracket to Card -->
            <div class="zigzag-branch-arm" aria-hidden="true">
              <div class="branch-line"></div>
              <div class="branch-connector-dot"></div>
            </div>

            <!-- Sleek Compact Milestone Card -->
            <article
              class="zigzag-station-card timeline-milestone-card"
              class:is-current={i === 0}
              id={item.id}
              data-station-index={i}
            >
              <!-- Card Top Header Bar -->
              <div class="station-card-top-bar">
                <div class="station-meta-left">
                  <span class="station-code-badge">{item.code}</span>
                  <span class="station-year-tag">{item.year}</span>
                </div>
                <div
                  class="station-status-pill"
                  style="border-color:{item.statusColor}; color:{item.statusColor}; background:{item.statusBg};"
                >
                  {item.status}
                </div>
              </div>

              <!-- Card Body Content -->
              <div class="zigzag-card-body">
                <h3 class="station-role-title">{item.role}</h3>
                <div class="station-org-name">{item.org}</div>

                <div class="station-discipline-tags">
                  {#each item.disciplines as tag}
                    <span class="station-discipline-chip">{tag}</span>
                  {/each}
                </div>

                <p class="station-narrative">{item.desc}</p>

                <!-- Compact Vector Blueprint Schematic Strip -->
                <div class="zigzag-schematic-strip">
                  {#if item.schematic.type === 'webgl'}
                    <svg viewBox="0 0 500 115" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <rect width="500" height="115" fill="#0C0D12"/>
                      <g stroke="rgba(212,255,0,0.18)" stroke-width="0.8">
                        <line x1="0" y1="28" x2="500" y2="28"/><line x1="0" y1="57" x2="500" y2="57"/><line x1="0" y1="86" x2="500" y2="86"/>
                        <line x1="80" y1="0" x2="80" y2="115"/><line x1="180" y1="0" x2="180" y2="115"/><line x1="280" y1="0" x2="280" y2="115"/><line x1="380" y1="0" x2="380" y2="115"/>
                      </g>
                      <!-- 3D Node Wireframe -->
                      <g transform="translate(90, 58)">
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#D4FF00" stroke-width="1.8"/>
                        <circle cx="0" cy="0" r="4" fill="#D4FF00"/>
                        <line x1="-36" y1="0" x2="36" y2="0" stroke="#00E5FF" stroke-width="1.5"/>
                        <line x1="0" y1="-32" x2="0" y2="32" stroke="#00E5FF" stroke-width="1.5"/>
                        <line x1="-22" y1="-20" x2="22" y2="20" stroke="#FF3355" stroke-width="1.5"/>
                        <text x="24" y="-12" fill="#D4FF00" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">NODE_01</text>
                      </g>
                      <!-- Compute Wave Curve -->
                      <path d="M 180 58 Q 230 18, 280 58 T 380 58 T 480 58" fill="none" stroke="#00E5FF" stroke-width="2.2"/>
                      <path d="M 180 58 Q 230 92, 280 58 T 380 58 T 480 58" fill="none" stroke="#D4FF00" stroke-width="1.5" stroke-dasharray="4 3"/>
                      <text x="290" y="22" fill="#D4FF00" font-family="JetBrains Mono" font-size="9" font-weight="bold">// GLSL SHADER PIPELINE</text>
                      <text x="365" y="102" fill="#00E5FF" font-family="JetBrains Mono" font-size="8.5">WASM SOLVER: 120 FPS</text>
                    </svg>

                  {:else if item.schematic.type === 'bridge'}
                    <svg viewBox="0 0 500 115" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <rect width="500" height="115" fill="#0A0E1A"/>
                      <g stroke="rgba(0,229,255,0.18)" stroke-width="0.8">
                        <line x1="0" y1="30" x2="500" y2="30"/><line x1="0" y1="60" x2="500" y2="60"/><line x1="0" y1="90" x2="500" y2="90"/>
                        <line x1="100" y1="0" x2="100" y2="115"/><line x1="250" y1="0" x2="250" y2="115"/><line x1="400" y1="0" x2="400" y2="115"/>
                      </g>
                      <!-- Tied-Arch Envelope -->
                      <path d="M 40 92 Q 250 18 460 92" fill="none" stroke="#00E5FF" stroke-width="2.6"/>
                      <line x1="40" y1="92" x2="460" y2="92" stroke="#F2EFE9" stroke-width="2"/>
                      <!-- Hangers -->
                      <line x1="110" y1="92" x2="110" y2="52" stroke="#D4FF00" stroke-width="1.2"/>
                      <line x1="180" y1="92" x2="180" y2="28" stroke="#D4FF00" stroke-width="1.2"/>
                      <line x1="250" y1="92" x2="250" y2="19" stroke="#FF3355" stroke-width="1.8"/>
                      <line x1="320" y1="92" x2="320" y2="28" stroke="#D4FF00" stroke-width="1.2"/>
                      <line x1="390" y1="92" x2="390" y2="52" stroke="#D4FF00" stroke-width="1.2"/>
                      <circle cx="250" cy="19" r="3.5" fill="#FF3355"/>
                      <text x="50" y="22" fill="#00E5FF" font-family="JetBrains Mono" font-size="9" font-weight="bold">// 180M TIED-ARCH ENVELOPE</text>
                      <text x="260" y="22" fill="#FF3355" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">Mu = 48,200 kNm</text>
                    </svg>

                  {:else if item.schematic.type === 'lidar'}
                    <svg viewBox="0 0 500 115" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <rect width="500" height="115" fill="#0D0A14"/>
                      <g stroke="rgba(192,132,252,0.18)" stroke-width="0.8">
                        <line x1="0" y1="28" x2="500" y2="28"/><line x1="0" y1="58" x2="500" y2="58"/><line x1="0" y1="88" x2="500" y2="88"/>
                      </g>
                      <!-- Contour Isolines -->
                      <path d="M 30 95 C 120 70, 200 100, 310 82 S 420 50, 480 65" fill="none" stroke="#C084FC" stroke-width="1.6"/>
                      <path d="M 30 75 C 130 52, 210 80, 320 62 S 410 32, 480 45" fill="none" stroke="#C084FC" stroke-width="2"/>
                      <path d="M 30 55 C 140 32, 220 60, 330 42 S 400 18, 480 28" fill="none" stroke="#D4FF00" stroke-width="2.2"/>
                      <circle cx="330" cy="42" r="4" fill="#D4FF00"/>
                      <text x="40" y="20" fill="#C084FC" font-family="JetBrains Mono" font-size="9" font-weight="bold">// LIDAR 3D POINT-CLOUD</text>
                      <text x="320" y="104" fill="#D4FF00" font-family="JetBrains Mono" font-size="8.5">RTT: 3.2ms · 300K PTS/S</text>
                    </svg>

                  {:else if item.schematic.type === 'survey'}
                    <svg viewBox="0 0 500 115" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <rect width="500" height="115" fill="#0D1117"/>
                      <g stroke="rgba(148,163,184,0.18)" stroke-width="0.8">
                        <line x1="0" y1="30" x2="500" y2="30"/><line x1="0" y1="60" x2="500" y2="60"/><line x1="0" y1="90" x2="500" y2="90"/>
                      </g>
                      <!-- Triangulation Polygons -->
                      <polygon points="70,88 230,28 350,88" fill="rgba(0,229,255,0.06)" stroke="#00E5FF" stroke-width="1.8"/>
                      <polygon points="230,28 350,88 440,38" fill="rgba(212,255,0,0.06)" stroke="#D4FF00" stroke-width="1.6" stroke-dasharray="3 3"/>
                      <circle cx="70" cy="88" r="4" fill="#00E5FF"/>
                      <text x="42" y="104" fill="#00E5FF" font-family="JetBrains Mono" font-size="8" font-weight="bold">BM_1</text>
                      <circle cx="230" cy="28" r="4.5" fill="#D4FF00"/>
                      <text x="218" y="18" fill="#D4FF00" font-family="JetBrains Mono" font-size="8" font-weight="bold">TS_01</text>
                      <circle cx="350" cy="88" r="4" fill="#00E5FF"/>
                      <text x="345" y="104" fill="#00E5FF" font-family="JetBrains Mono" font-size="8" font-weight="bold">P_3</text>
                      <text x="40" y="20" fill="#94A3B8" font-family="JetBrains Mono" font-size="9" font-weight="bold">// GEODETIC TOTAL STATION</text>
                      <text x="310" y="24" fill="#00E5FF" font-family="JetBrains Mono" font-size="8.5">TOLERANCE &lt; 2.0mm</text>
                    </svg>

                  {:else if item.schematic.type === 'academic'}
                    <svg viewBox="0 0 500 115" class="micro-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <rect width="500" height="115" fill="#120D09"/>
                      <g stroke="rgba(255,149,0,0.18)" stroke-width="0.8">
                        <line x1="0" y1="30" x2="500" y2="30"/><line x1="0" y1="60" x2="500" y2="60"/><line x1="0" y1="90" x2="500" y2="90"/>
                      </g>
                      <!-- Simply Supported Beam -->
                      <rect x="50" y="58" width="180" height="12" fill="#291F18" stroke="#FF9500" stroke-width="1.6"/>
                      <polygon points="40,84 50,70 60,84" fill="#F2EFE9" stroke="#FF9500" stroke-width="1.2"/>
                      <circle cx="220" cy="76" r="6" fill="#F2EFE9" stroke="#FF9500" stroke-width="1.2"/>
                      <line x1="140" y1="28" x2="140" y2="56" stroke="#D4FF00" stroke-width="2"/>
                      <text x="145" y="40" fill="#D4FF00" font-family="JetBrains Mono" font-size="8" font-weight="bold">P = 240 kN</text>
                      <!-- Mohr Circle -->
                      <g transform="translate(370, 62)">
                        <line x1="-50" y1="0" x2="50" y2="0" stroke="#64748B" stroke-width="1.2"/>
                        <line x1="0" y1="-42" x2="0" y2="42" stroke="#64748B" stroke-width="1.2"/>
                        <circle cx="6" cy="0" r="30" fill="rgba(255,149,0,0.12)" stroke="#FF9500" stroke-width="1.6"/>
                        <circle cx="36" cy="0" r="2.8" fill="#D4FF00"/>
                        <text x="32" y="12" fill="#D4FF00" font-family="JetBrains Mono" font-size="7.5" font-weight="bold">σ₁</text>
                        <circle cx="-24" cy="0" r="2.8" fill="#D4FF00"/>
                        <text x="-28" y="12" fill="#D4FF00" font-family="JetBrains Mono" font-size="7.5" font-weight="bold">σ₂</text>
                      </g>
                      <text x="40" y="20" fill="#FF9500" font-family="JetBrains Mono" font-size="9" font-weight="bold">// CONTINUUM MECHANICS &amp; MOHR STRESS</text>
                      <text x="270" y="104" fill="#F2EFE9" font-family="JetBrains Mono" font-size="8.5">HONORS // TIMOSHENKO</text>
                    </svg>
                  {/if}

                  <!-- Schematic Caption Footnote -->
                  <div class="schematic-caption-bar">
                    <span>{item.schematic.fig}</span>
                    <strong>{item.schematic.meta}</strong>
                  </div>
                </div>

                <!-- Verified Key Deliverables Box -->
                <div class="zigzag-deliverables-panel">
                  <div class="zigzag-deliv-header">
                    <span>// VERIFIED CAPABILITIES &amp; DELIVERABLES</span>
                    <span class="deliv-ok-badge">[OK]</span>
                  </div>
                  <ul class="zigzag-deliverables-list">
                    {#each item.deliverables as d}
                      <li>
                        <span class="station-deliv-check">✓</span>
                        <span>{d}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>
