<!--
  SectionTimeline.svelte
  Section 04: Chronological Career & Engineering Evolution (2017 — 2026)
  Tactile brutalist timeline with year badges, discipline tags, and milestone deliverables.
-->
<script>
  const milestones = [
    {
      year: '2026 // PRESENT',
      role: 'FOUNDER & CREATIVE TECHNOLOGIST',
      org: 'KINETIK.STRUCT // INDEPENDENT DIGITAL STUDIO',
      status: 'ACTIVE // R&D',
      statusColor: 'var(--acid-lime)',
      disciplines: ['FULLSTACK WEBGL', 'THREE.JS', 'STRUCTURAL COMPUTING', 'BRUTALISM'],
      desc: 'Founded independent multidisciplinary studio operating at the intersection of civil engineering and high-performance web graphics. Developing real-time WebGL finite-element visualizers, interactive CAD sandboxes, and Swiss brutalist digital flagships for architecture, engineering, and digital-first clients worldwide.',
      deliverables: [
        'Real-time Browser FEA & Stress Solvers (WebGL/Three.js)',
        'Zero-Jank Responsive Frontends with 100svh Mobile Stability',
        'Tactile Zine & Editorial Design Systems'
      ],
      code: 'MILESTONE_01'
    },
    {
      year: '2024 — 2025',
      role: 'COMPUTATIONAL STRUCTURAL SYSTEMS & BIM SPECIALIST',
      org: 'INFRASTRUCTURE ENGINEERING ALLIANCE',
      status: 'PRODUCTION // OK',
      statusColor: 'var(--electric-blue)',
      disciplines: ['PARAMETRIC BRIDGES', 'SEISMIC FEM', 'BIM ISO-19650', 'PYTHON'],
      desc: 'Led computational structural modeling and finite element analyses for multi-span bridges and complex civil infrastructure. Engineered custom Python pipelines to automatically extract analysis data from ETABS and AutoCAD directly into interactive web dashboards for client review.',
      deliverables: [
        '180m Tied-Arch Parametric Digital Twin (FEM Modal Analysis)',
        'Automated Rebar Schedule & Quantities Takeoff Tooling',
        'ISO-19650 BIM Information Exchange Compliance'
      ],
      code: 'MILESTONE_02'
    },
    {
      year: '2022 — 2024',
      role: 'FULLSTACK DEVELOPER & DIGITAL ARCHITECT',
      org: 'CREATIVE TECH & DIGITAL CONSULTING',
      status: 'COMPLETED',
      statusColor: '#8E8E93',
      disciplines: ['WEBGL / SHADERS', 'SVELTE & VITE', 'REST / WEBSOCKET', 'GSAP'],
      desc: 'Engineered high-frequency, GPU-accelerated web experiences, interactive data visualizers, and typography-rich editorial web platforms. Bridged structural engineering principles (equilibrium, load paths, precision) directly into clean software architectures.',
      deliverables: [
        'Interactive 3D Topographic Terrain Viewers (LiDAR Point-Clouds)',
        'Hardware-Accelerated Kinetic Typography Engines',
        'Responsive Web Architectures (60-120fps Performance)'
      ],
      code: 'MILESTONE_03'
    },
    {
      year: '2020 — 2022',
      role: 'CIVIL & INFRASTRUCTURE SITE ENGINEER',
      org: 'HEAVY CIVIL CONTRACTORS & SURVEY CONSULTING',
      status: 'COMPLETED',
      statusColor: '#8E8E93',
      disciplines: ['REINFORCED CONCRETE', 'GEOTECHNICAL EQUILIBRIUM', 'AUTOCAD', 'SNI/ACI'],
      desc: 'Managed structural site operations, geodetic survey inspections, foundation settlement monitoring, and structural shop drawings review for commercial infrastructure projects. Verified structural integrity against building codes and limit states.',
      deliverables: [
        'Foundation Settlement & Geotechnical Deformation Monitoring',
        'Total Station Topographic Survey & Boundary Control',
        'Structural Reinforcement Steel Detailing & Field QC'
      ],
      code: 'MILESTONE_04'
    },
    {
      year: '2017 — 2021',
      role: 'B.ENG. IN CIVIL & STRUCTURAL ENGINEERING',
      org: 'FACULTY OF CIVIL & ENVIRONMENTAL ENGINEERING',
      status: 'DEGREE CONFERRED',
      statusColor: 'var(--accent-text)',
      disciplines: ['CONTINUUM MECHANICS', 'STRUCTURAL DYNAMICS', 'MATRIX ANALYSIS', 'FEA'],
      desc: 'Graduated with honors in Civil Engineering. Rigorous foundation in structural analysis, concrete/steel design, fluid mechanics, and computational calculus. Published undergraduate research on non-linear dynamic responses in steel trusses.',
      deliverables: [
        'Bachelor of Engineering Degree (Honors)',
        'Undergraduate Thesis: Computational Modeling of Dynamic Load Paths',
        'Mastery of Euler-Bernoulli & Timoshenko Beam Theories'
      ],
      code: 'MILESTONE_05'
    }
  ];
</script>

<section class="editorial-section" id="sec-timeline" data-section-index="04" data-section-name="04. TIMELINE">
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 04</span>
        <span>·</span>
        <span>CAREER TIMELINE &amp; EVOLUTION (2017 — 2026)</span>
      </div>
      <h2 class="section-oversized-title">
        CAREER <span class="serif-italic">Timeline</span> &amp; Trajectory
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>CHRONOLOGICAL TRACK RECORD · CIVIL ENGINEERING × FULLSTACK WEBGL</div>
      <div style="color:var(--accent-text); font-weight:800;">5 PIVOTAL MILESTONES INDEXED [↓]</div>
    </div>
  </div>

  <div class="timeline-container" data-thread-anchor="sec04-timeline">
    <div class="timeline-rail-spine" aria-hidden="true"></div>

    <div class="timeline-nodes-list">
      {#each milestones as item, i}
        <article class="timeline-milestone-card" class:is-current={i === 0}>
          <div class="milestone-station-header">
            <div class="milestone-year-box">
              <span class="station-bullet"></span>
              <span class="milestone-year-text">{item.year}</span>
            </div>
            <div class="milestone-status-badge" style="border-color:{item.statusColor}; color:{item.statusColor};">
              {item.status}
            </div>
            <div class="milestone-code-tag">[{item.code}]</div>
          </div>

          <div class="milestone-card-body">
            <h3 class="milestone-role-title">{item.role}</h3>
            <div class="milestone-org-name">{item.org}</div>

            <div class="milestone-discipline-row">
              {#each item.disciplines as tag}
                <span class="discipline-tag">{tag}</span>
              {/each}
            </div>

            <p class="milestone-description">{item.desc}</p>

            <div class="milestone-deliverables-box">
              <div class="deliverables-heading">// KEY DELIVERABLES &amp; CAPABILITIES:</div>
              <ul class="deliverables-list">
                {#each item.deliverables as d}
                  <li><span class="deliv-bullet">›</span> {d}</li>
                {/each}
              </ul>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
