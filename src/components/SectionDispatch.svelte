<!--
  SectionDispatch.svelte
  Section 06: ISO Engineering Title Block & Transmission Dispatch
-->
<section class="editorial-section" id="sec-dispatch" data-section-index="06" data-section-name="06. TITLE BLOCK">
  <div class="section-header-strip">
    <div>
      <div class="section-kicker">
        <span>// SECTION 06</span>
        <span>·</span>
        <span>COLOPHON &amp; PROJECT BRIEF TRANSMISSION</span>
      </div>
      <h2 class="section-oversized-title">
        INITIATE <span class="serif-italic">Blueprint</span> DISPATCH
      </h2>
    </div>
    <div class="section-meta-readout">
      <div>AVAILABLE FOR SELECT COMMISSIONS &amp; CREATIVE DIRECTION</div>
      <div style="color:var(--accent-text); font-weight:800;">RESPONSE SLA: &lt; 24 HOURS</div>
    </div>
  </div>

  <div class="iso-titleblock-wrapper">
    <!-- Left Pane: Interactive Project Dispatch Form -->
    <div class="transmission-form-pane" data-thread-anchor="sec06-form" data-thread-bias="left">
      <form id="blueprint-dispatch-form">
        <div class="blueprint-input-group">
          <label class="blueprint-label" for="input-sender">01 // ORIGINATOR NAME OR STUDIO</label>
          <input type="text" id="input-sender" class="blueprint-input" placeholder="e.g. STUDIO ARCHETYPE // CHIEF ENGINEER" required />
        </div>

        <div class="blueprint-input-group">
          <label class="blueprint-label" for="input-email">02 // RETURN TELEMETRY ADDRESS (EMAIL)</label>
          <input type="email" id="input-email" class="blueprint-input" placeholder="dispatch@domain.studio" required />
        </div>

        <div class="blueprint-input-group">
          <label class="blueprint-label" for="input-scope">03 // DISCIPLINARY VECTOR</label>
          <select id="input-scope" class="blueprint-select">
            <option value="Experimental WebGL & Interactive Portfolio">Experimental WebGL &amp; Interactive Platform</option>
            <option value="Civil / Structural Visualization & BIM Tooling">Civil / Structural Visualization &amp; BIM Tooling</option>
            <option value="Editorial Brand Identity & Art Direction">Editorial Brand Identity &amp; Art Direction</option>
            <option value="Full Multidisciplinary Synthesis">Full Multidisciplinary Synthesis (Eng + IT + Design)</option>
          </select>
        </div>

        <div class="blueprint-input-group">
          <label class="blueprint-label" for="input-brief">04 // TECHNICAL SPECIFICATIONS &amp; BRIEF</label>
          <textarea id="input-brief" class="blueprint-textarea" rows="3" placeholder="Specify load requirements, aesthetic coordinates, and timeline..."></textarea>
        </div>

        <button type="submit" class="submit-blueprint-btn">
          <span>TRANSMIT BLUEPRINT PACKET</span>
          <span>⌖</span>
        </button>

        <div id="dispatch-receipt-output" style="display:none; margin-top:16px; padding:14px; background:#0D0D10; color:#F2EFE9; font-family:var(--font-mono); font-size:11px; border-left:4px solid var(--acid-lime);"></div>
      </form>
    </div>

    <!-- Right Pane: Authentic ISO 7200 Architectural Drawing Title Block -->
    <div class="iso-drawing-stamp-pane" data-thread-anchor="sec06-stamp" data-thread-bias="right">
      <div class="iso-grid-cells">
        <div class="iso-cell">
          <div class="iso-cell-label">DRAWING TITLE</div>
          <div class="iso-cell-value">MULTIDISCIPLINARY PORTFOLIO</div>
        </div>
        <div class="iso-cell">
          <div class="iso-cell-label">DOCUMENT NO.</div>
          <div class="iso-cell-value">KS-2026-ARCHIVE-07</div>
        </div>
        <div class="iso-cell">
          <div class="iso-cell-label">BACKGROUND</div>
          <div class="iso-cell-value">CIVIL ENGINEERING (B.Eng)</div>
        </div>
        <div class="iso-cell">
          <div class="iso-cell-label">CORE FOCUS</div>
          <div class="iso-cell-value">IT SYSTEMS &amp; GRAPHIC DESIGN</div>
        </div>
        <div class="iso-cell">
          <div class="iso-cell-label">PROJECTION / SCALE</div>
          <div class="iso-cell-value">ISO FIRST ANGLE // 1:100</div>
        </div>
        <div class="iso-cell">
          <div class="iso-cell-label">SHEET INDEX</div>
          <div class="iso-cell-value">06 / 06 [REV. D]</div>
        </div>
      </div>

      <div class="iso-approval-stamp">
        <div class="iso-stamp-kicker">STRUCTURAL &amp; EDITORIAL SEAL</div>
        <div class="iso-stamp-headline">APPROVED FOR CONSTRUCTION</div>
        <div class="iso-stamp-sub">KINETIK.STRUCT INDEPENDENT DIGITAL STUDIO</div>
      </div>
    </div>
  </div>
</section>
