<!--
  Header.svelte
  Fixed Editorial Header Bar ("KINETIK.STRUCT | STUDIO KIT | 01 / 06")
-->
<script>
  import { onMount } from 'svelte';
  import { playMechanicalTick } from '../lib/interactions.js';

  let currentTheme = 'editorial';
  let currentBgMode = 'wave'; // 'zine' (Option 3 default) or 'wave' (Option 4)
  let isOpen = false;

  const themes = [
    { id: 'editorial', label: 'PAPER', badge: '01' },
    { id: 'blueprint', label: 'BLUEPRINT', badge: '02' },
    { id: 'cyber', label: 'TERMINAL', badge: '03' }
  ];

  function toggleDropdown(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    playMechanicalTick(980, 0.02);
  }

    function toggleBgMode() {
    currentBgMode = currentBgMode === 'zine' ? 'wave' : 'zine';
    document.documentElement.setAttribute('data-bg-style', currentBgMode);
    playMechanicalTick(920, 0.025);
  }

  function selectTheme(themeId) {
    currentTheme = themeId;
    isOpen = false;
    playMechanicalTick(840, 0.03);

    if (themeId === 'editorial') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }

    if (typeof window.updateBgSceneTheme === 'function') {
      window.updateBgSceneTheme(themeId);
    }
  }

  onMount(() => {
    const active = document.documentElement.getAttribute('data-theme') || 'editorial';
    currentTheme = active;
    const activeBg = document.documentElement.getAttribute('data-bg-style') || 'wave';
    currentBgMode = activeBg;
    document.documentElement.setAttribute('data-bg-style', currentBgMode);

    const closeMenu = (e) => {
      if (!e.target.closest('.custom-theme-dropdown')) {
        isOpen = false;
      }
    };
    window.addEventListener('click', closeMenu);
    const onKey = (e) => {
      if (e.key === 'Escape') isOpen = false;
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('keydown', onKey);
    };
  });

  $: currentLabel = themes.find(t => t.id === currentTheme)?.label || 'PAPER';
</script>

<header class="editorial-header">
  <div class="header-brand">
    <span class="header-brand-dot"></span>
    <span class="header-brand-title">KINETIK.STRUCT</span>
    <span class="header-brand-sub">STUDIO KIT</span>
    <span class="header-availability-pill" title="Available for Q4 Commissions &amp; R&amp;D">
      <span class="avail-dot"></span>
      <span>AVAILABLE // Q4</span>
    </span>
  </div>

  <nav class="header-center-nav" aria-label="Primary Editorial Navigation">
    <a href="#sec-whoami" class="header-nav-link active">01. WHO AM I</a>
    <a href="#sec-identity" class="header-nav-link">02. IDENTITY</a>
    <a href="#sec-work" class="header-nav-link">03. WORK</a>
    <a href="#sec-timeline" class="header-nav-link">04. TIMELINE</a>
    <a href="#sec-archive" class="header-nav-link">05. ARCHIVE</a>
    <a href="#sec-collage" class="header-nav-link">06. COLLAGE</a>
    <a href="#sec-contact" class="header-nav-link">07. CONTACT</a>
  </nav>

  <div class="header-right-controls">
    <div class="custom-theme-dropdown" class:is-open={isOpen}>
      <button
        type="button"
        class="custom-dropdown-trigger"
        on:click={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span class="trigger-label">{currentLabel}</span>
        <span class="trigger-arrow" class:is-rotated={isOpen}>▾</span>
      </button>

      {#if isOpen}
        <div class="custom-dropdown-menu" role="listbox">
          {#each themes as t}
            <button
              type="button"
              class="custom-dropdown-item"
              class:is-active={currentTheme === t.id}
              role="option"
              aria-selected={currentTheme === t.id}
              on:click={() => selectTheme(t.id)}
            >
              <span class="item-tag">[{t.badge}]</span>
              <span class="item-label">{t.label}</span>
              {#if currentTheme === t.id}
                <span class="item-check">✓</span>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>

        <!-- Background Style Switcher: Option 3 (ZINE) <-> Option 4 (WAVE) -->
    <button
      type="button"
      class="bg-style-toggle-btn"
      id="bg-style-toggle-btn"
      title="Switch Background: [03] Brutalist Zine Paper <-> [04] Cyber Kinetic Wave"
      on:click={toggleBgMode}
    >
      <span class="bg-style-icon">▤ BG:</span>
      <span class="bg-style-name">{currentBgMode === 'zine' ? '03. ZINE' : '04. WAVE'}</span>
    </button>

    <button type="button" class="xray-toggle-btn" id="xray-toggle-btn" title="Toggle Structural CAD X-Ray Overlays">
      <span>⌖ X-RAY:</span>
      <span class="xray-state-text">OFF</span>
    </button>

    <div class="page-counter-badge" id="editorial-page-counter">01 / 07</div>
  </div>
</header>
