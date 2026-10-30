<!--
  SectionSpread.svelte
  Section 01: Editorial Campaign Spread (Manifesto Essay + Collage Cards 01, 02, 03 + Synthesis Bridge)
-->
<script>
  import { onMount, tick } from 'svelte';
  import { playMechanicalTick } from '../lib/interactions.js';

  const FULL_MANIFESTO_WORDS = (
    'I AM FARREL — AN ENGINEER AND CREATIVE TECHNOLOGIST OPERATING AT THE INTERSECTION OF ' +
    'CIVIL & STRUCTURAL ENGINEERING, ADVANCED FULLSTACK WEBGL DEVELOPMENT, AND EXPERIMENTAL EDITORIAL DESIGN. ' +
    'TRAINED IN CONTINUUM MECHANICS, SEISMIC EQUILIBRIUM, AND HIGH-PRECISION FINITE-ELEMENT ANALYSIS, ' +
    'I BRING THE STRUCTURAL INTEGRITY OF HEAVY INFRASTRUCTURE INTO DIGITAL ARCHITECTURE AND HIGH-PERFORMANCE WEB SYSTEMS. ' +
    'I DO NOT TREAT CODE, CONCRETE, AND TYPOGRAPHY AS SEPARATE SILOS — EVERY SYSTEM DOCUMENTS THE SYMBIOSIS OF ' +
    'LOAD-BEARING RIGOR, REAL-TIME COMPUTATIONAL TELEMETRY, AND ARCHIVAL PRINT CRAFTSMANSHIP. ' +
    'FROM PARAMETRIC BRIDGES AND ISO-19650 BIM WORKFLOWS TO BROWSER-BASED SHADERS AND BRUTALIST ZINES, ' +
    'I BUILD ROBUST DIGITAL AND PHYSICAL ARTIFACTS ENGINEERED TO LAST.'
  ).split(' ');

  let showMoreEssay = false;
  let manuallyToggled = false;
  let card01El = null;
  let sidebarEl = null;
  let headerGroupEl = null;
  let bottomContentEl = null;
  let probeEl = null;
  let moreInnerEl = null;
  let card01Height = 580;
  let mobilePadTop = 28;
  let collapsedWordCount = 40;
  let expandedInnerH = 235;

  $: collapsedText = FULL_MANIFESTO_WORDS.slice(0, collapsedWordCount).join(' ');
  $: expandedText = FULL_MANIFESTO_WORDS.slice(collapsedWordCount).join(' ');

  async function calibrateCollapsedWords() {
    if (!card01El || !sidebarEl || !headerGroupEl || !bottomContentEl) return;

    // On mobile phone (< 768px), cards are stacked vertically in 1 column.
    // Use an optimal fixed word count to completely eliminate forced synchronous reflow loops on page load!
    if (window.innerWidth < 768) {
      collapsedWordCount = 38;
      return;
    }

    if (!probeEl) return;
    const cHeight = card01El.offsetHeight;
    if (cHeight < 200) return;
    card01Height = cHeight;

    const sidebarStyle = window.getComputedStyle(sidebarEl);
    const padTop = parseFloat(sidebarStyle.paddingTop) || 16;
    const padBottom = parseFloat(sidebarStyle.paddingBottom) || 16;
    const borderTop = parseFloat(sidebarStyle.borderTopWidth) || 1.5;
    const borderBottom = parseFloat(sidebarStyle.borderBottomWidth) || 1.5;

    const headerH = headerGroupEl.offsetHeight;
    const bottomH = bottomContentEl.offsetHeight;
    const specMarginTop = 16;

    // Exact vertical space inside Left Card for the collapsed paragraph so it fills right up to SPEC // ISO-19650
    const availableTextH = Math.max(
      72,
      cHeight - (padTop + padBottom + borderTop + borderBottom + headerH + bottomH + specMarginTop)
    );

    const minWords = 18;
    const maxWords = FULL_MANIFESTO_WORDS.length - 32;
    let low = minWords;
    let high = maxWords;
    let best = minWords;

    while (low <= high) {
      const mid = (low + high) >> 1;
      probeEl.textContent = FULL_MANIFESTO_WORDS.slice(0, mid).join(' ') + ' ...show more';
      const h = probeEl.offsetHeight;
      if (h <= availableTextH + 6) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    collapsedWordCount = best;
    await tick();
    if (moreInnerEl) {
      expandedInnerH = moreInnerEl.offsetHeight;
    }
  }

  function toggleEssayMore() {
    if (moreInnerEl) {
      expandedInnerH = moreInnerEl.offsetHeight;
    }
    showMoreEssay = !showMoreEssay;
    manuallyToggled = showMoreEssay;
    playMechanicalTick(1080, 0.025);
  }

  onMount(() => {
    // Immediate calculation for mobile without forced reflow
    if (window.innerWidth < 768) {
      calibrateCollapsedWords();
    } else {
      // Defer tablet & desktop binary search to idle so it never blocks initial paint
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => calibrateCollapsedWords());
      } else {
        setTimeout(calibrateCollapsedWords, 60);
      }
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (window.innerWidth >= 768) calibrateCollapsedWords();
      });
    }

    let lastW = typeof window !== 'undefined' ? window.innerWidth : 0;
    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      if (window.innerWidth >= 768) calibrateCollapsedWords();
    };
    window.addEventListener('resize', onResize, { passive: true });

    let ro = null;
    if (card01El && typeof ResizeObserver !== 'undefined' && window.innerWidth >= 768) {
      ro = new ResizeObserver(() => {
        calibrateCollapsedWords();
      });
      ro.observe(card01El);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
    };
  });
