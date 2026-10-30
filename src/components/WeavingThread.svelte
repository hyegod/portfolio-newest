<!--
  WeavingThread.svelte
  Full-Document Organic Content-Weaving Bezier Thread Overlay (z-index: 1 behind cards)
  with Y-Locked Concentric Bullseye Tip (⦿)
-->
<svg class="content-weaving-thread-svg" id="content-weaving-thread-svg" aria-hidden="true">
  <path
    id="weaving-thread-track"
    class="weaving-thread-track"
    d=""
    fill="none"
    stroke="rgba(255, 59, 29, 0.14)"
    stroke-width="1.6"
    stroke-dasharray="5 5"
  />
  <path
    id="weaving-thread-active"
    class="weaving-thread-active"
    d=""
    fill="none"
    stroke="#FF3B1D"
    stroke-width="2.6"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <g id="weaving-thread-anchors"></g>
  <g id="weaving-thread-bullseye" class="weaving-thread-bullseye" transform="translate(-100, -100)">
    <circle cx="0" cy="0" r="10" fill="rgba(255, 59, 29, 0.14)" stroke="#FF3B1D" stroke-width="2.2" />
    <circle cx="0" cy="0" r="4" fill="#FF3B1D" />
  </g>
</svg>
