<!--
  DossierModal.svelte
  Case Study / Technical Dossier Modal Drawer
-->
<div class="dossier-modal-backdrop" id="dossier-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="dossier-modal-window">
    <div class="modal-header-bar">
      <span id="modal-code">DOSSIER // SPEC</span>
      <button type="button" class="modal-close-btn" id="modal-close-btn">CLOSE [ESC]</button>
    </div>
    <div class="modal-body-content">
      <div id="modal-discipline" style="font-family:var(--font-mono); font-size:11px; color:var(--accent-text); font-weight:800; margin-bottom:8px; text-transform:uppercase;"></div>
      <h2 id="modal-title" style="font-family:var(--font-display); font-size:32px; font-weight:800; line-height:1.05; margin-bottom:16px;">TECHNICAL DOSSIER</h2>
      <div id="modal-metrics" style="font-family:var(--font-mono); font-size:12px; background:var(--badge-dark-bg); color:var(--badge-dark-fg); border:1px solid var(--badge-dark-fg); padding:10px 14px; margin-bottom:20px; font-weight:700;"></div>
      <p id="modal-body-text" style="font-size:15px; line-height:1.65; margin-bottom:24px;"></p>
      <div style="border-top:1.5px dashed var(--ink-faint); padding-top:16px; display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; color:var(--ink-muted);">
        <span>VERIFIED BY: KINETIK.STRUCT LAB</span>
        <span>SCALE: 1:50 // ISO-19650</span>
      </div>
    </div>
  </div>
</div>