</script>

<section class="editorial-section" id="sec-whoami" data-section-index="01" data-section-name="01. WHO AM I">
  <div id="sec-spread" style="position:absolute; top:0; pointer-events:none;" aria-hidden="true"></div>
  <div class="spread-01-container">

    <!-- TOP ROW: LEFT MANIFESTO ESSAY + RIGHT LARGE HALFTONE CARD 01 -->
    <div class="spread-top-row" class:is-expanded={showMoreEssay} style="--card01-h: {card01Height}px; --mobile-pad-top: {mobilePadTop}px;">

      <!-- Left Editorial Column -->
      <div bind:this={sidebarEl} class="editorial-sidebar-essay" data-thread-anchor="sec01-manifesto" data-thread-bias="left">
        <div class="essay-top-content">
          <div bind:this={headerGroupEl} class="essay-header-group">
            <div class="essay-index-tag">WHO AM I // PERSONAL DOSSIER</div>
            <h1 class="essay-main-title">
              THE HYBRID<br />
              PRACTITIONER
            </h1>
          </div>

          <!-- Hidden measurement probe matching exact column width & typography -->
          <p bind:this={probeEl} class="essay-paragraph essay-measure-probe" aria-hidden="true"></p>

          <p class="essay-paragraph">
            {collapsedText}
            <button
              type="button"
              class="essay-inline-toggle"
              class:is-hidden={showMoreEssay}
              aria-hidden={showMoreEssay}
              tabindex={showMoreEssay ? -1 : 0}
              on:click={toggleEssayMore}
            >
              ...show more
            </button>
          </p>

          <div
            class="essay-more-collapse"
            class:is-expanded={showMoreEssay}
            style="height: {showMoreEssay ? expandedInnerH : 0}px;"
          >
            <div bind:this={moreInnerEl} class="essay-more-inner">
              <p class="essay-paragraph essay-paragraph--more">
                {expandedText}
                <button type="button" class="essay-inline-toggle" on:click={toggleEssayMore}>
                  show less
                </button>
              </p>
            </div>
          </div>
        </div>

        <div bind:this={bottomContentEl} class="essay-bottom-content">
          <!-- Engineering Telemetry Mini-Matrix -->
          <div class="essay-spec-matrix">
            <div class="spec-row">
              <span class="spec-label">PRACTITIONER</span>
              <span class="spec-val">FARREL // KINETIK</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">DISCIPLINE 01</span>
              <span class="spec-val">CIVIL &amp; STRUCTURAL ENG</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">DISCIPLINE 02</span>
              <span class="spec-val">FULLSTACK &amp; WEBGL</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">DISCIPLINE 03</span>
              <span class="spec-val">BRUTALIST EDITORIAL</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">CORE MOTTO</span>
              <span class="spec-val" style="color:var(--accent-text);">TECTONIC // BUILT TO LAST</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">EXPERIENCE</span>
              <span class="spec-val" data-anime-counter="5" data-suffix="+ YEARS">5+ YEARS</span>
            </div>
          </div>

          <div style="margin-top: 14px; display:flex; flex-direction:column; gap:8px;">
            <a href="#sec-identity" class="submit-blueprint-btn" style="text-decoration:none; justify-content:center; padding:11px 14px; font-size:10.5px;">
              <span>EXPLORE WHAT I DO</span>
              <span>→</span>
            </a>
            <a href="#sec-work" class="inspect-case-btn" style="text-decoration:none; text-align:center; width:100%; padding:9px;">
              VIEW FEATURED WORKS // SPEC
            </a>
          </div>
        </div>
      </div>

      <!-- RIGHT LARGE CARD 01: CIVIL ENGINEERING // TECTONIC PRECISION -->
      <article bind:this={card01El} class="collage-card collage-card--01 collage-card--halftone-frame" data-thread-anchor="sec01-card01" data-thread-bias="right">
        <div class="badge-num-circle">01</div>

        <div class="torn-tape-sticker tape--rose-top">
          SINCE<br /><u>2021</u>
        </div>

        <div class="torn-tape-sticker tape--slate-bottom">
          BUILT FOR THE LOAD.<br />
          ENGINEERED FOR THE<br />
          DIGITAL WORLD.
        </div>

        <div class="collage-visual-stage">
          <img
            src="/assets/images/campaign-01.webp"
            srcset="/assets/images/campaign-01-480.webp 480w, /assets/images/campaign-01-640.webp 640w, /assets/images/campaign-01.webp 800w"
            sizes="(max-width: 480px) 100vw, (max-width: 960px) 640px, 800px"
            alt="Civil Engineer in utilitarian workwear holding blueprints beside a brutalist concrete bridge pier and steel truss"
            class="collage-photo"
            width="800"
            height="1071"
            decoding="async"
            fetchpriority="high"
          />

          <svg class="handstyle-tag-svg" viewBox="0 0 520 190" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tectonic Handstyle Tag">
            <path class="handstyle-stroke-path" d="M22 52 C140 38, 320 46, 485 32" stroke="#0D0D10" stroke-width="14" stroke-linecap="round" />
            <path class="handstyle-stroke-path" d="M115 16 L68 158 M168 22 L128 152" stroke="#0D0D10" stroke-width="15" stroke-linecap="round" />
            <path class="handstyle-stroke-path" d="M42 115 C78 65, 145 70, 118 128 C96 168, 175 150, 208 92 C232 52, 265 138, 232 148 C198 156, 282 65, 318 82 C352 98, 310 156, 362 138 C408 122, 435 64, 468 95 C495 120, 460 175, 442 182" stroke="#0D0D10" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="242" cy="24" r="8" fill="#0D0D10" />
            <circle cx="272" cy="22" r="8" fill="#0D0D10" />
          </svg>

          <div class="handwritten-stack-list">
            STRUCTURAL FEM<br />
            BRIDGE TECTONICS<br />
            BIM // ISO-19650<br />
            SEISMIC DYNAMICS<br />
            PARAMETRIC CAD
          </div>

          <div class="studio-monogram-badge" style="bottom: 84px; right: 24px;" title="Kinetik.Struct Studio Seal">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#0D0D10" stroke-width="3"/>
              <path d="M11 26 L20 10 L29 26 Z" stroke="#0D0D10" stroke-width="2.5" fill="none"/>
              <path d="M14 15 H26 M12 22 H28" stroke="#0038FF" stroke-width="2.5"/>
            </svg>
          </div>

          <div class="barcode-sticker-box">
            <div class="barcode-bars">
              <div class="barcode-laser-line"></div>
            </div>
            <div class="barcode-digits">8 94021 73250 1</div>
          </div>

          <div class="cad-xray-layer">
            <svg class="cad-xray-svg" viewBox="0 0 900 490" preserveAspectRatio="none">
              <line x1="0" y1="245" x2="900" y2="245" stroke="#D4FF00" stroke-width="1" stroke-dasharray="6 4"/>
              <line x1="450" y1="0" x2="450" y2="490" stroke="#D4FF00" stroke-width="1" stroke-dasharray="6 4"/>
              <polygon points="390,70 610,70 645,420 355,420" fill="none" stroke="#D4FF00" stroke-width="1.8"/>
              <line x1="390" y1="70" x2="645" y2="420" stroke="#D4FF00" stroke-width="1.2"/>
              <line x1="610" y1="70" x2="355" y2="420" stroke="#D4FF00" stroke-width="1.2"/>
              <rect x="405" y="82" width="185" height="26" fill="#0D0D10"/>
              <text x="415" y="99" fill="#D4FF00" font-family="JetBrains Mono" font-size="12" font-weight="bold">TRUSS SPAN: L = 240.0m // ΦPn = 18.4 MN</text>
            </svg>
          </div>
        </div>

        <div class="card-editorial-caption-bar">
          <div class="caption-pillar-tag">
            <span class="pillar-code">DIM-01</span>
            <span>ENGINEERING MINDSET // STRUCTURAL &amp; ARCHITECTURAL SYSTEMS</span>
          </div>
          <button type="button" class="inspect-case-btn" data-open-dossier="campaign-01">
            INSPECT BLUEPRINT [+]
          </button>
        </div>
      </article>

    </div>

    <!-- BOTTOM ROW: CARD 02 (IT / COMPUTATIONAL) + CARD 03 (GRAPHIC DESIGN / EDITORIAL) -->
    <div class="spread-bottom-row">

      <!-- CARD 02: INFORMATION TECHNOLOGY // CYBER-KINETIC SYSTEMS -->
      <article class="collage-card collage-card--02" data-thread-anchor="sec01-card02" data-thread-bias="left">
        <div class="badge-num-circle">02</div>

        <div class="collage-visual-stage">
          <img
            src="/assets/images/campaign-02.webp"
            srcset="/assets/images/campaign-02-480.webp 480w, /assets/images/campaign-02-640.webp 640w, /assets/images/campaign-02.webp 800w"
            sizes="(max-width: 480px) 100vw, (max-width: 960px) 640px, 800px"
            alt="Experimental kinetic tensegrity drone surveying rig suspended against a deep cobalt blue sky"
            class="collage-photo"
            width="800"
            height="1071"
            decoding="async"
            loading="lazy"
          />

          <svg class="handstyle-tag-svg" viewBox="0 0 420 165" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="handstyle-stroke-path" d="M18 46 C115 34, 248 40, 382 28" stroke="#F2EFE9" stroke-width="11" stroke-linecap="round"/>
            <path class="handstyle-stroke-path" d="M88 14 L52 138 M136 18 L104 134" stroke="#F2EFE9" stroke-width="12" stroke-linecap="round"/>
            <path class="handstyle-stroke-path" d="M34 102 C68 58, 128 62, 102 114 C82 146, 152 128, 184 78 C206 44, 240 120, 212 128 C185 135, 255 58, 290 74 C324 88, 305 148, 345 124" stroke="#F2EFE9" stroke-width="11" stroke-linecap="round"/>
          </svg>

          <div class="handwritten-stack-list">
            THREE.JS // WEBGL<br />
            FULLSTACK ARCH<br />
            RUST + WASM FEM<br />
            ALGORITHMIC UI<br />
            SPATIAL COMPUTING
          </div>

          <div style="position:absolute; bottom:16px; left:16px; z-index:26; background:rgba(13,13,16,0.82); color:#F2EFE9; padding:8px 12px; font-family:var(--font-mono); font-size:9.5px; line-height:1.45; letter-spacing:0.08em; border-left:3px solid var(--acid-lime);">
            COMPUTATIONAL TRIBE<br />
            UNITED BY CODE,<br />
            PHYSICS, AND<br />
            CREATIVE SPIRIT.
          </div>

          <div class="torn-tape-sticker" style="bottom: 6px; left: 42%; background: var(--tape-rose); padding: 12px 18px; transform: rotate(-9deg); z-index: 27;">
            <div class="studio-monogram-badge" style="position:static; width:46px; height:46px;">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="#0D0D10" stroke-width="3"/>
                <path d="M13 15 L8 20 L13 25 M27 15 L32 20 L27 25 M22 12 L18 28" stroke="#0D0D10" stroke-width="2.8" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <div class="barcode-sticker-box">
            <div class="barcode-bars">
              <div class="barcode-laser-line"></div>
            </div>
            <div class="barcode-digits">3 25270 88412 6</div>
          </div>

          <div class="cad-xray-layer">
            <svg class="cad-xray-svg" viewBox="0 0 600 430" preserveAspectRatio="none">
              <circle cx="305" cy="185" r="125" fill="none" stroke="#D4FF00" stroke-width="1.5" stroke-dasharray="5 5"/>
              <line x1="150" y1="95" x2="420" y2="55" stroke="#D4FF00" stroke-width="2"/>
              <line x1="150" y1="95" x2="210" y2="290" stroke="#D4FF00" stroke-width="2"/>
              <rect x="24" y="20" width="210" height="24" fill="#0D0D10"/>
              <text x="32" y="36" fill="#D4FF00" font-family="JetBrains Mono" font-size="11" font-weight="bold">TELEMETRY: 120 FPS // WebGL2</text>
            </svg>
          </div>
        </div>

        <div class="card-editorial-caption-bar">
          <div class="caption-pillar-tag">
            <span class="pillar-code">DIM-02</span>
            <span>TECHNOLOGICAL CURIOSITY // IT &amp; CREATIVE CODING</span>
          </div>
          <button type="button" class="inspect-case-btn" data-open-dossier="campaign-02">
            INSPECT SYSTEM [+]
          </button>
        </div>
      </article>

      <!-- CARD 03: GRAPHIC DESIGN // EXPERIMENTAL EDITORIAL & COLLAGE -->
      <article class="collage-card collage-card--03" data-thread-anchor="sec01-card03" data-thread-bias="right">
        <div class="badge-num-circle">03</div>

        <div class="collage-visual-stage">
          <img
            src="/assets/images/campaign-03.webp"
            srcset="/assets/images/campaign-03-480.webp 480w, /assets/images/campaign-03-640.webp 640w, /assets/images/campaign-03.webp 800w"
            sizes="(max-width: 480px) 100vw, (max-width: 960px) 640px, 800px"
            alt="Editorial collage combining studio workwear sweatshirt with brutalist architecture loupe and cyan engineering blueprints"
            class="collage-photo"
            width="800"
            height="1071"
            decoding="async"
            loading="lazy"
          />

          <div style="position:absolute; bottom:96px; right:18px; z-index:26; background:rgba(242,239,233,0.92); color:#0D0D10; padding:6px 12px; font-family:var(--font-marker); font-size:15px; transform:rotate(-8deg); border-bottom:3px solid #0D0D10; box-shadow:3px 3px 0 rgba(0,0,0,0.25);">
            BUILT TO LAST
          </div>

          <div class="torn-tape-sticker tape--slate-card03">
            SWISS GRIDS<br />
            HALFTONE PRINT<br />
            BRUTALIST TYPE<br />
            3D MOTION<br />
            BRAND SYSTEMS
          </div>

          <div class="barcode-sticker-box">
            <div class="barcode-bars">
              <div class="barcode-laser-line"></div>
            </div>
            <div class="barcode-digits">3 25270 73250 6</div>
          </div>

          <div class="cad-xray-layer">
            <svg class="cad-xray-svg" viewBox="0 0 600 430" preserveAspectRatio="none">
              <circle cx="300" cy="215" r="108" fill="none" stroke="#D4FF00" stroke-width="2"/>
              <line x1="0" y1="215" x2="600" y2="215" stroke="#D4FF00" stroke-width="1" stroke-dasharray="4 4"/>
              <line x1="300" y1="0" x2="300" y2="430" stroke="#D4FF00" stroke-width="1" stroke-dasharray="4 4"/>
              <rect x="24" y="20" width="235" height="24" fill="#0D0D10"/>
              <text x="32" y="36" fill="#D4FF00" font-family="JetBrains Mono" font-size="11" font-weight="bold">GOLDEN GRID // RATIO φ = 1.61803</text>
            </svg>
          </div>
        </div>

        <div class="card-editorial-caption-bar">
          <div class="caption-pillar-tag">
            <span class="pillar-code">DIM-03</span>
            <span>CREATIVE EXPRESSION // EDITORIAL &amp; VISUAL IDENTITY</span>
          </div>
          <button type="button" class="inspect-case-btn" data-open-dossier="campaign-03">
            INSPECT COLLAGE [+]
          </button>
        </div>
      </article>

      <!-- Bottom-Left Torn Rose Tape Anchor -->
      <div class="torn-tape-sticker tape--rose-bottom-left">
        SINCE <u>2021</u>
      </div>

    </div>

    <!-- DAKSH GAJJAR HOMAGE: "SCROLL TO FOLLOW THE THREAD" -->
    <div class="thread-synthesis-banner" data-thread-anchor="sec01-bridge" data-thread-bias="center">
      <div class="thread-banner-top">
        <span class="thread-kicker">// DISCIPLINARY SYNTHESIS · INTENT · INTERACTION · SYSTEM</span>
        <span class="thread-sub">CONNECTING HUMAN INTENT, PHYSICAL MECHANICS &amp; DIGITAL SYSTEMS</span>
      </div>

      <div class="thread-nodes-interactive-row">
        <button type="button" class="thread-stage-node active" data-thread-stage="intent">
          <span class="stage-num">01 //</span>
          <span class="stage-name">INTENT</span>
          <span class="stage-tag">[CIVIL &amp; TECTONIC]</span>
        </button>

        <div class="thread-connector-line">
          <div class="thread-connector-pulse"></div>
        </div>

        <button type="button" class="thread-stage-node" data-thread-stage="interaction">
          <span class="stage-num">02 //</span>
          <span class="stage-name">INTERACTION</span>
          <span class="stage-tag">[EDITORIAL &amp; VISUAL]</span>
        </button>

        <div class="thread-connector-line">
          <div class="thread-connector-pulse"></div>
        </div>

        <button type="button" class="thread-stage-node" data-thread-stage="system">
          <span class="stage-num">03 //</span>
          <span class="stage-name">SYSTEM</span>
          <span class="stage-tag">[FULLSTACK &amp; WEBGL]</span>
        </button>
      </div>

      <div class="thread-stage-readout" id="thread-stage-readout">
        <strong>01 // STRUCTURAL INTENT:</strong> Defining the physical &amp; spatial problem with engineering rigor—load paths, equilibrium, and tectonic honesty before a single pixel or line of code is drawn.
      </div>
    </div>

  </div>
</section>
