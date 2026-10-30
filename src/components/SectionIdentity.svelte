<!--
  SectionIdentity.svelte
  Section 02: Three Dimensions of Identity (Interactive Tri-Pillar Lab:
  Euler-Bernoulli Beam Solver, Cyber Terminal, and Kinetic Type Playground)
-->
<section class="editorial-section" id="sec-identity" data-section-index="02" data-section-name="02. IDENTITY">
  <div id="sec-pillars" style="position:absolute; top:0; pointer-events:none;" aria-hidden="true"></div>
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 02</span>
        <span>·</span>
        <span>WHAT I DO // CORE DISCIPLINES &amp; SERVICES</span>
      </div>
      <h2 class="section-oversized-title">
        WHAT I DO <span class="serif-italic">// Core Disciplines</span>
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>STRUCTURAL ENGINEERING · FULLSTACK WEBGL · BRUTALIST BRANDING</div>
      <div style="color:var(--accent-text); font-weight:800;">INTERACTIVE LIVE EXPERIMENTS BELOW [↓]</div>
    </div>
  </div>

  <div class="tri-pillar-grid">

    <!-- PILLAR 01: CIVIL ENGINEERING (LIVE BEAM DEFLECTION CALCULATOR) -->
    <article class="pillar-module" data-thread-anchor="sec02-pillar01" data-thread-bias="left">
      <div>
        <div class="pillar-module-header">
          <span class="pillar-id-badge">01 // STRUCTURAL &amp; CIVIL ENGINEERING</span>
          <span style="font-family:var(--font-mono); font-size:10px; font-weight:700;">SNI / AISC / FEM</span>
        </div>
        <div class="pillar-module-body">
          <h3 class="pillar-title">Structural Analysis, BIM &amp; Mechanics</h3>
          <p class="pillar-desc">
            What I do: Rigorous structural calculations, finite element modeling (FEM), seismic load verification, reinforced concrete &amp; steel detailing, and parametric BIM workflows.
          </p>

          <!-- Interactive Euler-Bernoulli Beam Simulator -->
          <div class="interactive-widget-box">
            <div class="widget-top-bar">
              <span>LIVE EULER-BERNOULLI BEAM SOLVER</span>
              <span>L = 12.0m</span>
            </div>
            <div class="beam-canvas-wrap">
              <canvas id="beam-solver-canvas" width="380" height="130" style="width:100%; height:130px;"></canvas>
            </div>

            <div class="beam-slider-row">
              <span>LOAD POS (x/L):</span>
              <input type="range" id="beam-load-pos" class="eng-range-slider" min="0.15" max="0.85" step="0.01" value="0.52" />
            </div>
            <div class="beam-slider-row">
              <span>LOAD MAG (P):</span>
              <input type="range" id="beam-load-mag" class="eng-range-slider" min="100" max="600" step="10" value="340" />
            </div>

            <div class="beam-telemetry-grid">
              <div>
                <div style="opacity:0.6;">MAX MOMENT</div>
                <div id="beam-out-moment" style="color:var(--acid-lime); font-weight:800;">1018 kNm</div>
              </div>
              <div>
                <div style="opacity:0.6;">MAX SHEAR</div>
                <div id="beam-out-shear" style="color:#00B4FF; font-weight:800;">177 kN</div>
              </div>
              <div>
                <div style="opacity:0.6;">DEFLECTION δ</div>
                <div id="beam-out-deflect" style="color:#FF3355; font-weight:800;">9.8 mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- PILLAR 02: INFORMATION TECHNOLOGY (LIVE CYBER TERMINAL) -->
    <article class="pillar-module" data-thread-anchor="sec02-pillar02" data-thread-bias="center">
      <div>
        <div class="pillar-module-header">
          <span class="pillar-id-badge">02 // FULLSTACK &amp; WEBGL COMPUTING</span>
          <span style="font-family:var(--font-mono); font-size:10px; font-weight:700;">SVELTE / THREE.JS / API</span>
        </div>
        <div class="pillar-module-body">
          <h3 class="pillar-title">Interactive 3D Web &amp; Fullstack Systems</h3>
          <p class="pillar-desc">
            What I do: Developing GPU-accelerated 3D web applications, real-time Three.js simulations, reactive web architectures (Svelte/Vite), and resilient data backends.
          </p>

          <!-- Interactive Terminal Emulator -->
          <div class="interactive-widget-box">
            <div class="widget-top-bar">
              <span>KINETIK_OS // SHELL v4.2</span>
              <span>STATUS: ONLINE</span>
            </div>
            <div class="cyber-terminal-screen" id="cyber-terminal-output">
              <div style="color:#FFFFFF;">&gt; boot kinetik-studio-kernel --arch=wasm64</div>
              <div>  [OK] Three.js WebGL2 Pipeline initialized</div>
              <div>  [OK] Lenis + GSAP ScrollTrigger synced</div>
              <div>  [READY] Click a module below to execute:</div>
            </div>
            <div class="terminal-cmd-buttons">
              <button type="button" class="term-cmd-btn" data-term-cmd="fem">RUN FEM-SOLVER</button>
              <button type="button" class="term-cmd-btn" data-term-cmd="shader">COMPILE GLSL</button>
              <button type="button" class="term-cmd-btn" data-term-cmd="topology">TRACE NODES</button>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- PILLAR 03: GRAPHIC DESIGN (KINETIC TYPOGRAPHY & HALFTONE SYNTH) -->
    <article class="pillar-module" data-thread-anchor="sec02-pillar03" data-thread-bias="right">
      <div>
        <div class="pillar-module-header">
          <span class="pillar-id-badge">03 // EDITORIAL &amp; BRAND SYSTEMS</span>
          <span style="font-family:var(--font-mono); font-size:10px; font-weight:700;">SWISS GRID / BRUTALISM</span>
        </div>
        <div class="pillar-module-body">
          <h3 class="pillar-title">Brutalist Art Direction &amp; Typography</h3>
          <p class="pillar-desc">
            What I do: Crafting high-impact visual identities, custom variable typography, street-zine print layouts, and brutalist digital platforms built with attitude and tactile craft.
          </p>

          <!-- Interactive Type Synthesizer -->
          <div class="interactive-widget-box">
            <div class="widget-top-bar">
              <span>KINETIC TYPE &amp; HALFTONE SYNTH</span>
              <button type="button" id="type-cycle-word-btn" class="term-cmd-btn" style="padding:2px 6px;">CYCLE WORD ↻</button>
            </div>
            <div class="type-playground-stage">
              <div class="kinetic-preview-word" id="kinetic-preview-word">TECTONIC</div>
            </div>
            <div class="beam-slider-row" style="margin-top:12px;">
              <span>TRACKING:</span>
              <input type="range" id="type-slider-tracking" class="eng-range-slider" min="-8" max="25" step="1" value="-3" />
            </div>
            <div class="beam-slider-row">
              <span>SHEAR SKEW:</span>
              <input type="range" id="type-slider-skew" class="eng-range-slider" min="-24" max="24" step="1" value="-6" />
            </div>
          </div>
        </div>
      </div>
    </article>

  </div>
</section>
