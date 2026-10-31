<!--
  SectionTimeline.svelte
  Section 04: Chronological Career & Engineering Trajectory (2017 — 2026)
  Redesigned Architectural Stratigraphic Stations & Multi-Disciplinary Convergence Matrix.
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
      desc: 'Managed structural site operations, geodetic survey inspections, foundation settlement monitoring, and structural shop drawings review for commercial infrastructure projects. Verified structural integrity against building codes and limit states.',
      deliverables: [
        'Foundation Settlement & Geotechnical Deformation Monitoring',
        'Total Station Topographic Survey & Boundary Control',
        'Structural Reinforcement Steel Detailing & Field QC'
      ],
      schematic: {
        fig: 'FIG 4.0 // TOTAL STATION TRIANGULATION',
        meta: 'AZ = 124°18\'32" · SETTLEMENT: 4.2mm [OK]',
        type: 'site'
      }
    },
    {
      id: 'station-05',
      code: 'STA_05 // ACADEMIC FOUNDATION',
      year: '2017 — 2021',
      role: 'B.ENG. IN CIVIL & STRUCTURAL ENGINEERING',
      org: 'FACULTY OF CIVIL & ENVIRONMENTAL ENGINEERING',
      status: 'DEGREE CONFERRED // HONORS',
      statusColor: '#FF6B00',
      statusBg: 'rgba(255, 107, 0, 0.12)',
      disciplines: ['CONTINUUM MECHANICS', 'STRUCTURAL DYNAMICS', 'MATRIX ANALYSIS', 'FEA'],
      desc: 'Graduated with honors in Civil Engineering. Rigorous foundation in structural analysis, concrete/steel design, fluid mechanics, and computational calculus. Published undergraduate research on non-linear dynamic responses in steel trusses.',
      deliverables: [
        'Bachelor of Engineering Degree (Honors)',
        'Undergraduate Thesis: Computational Modeling of Dynamic Load Paths',
        'Mastery of Euler-Bernoulli & Timoshenko Beam Theories'
      ],
      schematic: {
        fig: 'FIG 5.0 // TIMOSHENKO BEAM & MOHR STRESS',
        meta: 'E = 200 GPa · σ = My/I · HONORS DEGREE',
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

    <!-- 3. Redesigned Station Milestone Cards List -->
    <div class="timeline-stations-list">
      {#each milestones as item, i}
        <article
          class="timeline-station-card timeline-milestone-card"
          class:is-current={i === 0}
          id={item.id}
          data-station-index={i}
        >
          <!-- Top Station Bar -->
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

          <!-- 2-Column Split Body: Technical Schematic + Field Dossier -->
          <div class="station-card-grid" class:grid-reversed={i % 2 === 1}>

            <!-- Side A: Technical Schematic Terminal -->
            <div class="station-schematic-bay">
              {#if item.schematic.type === 'webgl'}
                <svg viewBox="0 0 500 240" class="milestone-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-label="Schematic 01 WebGL Core">
                  <rect width="500" height="240" fill="#0C0D12"/>
                  <g stroke="rgba(212, 255, 0, 0.12)" stroke-width="1">
                    <line x1="0" y1="40" x2="500" y2="40"/><line x1="0" y1="80" x2="500" y2="80"/>
                    <line x1="0" y1="120" x2="500" y2="120"/><line x1="0" y1="160" x2="500" y2="160"/>
                    <line x1="0" y1="200" x2="500" y2="200"/>
                    <line x1="60" y1="0" x2="60" y2="240"/><line x1="140" y1="0" x2="140" y2="240"/>
                    <line x1="220" y1="0" x2="220" y2="240"/><line x1="300" y1="0" x2="300" y2="240"/>
                    <line x1="380" y1="0" x2="380" y2="240"/><line x1="440" y1="0" x2="440" y2="240"/>
                  </g>
                  <g transform="translate(180, 45)">
                    <line x1="70" y1="70" x2="30" y2="25" stroke="#334155" stroke-width="2" stroke-dasharray="3 3"/>
                    <line x1="70" y1="70" x2="110" y2="25" stroke="#334155" stroke-width="2" stroke-dasharray="3 3"/>
                    <circle cx="70" cy="70" r="16" fill="#181822" stroke="#D4FF00" stroke-width="2.5"/>
                    <circle cx="70" cy="70" r="5" fill="#D4FF00"/>
                    <line x1="70" y1="70" x2="160" y2="70" stroke="#0055FF" stroke-width="3"/>
                    <line x1="70" y1="70" x2="-20" y2="70" stroke="#0055FF" stroke-width="3"/>
                    <line x1="70" y1="70" x2="70" y2="-10" stroke="#D4FF00" stroke-width="3"/>
                    <line x1="70" y1="70" x2="135" y2="120" stroke="#00E5FF" stroke-width="2.5"/>
                    <line x1="70" y1="70" x2="5" y2="120" stroke="#00E5FF" stroke-width="2.5"/>
                    <circle cx="160" cy="70" r="4" fill="#0055FF"/>
                    <circle cx="-20" cy="70" r="4" fill="#0055FF"/>
                    <circle cx="70" cy="-10" r="4" fill="#D4FF00"/>
                    <circle cx="135" cy="120" r="4" fill="#00E5FF"/>
                    <circle cx="5" cy="120" r="4" fill="#00E5FF"/>
                    <text x="74" y="24" fill="#FF3355" font-family="JetBrains Mono" font-size="9" font-weight="bold">+Z</text>
                    <text x="162" y="65" fill="#0055FF" font-family="JetBrains Mono" font-size="9" font-weight="bold">+X</text>
                    <text x="138" y="132" fill="#00E5FF" font-family="JetBrains Mono" font-size="9" font-weight="bold">+Y</text>
                  </g>
                  <path d="M 20 200 Q 80 170 140 200 T 260 200 T 380 200 T 480 200" fill="none" stroke="#D4FF00" stroke-width="2" opacity="0.85"/>
                  <text x="24" y="28" fill="#D4FF00" font-family="JetBrains Mono" font-size="10" font-weight="bold">// SCHEMATIC 01.1: TECTONIC SHADER &amp; FEM COMPUTE CORE</text>
                  <rect x="330" y="14" width="145" height="20" fill="rgba(212,255,0,0.12)" stroke="#D4FF00" stroke-width="1"/>
                  <text x="338" y="28" fill="#D4FF00" font-family="JetBrains Mono" font-size="9" font-weight="bold">WASM · 120 FPS [LIVE]</text>
                </svg>

              {:else if item.schematic.type === 'bridge'}
                <svg viewBox="0 0 500 240" class="milestone-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-label="Schematic 02 Parametric Bridge">
                  <rect width="500" height="240" fill="#080F18"/>
                  <g stroke="rgba(0, 85, 255, 0.18)" stroke-width="1">
                    <line x1="0" y1="40" x2="500" y2="40"/><line x1="0" y1="80" x2="500" y2="80"/>
                    <line x1="0" y1="120" x2="500" y2="120"/><line x1="0" y1="160" x2="500" y2="160"/>
                    <line x1="0" y1="200" x2="500" y2="200"/>
                  </g>
                  <path d="M 40 180 Q 250 40 460 180" fill="none" stroke="#0055FF" stroke-width="3"/>
                  <line x1="40" y1="180" x2="460" y2="180" stroke="#F2EFE9" stroke-width="2.5"/>
                  <line x1="90" y1="150" x2="90" y2="180" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2 2"/>
                  <line x1="140" y1="116" x2="140" y2="180" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2 2"/>
                  <line x1="190" y1="88" x2="190" y2="180" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2 2"/>
                  <line x1="250" y1="75" x2="250" y2="180" stroke="#D4FF00" stroke-width="2.5"/>
                  <line x1="310" y1="88" x2="310" y2="180" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2 2"/>
                  <line x1="360" y1="116" x2="360" y2="180" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2 2"/>
                  <line x1="410" y1="150" x2="410" y2="180" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="2 2"/>
                  <path d="M 40 180 Q 250 225 460 180" fill="rgba(0,85,255,0.12)" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="4 2"/>
                  <polygon points="30,195 40,180 50,195" fill="#F2EFE9" stroke="#0055FF" stroke-width="1.5"/>
                  <polygon points="450,195 460,180 470,195" fill="#F2EFE9" stroke="#0055FF" stroke-width="1.5"/>
                  <text x="24" y="28" fill="#00E5FF" font-family="JetBrains Mono" font-size="10" font-weight="bold">// SCHEMATIC 02.1: 180M TIED-ARCH MOMENT ENVELOPE</text>
                  <rect x="335" y="14" width="140" height="20" fill="rgba(0,85,255,0.15)" stroke="#0055FF" stroke-width="1"/>
                  <text x="343" y="28" fill="#00E5FF" font-family="JetBrains Mono" font-size="9" font-weight="bold">SPAN: 180M · FS 2.15</text>
                  <text x="215" y="215" fill="#D4FF00" font-family="JetBrains Mono" font-size="8.5" font-weight="bold">Mu = 48,200 kNm [MAX]</text>
                </svg>

              {:else if item.schematic.type === 'lidar'}
                <svg viewBox="0 0 500 240" class="milestone-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-label="Schematic 03 LiDAR Shaders">
                  <rect width="500" height="240" fill="#0F0C16"/>
                  <path d="M 30 180 C 120 150, 200 200, 320 160 S 420 130, 480 150" fill="none" stroke="#A855F7" stroke-width="1.5"/>
                  <path d="M 30 150 C 130 110, 220 170, 330 130 S 430 100, 480 120" fill="none" stroke="#A855F7" stroke-width="2"/>
                  <path d="M 40 120 C 140 70, 240 140, 340 100 S 440 70, 470 90" fill="none" stroke="#C084FC" stroke-width="2.5"/>
                  <path d="M 60 90 C 160 40, 260 110, 350 70 S 420 45, 460 65" fill="none" stroke="#E9D5FF" stroke-width="2"/>
                  <g fill="#A855F7" opacity="0.65">
                    <circle cx="90" cy="140" r="2"/><circle cx="150" cy="110" r="2.5"/><circle cx="210" cy="135" r="2"/><circle cx="280" cy="100" r="2.5"/>
                    <circle cx="340" cy="85" r="2"/><circle cx="400" cy="95" r="2.5"/><circle cx="120" cy="80" r="2"/><circle cx="180" cy="65" r="2.5"/>
                    <circle cx="250" cy="55" r="2"/><circle cx="320" cy="50" r="2.5"/><circle cx="380" cy="60" r="2"/>
                  </g>
                  <line x1="250" y1="15" x2="160" y2="170" stroke="#D4FF00" stroke-width="1.5" stroke-dasharray="3 3"/>
                  <line x1="250" y1="15" x2="360" y2="155" stroke="#D4FF00" stroke-width="1.5" stroke-dasharray="3 3"/>
                  <circle cx="250" cy="15" r="4" fill="#D4FF00"/>
                  <text x="24" y="28" fill="#C084FC" font-family="JetBrains Mono" font-size="10" font-weight="bold">// SCHEMATIC 03.1: GPU POINT-CLOUD &amp; SHADER ISOLINES</text>
                  <rect x="330" y="14" width="145" height="20" fill="rgba(168,85,247,0.15)" stroke="#A855F7" stroke-width="1"/>
                  <text x="338" y="28" fill="#E9D5FF" font-family="JetBrains Mono" font-size="9" font-weight="bold">300k PTS/S · RTT 3.2ms</text>
                </svg>

              {:else if item.schematic.type === 'site'}
                <svg viewBox="0 0 500 240" class="milestone-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-label="Schematic 04 Site Operations">
                  <rect width="500" height="240" fill="#0F1115"/>
                  <g stroke="rgba(100, 116, 139, 0.2)" stroke-width="1">
                    <line x1="0" y1="50" x2="500" y2="50"/><line x1="0" y1="100" x2="500" y2="100"/>
                    <line x1="0" y1="150" x2="500" y2="150"/><line x1="0" y1="200" x2="500" y2="200"/>
                  </g>
                  <polygon points="100,165 390,140 240,65" fill="rgba(100,116,139,0.12)" stroke="#64748B" stroke-width="2"/>
                  <line x1="100" y1="165" x2="390" y2="140" stroke="#FF3355" stroke-width="1.5" stroke-dasharray="4 2"/>
                  <circle cx="100" cy="165" r="7" fill="#1E293B" stroke="#D4FF00" stroke-width="2"/>
                  <circle cx="100" cy="165" r="2.5" fill="#D4FF00"/>
                  <text x="75" y="190" fill="#D4FF00" font-family="JetBrains Mono" font-size="9" font-weight="bold">BM_01 (STN)</text>
                  <circle cx="390" cy="140" r="7" fill="#1E293B" stroke="#00E5FF" stroke-width="2"/>
                  <circle cx="390" cy="140" r="2.5" fill="#00E5FF"/>
                  <text x="370" y="165" fill="#00E5FF" font-family="JetBrains Mono" font-size="9" font-weight="bold">P_04 (REF)</text>
                  <circle cx="240" cy="65" r="6" fill="#1E293B" stroke="#F2EFE9" stroke-width="1.5"/>
                  <text x="248" y="68" fill="#F2EFE9" font-family="JetBrains Mono" font-size="9">BM_02</text>
                  <path d="M 125 160 A 30 30 0 0 0 115 145" fill="none" stroke="#D4FF00" stroke-width="1.5"/>
                  <text x="130" y="148" fill="#D4FF00" font-family="JetBrains Mono" font-size="8.5">θ=124°18'</text>
                  <text x="24" y="28" fill="#94A3B8" font-family="JetBrains Mono" font-size="10" font-weight="bold">// SCHEMATIC 04.1: GEODETIC TRIANGULATION &amp; FIELD QC</text>
                  <rect x="330" y="14" width="145" height="20" fill="rgba(100,116,139,0.18)" stroke="#64748B" stroke-width="1"/>
                  <text x="338" y="28" fill="#F2EFE9" font-family="JetBrains Mono" font-size="9" font-weight="bold">SETTLEMENT: 4.2mm &lt; 25</text>
                </svg>

              {:else if item.schematic.type === 'academic'}
                <svg viewBox="0 0 500 240" class="milestone-schematic-svg" preserveAspectRatio="xMidYMid meet" aria-label="Schematic 05 Academic Mechanics">
                  <rect width="500" height="240" fill="#120D09"/>
                  <g transform="translate(30, 45)">
                    <rect x="20" y="75" width="220" height="18" fill="#291F18" stroke="#FF6B00" stroke-width="2"/>
                    <polygon points="12,112 24,93 36,112" fill="#F2EFE9" stroke="#FF6B00" stroke-width="1.5"/>
                    <circle cx="230" cy="103" r="8" fill="#F2EFE9" stroke="#FF6B00" stroke-width="1.5"/>
                    <line x1="130" y1="40" x2="130" y2="73" stroke="#D4FF00" stroke-width="2.5"/>
                    <text x="135" y="55" fill="#D4FF00" font-family="JetBrains Mono" font-size="9" font-weight="bold">P = 240 kN</text>
                    <line x1="20" y1="94" x2="240" y2="94" stroke="#FF6B00" stroke-width="1" stroke-dasharray="3 3"/>
                    <text x="40" y="128" fill="#FF6B00" font-family="JetBrains Mono" font-size="8.5">σ = M·y / I</text>
                  </g>
                  <g transform="translate(360, 130)">
                    <line x1="-75" y1="0" x2="75" y2="0" stroke="#64748B" stroke-width="1.5"/>
                    <line x1="0" y1="-65" x2="0" y2="65" stroke="#64748B" stroke-width="1.5"/>
                    <text x="68" y="-4" fill="#64748B" font-family="JetBrains Mono" font-size="8">σ</text>
                    <text x="4" y="-55" fill="#64748B" font-family="JetBrains Mono" font-size="8">τ</text>
                    <circle cx="10" cy="0" r="45" fill="rgba(255,107,0,0.12)" stroke="#FF6B00" stroke-width="2"/>
                    <circle cx="55" cy="0" r="3.5" fill="#D4FF00"/>
                    <text x="50" y="14" fill="#D4FF00" font-family="JetBrains Mono" font-size="8" font-weight="bold">σ₁</text>
                    <circle cx="-35" cy="0" r="3.5" fill="#D4FF00"/>
                    <text x="-40" y="14" fill="#D4FF00" font-family="JetBrains Mono" font-size="8" font-weight="bold">σ₂</text>
                    <circle cx="10" cy="-45" r="3" fill="#FF6B00"/>
                    <text x="14" y="-42" fill="#FF6B00" font-family="JetBrains Mono" font-size="8">τ_max</text>
                  </g>
                  <text x="24" y="28" fill="#FF6B00" font-family="JetBrains Mono" font-size="10" font-weight="bold">// SCHEMATIC 05.1: CONTINUUM MECHANICS &amp; MOHR STRESS</text>
                  <rect x="325" y="14" width="150" height="20" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="1"/>
                  <text x="333" y="28" fill="#F2EFE9" font-family="JetBrains Mono" font-size="9" font-weight="bold">E = 200 GPa · HONORS</text>
                </svg>
              {/if}

              <!-- Schematic Caption Footnote -->
              <div class="schematic-caption-bar">
                <span>{item.schematic.fig}</span>
                <strong>{item.schematic.meta}</strong>
              </div>
            </div>

            <!-- Side B: Field Log & Deliverables Dossier -->
            <div class="station-dossier-bay">
              <div>
                <h3 class="station-role-title">{item.role}</h3>
                <div class="station-org-name">{item.org}</div>

                <div class="station-discipline-tags">
                  {#each item.disciplines as tag}
                    <span class="station-discipline-chip">{tag}</span>
                  {/each}
                </div>

                <p class="station-narrative">{item.desc}</p>
              </div>

              <div class="station-deliverables-panel">
                <div class="deliverables-header-row">
                  <span>// KEY DELIVERABLES &amp; CAPABILITIES</span>
                  <span>VERIFIED [OK]</span>
                </div>
                <ul class="station-deliverables-list">
                  {#each item.deliverables as d}
                    <li>
                      <span class="station-deliv-check">✓</span>
                      <span>{d}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>

          </div>
        </article>
      {/each}
    </div>

  </div>
</section>
