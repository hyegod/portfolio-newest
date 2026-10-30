<!--
  SectionCad3D.svelte
  Section 03: Interactive 3D WebGL Structural & Topographic CAD Lab
  (Viewport-culled via IntersectionObserver for 0% GPU usage when off-screen)
-->
<section class="editorial-section" id="sec-work" data-section-index="03" data-section-name="03. WORK">
  <div id="sec-cad-3d" style="position:absolute; top:0; pointer-events:none;" aria-hidden="true"></div>
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 03</span>
        <span>·</span>
        <span>KERJAAN GUA // FEATURED WORK &amp; 3D CAD LAB</span>
      </div>
      <h2 class="section-oversized-title">
        FEATURED <span class="serif-italic">Works</span> &amp; 3D Lab
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>PRODUCTION 3D CAD SANDBOX &amp; COMPUTATIONAL ENGINEERING SUITE</div>
      <div style="color:var(--accent-text); font-weight:800;">INTERACTIVE DEMO BELOW · DRAG TO ORBIT / TWEAK STRESS [↓]</div>
    </div>
  </div>

  <div class="cad-3d-lab-wrapper">
    <!-- Left Control Sidebar -->
    <div class="cad-control-sidebar" data-thread-anchor="sec03-sidebar" data-thread-bias="left">
      <div>
        <div style="font-family:var(--font-mono); font-size:11px; color:var(--acid-lime); font-weight:800; letter-spacing:0.12em;">
          SELECT PARAMETRIC GEOMETRY //
        </div>

        <div class="cad-model-selector">
          <button type="button" class="cad-model-btn active" data-cad-model="hypar">
            <span>01. HYPAR SADDLE SHELL</span>
            <span>[THIN SHELL]</span>
          </button>
          <button type="button" class="cad-model-btn" data-cad-model="truss">
            <span>02. PRATT BRIDGE TRUSS</span>
            <span>[SPACE FEM]</span>
          </button>
          <button type="button" class="cad-model-btn" data-cad-model="topo">
            <span>03. TOPOGRAPHIC MATRIX</span>
            <span>[GIS DEM]</span>
          </button>
          <button type="button" class="cad-model-btn" data-cad-model="tensegrity">
            <span>04. TENSEGRITY PAVILION</span>
            <span>[KINETIC]</span>
          </button>
        </div>

        <div style="font-family:var(--font-mono); font-size:11px; color:var(--acid-lime); font-weight:800; letter-spacing:0.12em; margin-bottom:12px;">
          STRUCTURAL PARAMETERS //
        </div>

        <div class="cad-param-group">
          <div class="cad-param-label">
            <span>APPLIED LOAD (Q_u)</span>
            <strong id="cad-val-load" style="color:var(--acid-lime);">450 kN</strong>
          </div>
          <input type="range" id="cad-slider-load" class="eng-range-slider" style="width:100%;" min="50" max="1200" step="25" value="450" />
        </div>

        <div class="cad-param-group">
          <div class="cad-param-label">
            <span>SEISMIC RESONANCE (ω)</span>
            <strong id="cad-val-freq" style="color:var(--acid-lime);">2.4 Hz</strong>
          </div>
          <input type="range" id="cad-slider-freq" class="eng-range-slider" style="width:100%;" min="0.2" max="8.0" step="0.2" value="2.4" />
        </div>

        <div class="cad-param-group">
          <div class="cad-param-label">
            <span>FEM MESH SUBDIVISION</span>
            <strong id="cad-val-density" style="color:var(--acid-lime);">24×24</strong>
          </div>
          <input type="range" id="cad-slider-density" class="eng-range-slider" style="width:100%;" min="8" max="44" step="4" value="24" />
        </div>

        <div class="cad-param-group">
          <div class="cad-param-label">
            <span>RADIAL EXPANSION</span>
            <strong id="cad-val-explode" style="color:var(--acid-lime);">0%</strong>
          </div>
          <input type="range" id="cad-slider-explode" class="eng-range-slider" style="width:100%;" min="0" max="1" step="0.05" value="0" />
        </div>
      </div>

      <div style="border-top:1px dashed rgba(255,255,255,0.2); padding-top:14px; font-family:var(--font-mono); font-size:10px; line-height:1.6; color:#9496A1;">
        <div>SOLVER: THREE.JS BUFFER-GEOMETRY</div>
        <div>COORDINATE SYS: RIGHT-HAND ISO</div>
        <div>MATERIAL: S355J2 STRUCTURAL STEEL</div>
      </div>
    </div>

    <!-- Right 3D WebGL Viewport -->
    <div class="cad-viewport-container" data-thread-anchor="sec03-viewport" data-thread-bias="right">
      <canvas id="cad-interactive-canvas"></canvas>

      <div class="cad-hud-overlay-top">
        <div class="cad-hud-box">
          <div style="color:#9496A1; font-size:9px;">VON MISES STRESS (σ_vm)</div>
          <div id="hud-von-mises" style="color:#FFFFFF; font-weight:800; font-size:14px;">189.0 MPa</div>
        </div>
        <div class="cad-hud-box">
          <div style="color:#9496A1; font-size:9px;">LIMIT STATE SAFETY</div>
          <div id="hud-safety-factor" style="color:var(--acid-lime); font-weight:800; font-size:14px;">FS = 1.83</div>
        </div>
        <div class="cad-hud-box">
          <div style="color:#9496A1; font-size:9px;">ACTIVE DISCRETIZATION</div>
          <div id="hud-node-count" style="color:#00B4FF; font-weight:800; font-size:14px;">576 NODES</div>
        </div>
      </div>

      <div class="cad-hud-bottom">
        <div class="cad-hud-box">
          <span>INTERACTION: LMB ORBIT // WHEEL ZOOM</span>
        </div>
        <div class="cad-view-buttons">
          <button type="button" class="cad-cam-btn active" data-cam-view="iso">ISO 3D</button>
          <button type="button" class="cad-cam-btn" data-cam-view="top">TOP PLAN</button>
          <button type="button" class="cad-cam-btn" data-cam-view="front">FRONT ELEV</button>
          <button type="button" class="cad-cam-btn" data-cam-view="side">SECTION A-A</button>
        </div>
      </div>
    </div>
  </div>
</section>
