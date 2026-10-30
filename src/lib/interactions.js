/* ==========================================================================
   KINETIK.STRUCT // INTERACTIONS, GSAP SCROLLTRIGGER & LENIS
   (src/lib/interactions.js)
   ========================================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
  window.Lenis = Lenis;
}

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
});

let lastWindowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWindowWidth) {
      lastWindowWidth = window.innerWidth;
      ScrollTrigger.refresh();
    }
  }, { passive: true });
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let audioCtx = null;
let sfxEnabled = true;

export function playMechanicalTick(freq = 900, duration = 0.025) {
  if (!sfxEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (!audioCtx || audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (_) {
    // Ignore audio errors when autoplay is blocked
  }
}

export function initSmoothScrollAndGSAP() {
  if (typeof window !== 'undefined') {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  let lenis = null;

  // Touch and mobile devices have hardware momentum scrolling; avoid JS scroll hijacking on mobile
  const isTouchOrMobile = typeof window !== 'undefined' && (
    window.innerWidth <= 768 ||
    window.matchMedia('(hover: none), (pointer: coarse)').matches
  );

  // On touch/mobile, use instant 1:1 scrub (true) so animations freeze the exact microsecond touch stops
  // instead of trailing behind by 220ms, preventing scroll jumps when address bar toggles
  const scrubPrimary = isTouchOrMobile ? true : 0.22;
  const scrubSecondary = isTouchOrMobile ? true : 0.2;

  if (!isTouchOrMobile && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        playMechanicalTick(1100, 0.03);
        const idx = targetEl.getAttribute('data-section-index');
        if (idx) {
          const pageBadgeEl = document.getElementById('editorial-page-counter');
          if (pageBadgeEl) pageBadgeEl.textContent = `${idx} / 06`;
          document.querySelectorAll('.header-nav-link').forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === targetId);
          });
        }
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -54 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const sections = document.querySelectorAll('.editorial-section[data-section-index]');
  const pageBadge = document.getElementById('editorial-page-counter');
  const navLinks = document.querySelectorAll('.header-nav-link');

  sections.forEach((sec) => {
    const idx = sec.getAttribute('data-section-index');
    const secId = sec.getAttribute('id');

    ScrollTrigger.create({
      trigger: sec,
      start: 'top 45%',
      end: 'bottom 45%',
      onEnter: () => updateHeaderState(idx, secId),
      onEnterBack: () => updateHeaderState(idx, secId)
    });
  });

  function updateHeaderState(idx, secId) {
    if (pageBadge) pageBadge.textContent = `${idx} / 06`;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${secId}`);
    });
  }

  if (prefersReducedMotion) return;

  // =========================================================================
  // ARCHITECTURAL KINETIC REVEALS // TECTONIC CARDS & EDITORIAL TYPOGRAPHY
  // Replaced bottom curled receipt rollers with clean, high-performance
  // editorial animations that trigger smoothly without scroll-lag or jitter.
  // =========================================================================

  // 1. Primary Cards & Structural Containers (Tactile Elevation)
  const primaryCardsSelector = [
    '.collage-card--02',
    '.collage-card--03',
    '.thread-synthesis-banner',
    '.cad-3d-lab-wrapper',
    '.archive-filter-bar',
    '.archive-folder-stack',
    '.draggable-pasteup-board',
    '.engineering-spec-sheet',
    '.iso-titleblock-wrapper',
    '.transmission-form-pane'
  ].join(', ');

  gsap.utils.toArray(primaryCardsSelector).forEach((el) => {
    gsap.fromTo(
      el,
      {
        y: 42,
        opacity: 0,
        scale: 0.985,
        force3D: true
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 2. Oversized Editorial Titles (Brutalist Masked Reveal & Tracking Snap)
  gsap.utils.toArray('.section-oversized-title').forEach((title) => {
    gsap.fromTo(
      title,
      {
        y: 36,
        opacity: 0,
        letterSpacing: '-0.035em',
        force3D: true
      },
      {
        y: 0,
        opacity: 1,
        letterSpacing: '-0.02em',
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 3. Section Kickers & Engineering Sub-Headers (Drafting Slide-in)
  gsap.utils.toArray('.section-kicker').forEach((kicker) => {
    gsap.fromTo(
      kicker,
      {
        x: -28,
        opacity: 0,
        force3D: true
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: kicker,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 4. Tri-Pillar Modules (Staggered Tectonic Cascade)
  const pillarGrid = document.querySelector('.tri-pillar-grid');
  if (pillarGrid) {
    const pillars = pillarGrid.querySelectorAll('.pillar-module');
    if (pillars.length) {
      gsap.fromTo(
        pillars,
        {
          y: 45,
          opacity: 0,
          scale: 0.97,
          force3D: true
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarGrid,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  }

  // 5. System Receipt Cards in Archive (Clean Flat Elevation with Resting Tilt)
  gsap.utils.toArray('.system-receipt-card').forEach((receipt) => {
    const isLeft = receipt.classList.contains('system-receipt--tilted-left');
    const restAngle = isLeft ? -1.4 : 1.4;
    gsap.fromTo(
      receipt,
      {
        y: 36,
        opacity: 0,
        rotationZ: 0,
        force3D: true
      },
      {
        y: 0,
        opacity: 1,
        rotationZ: restAngle,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: receipt,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 6. Tactile Stickers, Badges & Tapes (Physics Spring Snap)
  gsap.utils.toArray('.torn-tape-sticker, .barcode-sticker-box').forEach((sticker) => {
    gsap.fromTo(
      sticker,
      {
        scale: 0.86,
        opacity: 0,
        force3D: true
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: sticker,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 7. Hydraulic Progress Bars & Telemetry Fills
  gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
    gsap.fromTo(
      bar,
      { scaleX: 0, force3D: true },
      {
        scaleX: 1,
        duration: 1.1,
        transformOrigin: 'left center',
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 8. ISO Approval Stamp (Physical Ink Seal Press)
  const isoStamp = document.querySelector('.iso-approval-stamp');
  if (isoStamp) {
    gsap.fromTo(
      isoStamp,
      {
        scale: 1.35,
        opacity: 0,
        rotationZ: -8,
        force3D: true
      },
      {
        scale: 1,
        opacity: 1,
        rotationZ: -2.5,
        duration: 0.6,
        ease: 'back.out(2.4)',
        scrollTrigger: {
          trigger: isoStamp,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  // 9. Engineering Spec Sheet Table Rows (Staggered Telemetry Slide)
  gsap.utils.toArray('.engineering-spec-sheet .spec-table tbody').forEach((tbody) => {
    const rows = tbody.querySelectorAll('tr');
    if (rows.length) {
      gsap.fromTo(
        rows,
        {
          x: -16,
          opacity: 0,
          force3D: true
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tbody,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  });

  // 10. Collage Photo Subtle Zoom-Settle
  gsap.utils.toArray('.collage-card .collage-photo').forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.05, force3D: true },
      {
        scale: 1.0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 10. Rotate the footer Registration Crosshair continuously with scroll
  const crosshairSvg = document.getElementById('footer-crosshair-svg');
  if (crosshairSvg) {
    gsap.to(crosshairSvg, {
      rotation: 720,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }
}

export function initAnimeMicroInteractions() {
  gsap.fromTo(
    '.handstyle-stroke-path',
    { strokeDashoffset: 1000 },
    {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      stagger: 0.26,
      delay: 0.3
    }
  );

  document.querySelectorAll('[data-anime-counter]').forEach((el) => {
    const targetVal = parseFloat(el.getAttribute('data-anime-counter'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const obj = { val: 0 };

    gsap.to(obj, {
      val: targetVal,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = obj.val.toFixed(decimals) + suffix;
      }
    });
  });

  document.querySelectorAll('.barcode-sticker-box').forEach((box) => {
    box.addEventListener('mouseenter', () => {
      playMechanicalTick(1450, 0.04);
      const digits = box.querySelector('.barcode-digits');
      if (!digits) return;
      const orig = digits.getAttribute('data-orig') || digits.textContent;
      digits.setAttribute('data-orig', orig);

      gsap.to(box, {
        scale: 1.05,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: 'back.out(1.7)'
      });
    });
  });
}

export function initCadCursor() {
  const cursor = document.getElementById('cad-cursor');
  const coords = document.getElementById('cad-cursor-coords');
  const footerCoords = document.getElementById('footer-live-coords');
  if (!cursor) return;

  const isTouchOrTablet = () => {
    return (
      window.innerWidth <= 1024 ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  };

  if (isTouchOrTablet()) {
    cursor.style.display = 'none';
  }

  let mouseX = -100;
  let mouseY = -100;
  let lastTarget = null;
  let rafQueued = false;
  let winW = window.innerWidth;
  let winH = window.innerHeight;
  let prevCoordKey = '';

  window.addEventListener('resize', () => {
    winW = window.innerWidth;
    winH = window.innerHeight;
    if (isTouchOrTablet()) {
      cursor.style.display = 'none';
    }
  }, { passive: true });

  window.addEventListener('touchstart', () => {
    cursor.style.display = 'none';
  }, { passive: true });

  function flushCursor() {
    rafQueued = false;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    const normX = ((mouseX / winW) * 1000).toFixed(0).padStart(4, '0');
    const normY = ((mouseY / winH) * 1000).toFixed(0).padStart(4, '0');
    const key = `${normX}:${normY}`;
    if (key !== prevCoordKey) {
      prevCoordKey = key;
      if (coords) coords.textContent = `X:${normX} Y:${normY}`;
      if (footerCoords) footerCoords.textContent = `GRID [${normX}, ${normY}]`;
    }

    const isInteractive = Boolean(
      lastTarget &&
      lastTarget.closest &&
      lastTarget.closest('a, button, input, select, textarea, .draggable-sticker, #cad-interactive-canvas')
    );
    cursor.classList.toggle('is-hovering', isInteractive);
  }

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || isTouchOrTablet()) {
      cursor.style.display = 'none';
      return;
    }
    cursor.style.display = '';
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastTarget = e.target;
    if (!rafQueued) {
      rafQueued = true;
      requestAnimationFrame(flushCursor);
    }
  }, { passive: true });
}

export function initThemeAndXrayControls() {
  const themeSelect = document.getElementById('theme-dropdown-select');
  if (themeSelect) {
    const cur = document.documentElement.getAttribute('data-theme') || 'editorial';
    themeSelect.value = cur;

    themeSelect.addEventListener('change', (e) => {
      playMechanicalTick(820, 0.03);
      const mode = e.target.value;
      if (mode === 'editorial') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', mode);
      }

      if (typeof window.updateBgSceneTheme === 'function') {
        window.updateBgSceneTheme(mode);
      }
    });
  }

  // Backward compatibility with data-theme-mode buttons
  const modeButtons = document.querySelectorAll('[data-theme-mode]');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      playMechanicalTick(820, 0.03);
      const mode = btn.getAttribute('data-theme-mode');
      modeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (themeSelect) themeSelect.value = mode;

      if (mode === 'editorial') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', mode);
      }

      if (typeof window.updateBgSceneTheme === 'function') {
        window.updateBgSceneTheme(mode);
      }
    });
  });

  // SPEED Mode Toggle Button: disables background 3D canvas and optimizes animations
  const speedBtn = document.getElementById('speed-toggle-btn');
  if (speedBtn) {
    const savedSpeed = typeof localStorage !== 'undefined' && localStorage.getItem('kinetik_speed_mode') === 'on';
    if (savedSpeed) {
      document.body.classList.add('speed-mode-active');
      speedBtn.classList.add('active');
      window.isSpeedModeActive = true;
      const stateEl = speedBtn.querySelector('.speed-state-text');
      if (stateEl) stateEl.textContent = 'ON';
    }

    speedBtn.addEventListener('click', () => {
      playMechanicalTick(1100, 0.03);
      const isActive = document.body.classList.toggle('speed-mode-active');
      speedBtn.classList.toggle('active', isActive);
      window.isSpeedModeActive = isActive;
      const stateEl = speedBtn.querySelector('.speed-state-text');
      if (stateEl) stateEl.textContent = isActive ? 'ON' : 'OFF';

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('kinetik_speed_mode', isActive ? 'on' : 'off');
      }
    });
  }

  const xrayBtn = document.getElementById('xray-toggle-btn');
  if (xrayBtn) {
    xrayBtn.addEventListener('click', () => {
      playMechanicalTick(1200, 0.04);
      const isActive = document.body.classList.toggle('xray-active');
      xrayBtn.classList.toggle('active', isActive);
      xrayBtn.querySelector('.xray-state-text').textContent = isActive ? 'ON' : 'OFF';
    });
  }
}

export function initBeamDeflectionSolver() {
  const canvas = document.getElementById('beam-solver-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const sliderPos = document.getElementById('beam-load-pos');
  const sliderMag = document.getElementById('beam-load-mag');
  const outMoment = document.getElementById('beam-out-moment');
  const outShear = document.getElementById('beam-out-shear');
  const outDeflect = document.getElementById('beam-out-deflect');

  const L = 12.0;
  const EI = 185000;

  function drawBeam() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const aRatio = parseFloat(sliderPos ? sliderPos.value : 0.5);
    const P = parseFloat(sliderMag ? sliderMag.value : 320);

    const a = aRatio * L;
    const b = L - a;

    const Ra = (P * b) / L;
    const Rb = (P * a) / L;
    const Mmax = (P * a * b) / L;
    const deltaMaxMm = ((P * a * b * (L * L - a * a - b * b)) / (6 * EI * L)) * 1000;

    if (outMoment) outMoment.textContent = `${Mmax.toFixed(0)} kNm`;
    if (outShear) outShear.textContent = `${Math.max(Ra, Rb).toFixed(0)} kN`;
    if (outDeflect) outDeflect.textContent = `${deltaMaxMm.toFixed(1)} mm`;

    const padX = 28;
    const spanPx = w - padX * 2;
    const neutralY = 44;

    ctx.strokeStyle = 'rgba(242, 239, 233, 0.1)';
    ctx.lineWidth = 1;
    for (let gx = padX; gx <= w - padX; gx += spanPx / 6) {
      ctx.beginPath();
      ctx.moveTo(gx, 8);
      ctx.lineTo(gx, h - 8);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(242, 239, 233, 0.35)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padX, neutralY);
    ctx.lineTo(w - padX, neutralY);
    ctx.stroke();
    ctx.setLineDash([]);

    const loadX = padX + aRatio * spanPx;
    const momentPeakY = neutralY + 34 + (Mmax / 1500) * 42;

    ctx.fillStyle = 'rgba(0, 85, 255, 0.28)';
    ctx.beginPath();
    ctx.moveTo(padX, neutralY);
    ctx.lineTo(loadX, momentPeakY);
    ctx.lineTo(w - padX, neutralY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#D4FF00';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 50; i++) {
      const s = i / 50;
      const px = padX + s * spanPx;
      const deflectionAmp = (P / 600) * 28 * Math.sin(s * Math.PI) * (1 - Math.abs(s - aRatio) * 0.45);
      const py = neutralY + deflectionAmp;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.fillStyle = '#F2EFE9';
    [padX, w - padX].forEach((sx) => {
      ctx.beginPath();
      ctx.moveTo(sx, neutralY + 2);
      ctx.lineTo(sx - 7, neutralY + 13);
      ctx.lineTo(sx + 7, neutralY + 13);
      ctx.closePath();
      ctx.fill();
    });

    ctx.strokeStyle = '#FF3355';
    ctx.fillStyle = '#FF3355';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(loadX, 8);
    ctx.lineTo(loadX, neutralY - 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(loadX, neutralY);
    ctx.lineTo(loadX - 5, neutralY - 8);
    ctx.lineTo(loadX + 5, neutralY - 8);
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#D4FF00';
    ctx.fillText(`P=${P}kN`, Math.min(w - 68, Math.max(8, loadX - 24)), 18);
  }

  if (sliderPos) sliderPos.addEventListener('input', drawBeam);
  if (sliderMag) sliderMag.addEventListener('input', drawBeam);
  drawBeam();
}

export function initCyberTerminal() {
  const screen = document.getElementById('cyber-terminal-output');
  if (!screen) return;

  const RESPONSES = {
    fem: [
      '> executing wasm-fem-solver --mesh=bridge_pier_v4.inp',
      '  [OK] Stiffness Matrix [K] assembled (14,400 DOF)',
      '  [OK] Eigenvalue Buckling Mode 1: λ = 4.82 (SAFE)',
      '  [OK] Max Nodal Displacement: 6.42mm @ Node #804'
    ],
    shader: [
      '> compiling glsl-halftone-dither.frag --target=webgl2',
      '  [OK] Ordered Bayer 8x8 matrix injected',
      '  [OK] Framebuffer post-process time: 0.38ms (120 FPS)',
      '  [OK] Aesthetic compliance: STUSSY_ARCHIVE_V4'
    ],
    topology: [
      '> trace-topology --cluster=asia-southeast-jkt',
      '  [OK] Edge Node 01 (Civil-BIM API): 4.2ms RTT',
      '  [OK] Edge Node 02 (Three.js Asset CDN): 2.8ms RTT',
      '  [OK] Zero packet loss across 64 concurrent streams'
    ]
  };

  document.querySelectorAll('[data-term-cmd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playMechanicalTick(1320, 0.03);
      const key = btn.getAttribute('data-term-cmd');
      const lines = RESPONSES[key] || ['> command executed.'];

      lines.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.textContent = line;
          if (line.startsWith('>')) div.style.color = '#FFFFFF';
          screen.appendChild(div);
          screen.scrollTop = screen.scrollHeight;
        }, idx * 110);
      });
    });
  });
}

export function initKineticTypePlayground() {
  const wordEl = document.getElementById('kinetic-preview-word');
  const sliderTracking = document.getElementById('type-slider-tracking');
  const sliderSkew = document.getElementById('type-slider-skew');
  const wordCycleBtn = document.getElementById('type-cycle-word-btn');

  if (!wordEl) return;

  const WORDS = ['TECTONIC', 'STRUKTUR', 'ALGO//TYPE', 'BRUTALIST', 'BLUEPRINT'];
  let wordIdx = 0;

  function updateTypeStyle() {
    const tracking = sliderTracking ? sliderTracking.value : -3;
    const skew = sliderSkew ? sliderSkew.value : 0;
    wordEl.style.letterSpacing = `${tracking * 0.01}em`;
    wordEl.style.transform = `skewX(${skew}deg)`;
  }

  if (sliderTracking) sliderTracking.addEventListener('input', updateTypeStyle);
  if (sliderSkew) sliderSkew.addEventListener('input', updateTypeStyle);

  if (wordCycleBtn) {
    wordCycleBtn.addEventListener('click', () => {
      playMechanicalTick(980, 0.03);
      wordIdx = (wordIdx + 1) % WORDS.length;
      wordEl.textContent = WORDS[wordIdx];
    });
  }
}

export function initArchiveFilter() {
  const buttons = document.querySelectorAll('[data-archive-filter]');
  const cards = document.querySelectorAll('.archive-folder');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      playMechanicalTick(860, 0.03);
      const cat = btn.getAttribute('data-archive-filter');
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const visible = [];
      cards.forEach((card) => {
        const cardCats = card.getAttribute('data-categories') || '';
        const match = cat === 'all' || cardCats.includes(cat);
        card.style.display = match ? 'flex' : 'none';
        if (match) visible.push(card);
      });

      // Re-stagger the folder tabs across the visible folders only
      visible.forEach((card, i) => card.style.setProperty('--i', i));

      // Make sure one visible folder stays open
      if (visible.length && !visible.some((c) => c.classList.contains('is-active'))) {
        const strip = visible[0].querySelector('.folder-strip');
        if (strip) strip.click();
      }

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });
}

export function initDraggablePasteupBoard() {
  const board = document.getElementById('pasteup-board');
  if (!board) return;

  let highestZ = 25;

  function makeDraggable(el) {
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;

    el.addEventListener('pointerdown', (e) => {
      isDown = true;
      highestZ += 1;
      el.style.zIndex = highestZ;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = el.offsetLeft;
      origTop = el.offsetTop;
      el.setPointerCapture(e.pointerId);
      playMechanicalTick(740, 0.02);
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.left = `${origLeft + dx}px`;
      el.style.top = `${origTop + dy}px`;
    });

    el.addEventListener('pointerup', () => {
      isDown = false;
    });
  }

  board.querySelectorAll('.draggable-sticker').forEach(makeDraggable);

  const spawnBtn = document.getElementById('spawn-sticker-btn');
  const STAMPS = [
    { text: 'APPROVED // ΦMn ≥ Mu', bg: '#D4FF00', color: '#0D0D10' },
    { text: 'WEBGL 2.0 // 120FPS', bg: '#0038FF', color: '#FFFFFF' },
    { text: 'SEISMIC ZONE IV // OK', bg: '#B47884', color: '#0D0D10' },
    { text: 'STUSSY × STRUCT LAB', bg: '#0D0D10', color: '#D4FF00' },
    { text: 'CONCRETE f\'c = 45 MPa', bg: '#4E637A', color: '#F2EFE9' }
  ];
  let stampIdx = 0;

  if (spawnBtn) {
    spawnBtn.addEventListener('click', () => {
      playMechanicalTick(1180, 0.04);
      const item = STAMPS[stampIdx % STAMPS.length];
      stampIdx += 1;

      const maxLeft = Math.max(16, (board.clientWidth || 280) - 180);
      const sticker = document.createElement('div');
      sticker.className = 'draggable-sticker torn-tape-sticker';
      sticker.style.background = item.bg;
      sticker.style.color = item.color;
      sticker.style.left = `${12 + (stampIdx * 43) % maxLeft}px`;
      sticker.style.top = `${85 + (stampIdx * 53) % 210}px`;
      sticker.style.transform = `rotate(${(stampIdx % 2 === 0 ? 1 : -1) * (4 + (stampIdx % 8))}deg)`;
      sticker.style.fontFamily = 'var(--font-mono)';
      sticker.style.fontWeight = '800';
      sticker.style.fontSize = '12px';
      sticker.textContent = item.text;

      board.appendChild(sticker);
      makeDraggable(sticker);
    });
  }
}

const CASE_STUDIES = {
  'campaign-01': {
    code: 'CAMPAIGN AD 01 // STRUCTURAL TECTONICS',
    title: 'MONUMENTAL INFRASTRUCTURE MEETS EDITORIAL BRUTALISM',
    discipline: 'Civil Engineering × Architectural Photography × Blueprint Systems',
    metrics: 'Span: 240m Steel Pratt Truss | Pier Load: 18,400 kN | Safety Factor: 2.15',
    body: 'Inspired by global streetwear campaign lookbooks and raw structural engineering field documentation. This study pairs high-contrast monochrome field photography of a long-span steel truss bridge with live finite-element structural telemetry, halftone print frames, and ISO-9001 barcode serialization.'
  },
  'campaign-02': {
    code: 'CAMPAIGN AD 02 // CYBER-KINETIC TELEMETRY',
    title: 'AUTONOMOUS TENSEGRITY RIG & SPATIAL COMPUTING',
    discipline: 'Information Technology × Robotics Telemetry × WebGL Shaders',
    metrics: 'LiDAR Scan Rate: 300k pts/sec | Edge Latency: 3.1ms | Actuators: 12 DOF',
    body: 'Bridging physical civil surveying with real-time spatial computing. The kinetic origami/tensegrity aerial rig captures millimeter-accurate structural point clouds while streaming live WebSocket telemetry directly into a browser-based Three.js digital twin.'
  },
  'campaign-03': {
    code: 'CAMPAIGN AD 03 // SYSTEMATIC STRUCTURES',
    title: 'EDITORIAL WORKGEAR, SWISS GRIDS & BLUEPRINT COLLAGE',
    discipline: 'Graphic Design × Print Production × Brutalist Identity',
    metrics: 'Grid: 12-Col Modular Swiss | Halftone: 85 LPI | Ink: Pantone Reflex Blue + Acid Lime',
    body: 'Visual identity and garment graphic system designed as an experimental studio uniform. Combines architectural blueprint elevations, red engineering redline annotations, CMYK registration color bars, and tactile masking tape typography.'
  },
  'prj-01': {
    code: 'ARCHIVE PRJ-01 // AERO-TRUSS DIGITAL TWIN',
    title: 'PARAMETRIC STEEL BRIDGE & REAL-TIME WEBGL FEM SOLVER',
    discipline: 'Civil Engineering + Rust WASM + Three.js',
    metrics: '14,400 Degrees of Freedom | 60 FPS In-Browser Solver | SNI 1725:2016 Compliant',
    body: 'An interactive structural engineering platform compiled to WebAssembly that computes axial forces, bending moments, and modal vibration frequencies of long-span steel truss bridges directly in the browser with zero server round-trips.'
  },
  'prj-02': {
    code: 'ARCHIVE PRJ-02 // TERRA-GRID SEISMIC OS',
    title: 'GEOSPATIAL TELEMETRY & EARTHQUAKE RESPONSE INTERFACE',
    discipline: 'Information Technology + GIS + Editorial Infographics',
    metrics: '450+ Live Sensor Nodes | Sub-Second PGA Contouring | High-Contrast HUD',
    body: 'Real-time Peak Ground Acceleration (PGA) and spectral response visualizer combining civil geotechnical attenuation equations with a brutalist typographic command center.'
  },
  'prj-03': {
    code: 'ARCHIVE PRJ-03 // TECTONIC GROTESK FOUNDRY',
    title: 'VARIABLE TYPE SYSTEM ENGINEERED FROM I-BEAM PROFILES',
    discipline: 'Graphic Design + Computational Typography + Variable Fonts',
    metrics: '3 Axes (Weight, Flange, Shear) | 420 Glyphs | OpenType Layout Features',
    body: 'A custom variable display typeface whose stroke terminals, ink traps, and counter proportions are mathematically derived from standard Wide-Flange (WF) structural steel cross-sections.'
  },
  'prj-04': {
    code: 'ARCHIVE PRJ-04 // HYDRO-SYNTH URBAN CFD',
    title: 'COMPUTATIONAL FLUID DYNAMICS & STORMWATER BLUEPRINT',
    discipline: 'Civil Hydraulics + WebGPU Shaders + Data Visualization',
    metrics: '250k Advected Particles | Manning Roughness Solver | 100-Yr Return Period',
    body: 'Interactive urban watershed and drainage simulation transforming complex shallow-water hydraulic equations into an expressive editorial map poster.'
  }
};

export function initModalsAndForm() {
  const backdrop = document.getElementById('dossier-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const elCode = document.getElementById('modal-code');
  const elTitle = document.getElementById('modal-title');
  const elDisc = document.getElementById('modal-discipline');
  const elMetrics = document.getElementById('modal-metrics');
  const elBody = document.getElementById('modal-body-text');

  document.querySelectorAll('[data-open-dossier]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playMechanicalTick(1050, 0.04);
      const key = btn.getAttribute('data-open-dossier');
      const data = CASE_STUDIES[key];
      if (!data || !backdrop) return;

      elCode.textContent = data.code;
      elTitle.textContent = data.title;
      elDisc.textContent = data.discipline;
      elMetrics.textContent = data.metrics;
      elBody.textContent = data.body;
      backdrop.classList.add('open');
    });
  });

  function closeModal() {
    if (backdrop) backdrop.classList.remove('open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const form = document.getElementById('blueprint-dispatch-form');
  const statusBox = document.getElementById('dispatch-receipt-output');
  if (form && statusBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      playMechanicalTick(1400, 0.06);
      const sender = document.getElementById('input-sender').value || 'ANON_ARCHITECT';
      const scope = document.getElementById('input-scope').value;
      const stampId = 'ISO-' + Math.floor(100000 + Math.random() * 900000);

      statusBox.style.display = 'block';
      statusBox.innerHTML = `
        <div style="color:#D4FF00;font-weight:800;margin-bottom:4px;">
          [TRANSMISSION LOGGED // STAMP: ${stampId}]
        </div>
        <div>ORIGIN: ${sender.toUpperCase()} // SCOPE: ${scope.toUpperCase()}</div>
        <div style="opacity:0.8;margin-top:4px;">STATUS: Blueprint packet queued for multidisciplinary studio review.</div>
      `;
      form.reset();
    });
  }
}

export function initSignatureIntroLoader() {
  const loader = document.getElementById('signature-intro-loader');
  const path = document.getElementById('signature-one-line-path');
  const pctEl = document.getElementById('signature-loader-pct');
  const skipBtn = document.getElementById('signature-skip-btn');

  if (!loader) return;

  let dismissedEmitted = false;
  function emitDismissed() {
    if (dismissedEmitted) return;
    dismissedEmitted = true;
    window.dispatchEvent(new CustomEvent('signature-dismissed'));
  }

  // Notify the rest of the app whenever the loader leaves, however it was dismissed
  if (typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver(() => {
      if (loader.classList.contains('is-dismissed')) {
        mo.disconnect();
        emitDismissed();
      }
    });
    mo.observe(loader, { attributes: true, attributeFilter: ['class'] });
  }

  function dismissLoader() {
    if (loader.classList.contains('is-dismissed')) return;
    loader.classList.add('is-dismissed');
    playMechanicalTick(1280, 0.04);
    emitDismissed();
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissLoader);
  }

  if (prefersReducedMotion || !path) {
    setTimeout(dismissLoader, 450);
    return;
  }

  const len = Math.ceil(path.getTotalLength ? path.getTotalLength() : 2200);
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${len}`;

  const progressObj = { pct: 0 };
  let lastPct = -1;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const drawDuration = isMobile ? 1.5 : 2.0;

  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(dismissLoader, 120);
    }
  });

  tl.to(path, {
    strokeDashoffset: 0,
    duration: drawDuration,
    ease: 'power1.inOut'
  }, 0);

  tl.to(progressObj, {
    pct: 100,
    duration: drawDuration - 0.1,
    ease: 'power1.inOut',
    onUpdate: () => {
      const current = Math.round(progressObj.pct);
      if (current !== lastPct && pctEl) {
        lastPct = current;
        pctEl.textContent = `${current.toString().padStart(2, '0')}%`;
      }
    }
  }, 0);
}

export function initScrollStructuralThread() {
  const stage = document.getElementById('main-editorial-stage') || document.querySelector('.main-editorial-stage');
  const svg = document.getElementById('content-weaving-thread-svg');
  const trackPath = document.getElementById('weaving-thread-track');
  const activePath = document.getElementById('weaving-thread-active');
  const anchorsGroup = document.getElementById('weaving-thread-anchors');
  const bullseye = document.getElementById('weaving-thread-bullseye');

  let totalLen = 0;
  let stageHeightCached = 1000;
  let lengthLookup = [];

  function getRelBox(el, stageRect) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return {
      left: r.left - stageRect.left,
      right: r.right - stageRect.left,
      top: r.top - stageRect.top,
      bottom: r.bottom - stageRect.top,
      cx: r.left - stageRect.left + r.width * 0.5,
      cy: r.top - stageRect.top + r.height * 0.5,
      w: r.width,
      h: r.height
    };
  }

  function buildWeavingThreadPath() {
    if (!stage || !svg || !trackPath || !activePath) return;

    const stageRect = stage.getBoundingClientRect();
    const stageW = Math.max(300, stage.clientWidth || stageRect.width);
    const stageH = Math.max(800, stage.scrollHeight || stageRect.height);
    stageHeightCached = stageH;

    svg.setAttribute('viewBox', `0 0 ${stageW} ${stageH}`);
    svg.setAttribute('width', stageW);
    svg.setAttribute('height', stageH);

    const clampX = (x) => Math.round(Math.max(18, Math.min(stageW - 18, x)));
    const clampY = (y) => Math.round(Math.max(8, Math.min(stageH - 12, y)));

    const bManifesto = getRelBox(stage.querySelector('[data-thread-anchor="sec01-manifesto"]'), stageRect);
    const bCard01 = getRelBox(stage.querySelector('[data-thread-anchor="sec01-card01"]'), stageRect);
    const bCard02 = getRelBox(stage.querySelector('[data-thread-anchor="sec01-card02"]'), stageRect);
    const bCard03 = getRelBox(stage.querySelector('[data-thread-anchor="sec01-card03"]'), stageRect);
    const bBridge = getRelBox(stage.querySelector('[data-thread-anchor="sec01-bridge"]'), stageRect);

    const bPillar1 = getRelBox(stage.querySelector('[data-thread-anchor="sec02-pillar01"]'), stageRect);
    const bPillar2 = getRelBox(stage.querySelector('[data-thread-anchor="sec02-pillar02"]'), stageRect);
    const bPillar3 = getRelBox(stage.querySelector('[data-thread-anchor="sec02-pillar03"]'), stageRect);

    const bCadSide = getRelBox(stage.querySelector('[data-thread-anchor="sec03-sidebar"]'), stageRect);
    const bCadView = getRelBox(stage.querySelector('[data-thread-anchor="sec03-viewport"]'), stageRect);

    const bPrj1 = getRelBox(stage.querySelector('[data-thread-anchor="sec04-prj01"]'), stageRect);
    const bPrj2 = getRelBox(stage.querySelector('[data-thread-anchor="sec04-prj02"]'), stageRect);
    const bPrj3 = getRelBox(stage.querySelector('[data-thread-anchor="sec04-prj03"]'), stageRect);
    const bPrj4 = getRelBox(stage.querySelector('[data-thread-anchor="sec04-prj04"]'), stageRect);

    const bPaste = getRelBox(stage.querySelector('[data-thread-anchor="sec05-pasteup"]'), stageRect);
    const bSpecs = getRelBox(stage.querySelector('[data-thread-anchor="sec05-specs"]'), stageRect);

    const bForm = getRelBox(stage.querySelector('[data-thread-anchor="sec06-form"]'), stageRect);
    const bStamp = getRelBox(stage.querySelector('[data-thread-anchor="sec06-stamp"]'), stageRect);

    const waypoints = [];
    const addPt = (x, y, motif) => {
      waypoints.push({ x: clampX(x), y: clampY(y), motif: motif || 'smooth' });
    };

    // MOTIF 1: SECTION 01 SPREAD
    addPt(stageW * 0.72, 10, 'start');

    if (bManifesto && bCard01 && stageW >= 1180) {
      const gutterX = (bManifesto.right + bCard01.left) * 0.5;
      addPt(gutterX, bManifesto.top + 80, 'gutter-drop');
      addPt(bManifesto.left + 20, bManifesto.bottom + 18, 'wide-left');
    } else if (bManifesto) {
      addPt(stageW * 0.14, bManifesto.top + 90, 'wide-left');
      addPt(stageW * 0.86, bManifesto.bottom + 14, 'wide-right');
    }

    if (bCard02 && bCard03 && stageW >= 1180) {
      const midGutterX = (bCard02.right + bCard03.left) * 0.5;
      addPt(midGutterX, bCard02.top - 16, 'loop-entry');
      addPt(midGutterX, bCard02.cy, 'center-thread');
      addPt(bCard03.right - 20, bCard03.bottom + 18, 'wide-right');
    } else if (bCard02) {
      addPt(stageW * 0.16, bCard02.cy, 'wide-left');
    }

    if (bBridge) {
      addPt(bBridge.cx, bBridge.top - 12, 'center-pin');
      addPt(bBridge.left + bBridge.w * 0.18, bBridge.bottom + 24, 'wide-left');
    }

    // MOTIF 2: SECTION 02 IDENTITY
    if (bPillar1 && bPillar2 && bPillar3 && stageW >= 1180) {
      const g1 = (bPillar1.right + bPillar2.left) * 0.5;
      const g2 = (bPillar2.right + bPillar3.left) * 0.5;
      addPt(stageW * 0.84, bPillar1.top - 48, 'header-sweep');
      addPt(g1, bPillar1.top + bPillar1.h * 0.35, 'diagonal');
      addPt(g2, bPillar2.top + bPillar2.h * 0.72, 'diagonal');
      addPt(bPillar3.right - 16, bPillar3.bottom + 26, 'wide-right');
    } else if (bPillar1) {
      addPt(stageW * 0.85, bPillar1.top - 36, 'wide-right');
      if (bPillar2) addPt(stageW * 0.15, bPillar2.top - 14, 'wide-left');
      if (bPillar3) addPt(stageW * 0.85, bPillar3.bottom + 18, 'wide-right');
    }

    // MOTIF 3: SECTION 03 3D CAD LAB
    if (bCadSide && bCadView) {
      addPt(stageW * 0.14, bCadSide.top - 42, 'header-sweep');
      const seamX = stageW >= 1180 ? bCadSide.right : stageW * 0.86;
      addPt(seamX, bCadSide.top + bCadSide.h * 0.45, 'vertical-seam');
      addPt(stageW * 0.78, bCadView.bottom + 28, 'wide-right');
    }

    // MOTIF 4: SECTION 04 ARCHIVE
    if (bPrj1) {
      const sec04MidX = (bPrj2 && stageW >= 1180) ? (bPrj1.right + bPrj2.left) * 0.5 : stageW * 0.5;
      addPt(stageW * 0.16, bPrj1.top - 32, 'wide-left');
      addPt(sec04MidX, bPrj1.top + bPrj1.h * 0.48, 'bento-cross');
      addPt(stageW * 0.88, bPrj1.bottom + 14, 's-inflect');
    }
    if (bPrj3) {
      const sec04MidX2 = (bPrj4 && stageW >= 1180) ? (bPrj3.right + bPrj4.left) * 0.5 : stageW * 0.5;
      addPt(stageW * 0.12, bPrj3.top + 60, 'wide-left');
      addPt(sec04MidX2, bPrj3.top + bPrj3.h * 0.62, 'bento-cross');
      addPt(stageW * 0.84, (bPrj4 ? bPrj4.bottom : bPrj3.bottom) + 26, 'wide-right');
    }

    // MOTIF 5: SECTION 05 COLLAGE PASTE-UP & SPEC MATRIX
    if (bPaste && bSpecs) {
      const g5 = stageW >= 1180 ? (bPaste.right + bSpecs.left) * 0.5 : stageW * 0.18;
      addPt(stageW * 0.22, bPaste.top - 38, 'header-sweep');
      addPt(g5, bPaste.top + bPaste.h * 0.52, 'center-thread');
      addPt(stageW * 0.86, Math.max(bPaste.bottom, bSpecs.bottom) + 26, 'wide-right');
    }

    // MOTIF 6: SECTION 06 DISPATCH FORM & ISO TITLE BLOCK
    if (bForm && bStamp) {
      const g6 = stageW >= 1180 ? bForm.right : stageW * 0.5;
      addPt(stageW * 0.16, bForm.top - 36, 'header-sweep');
      addPt(g6, bForm.top + bForm.h * 0.5, 'vertical-seam');
    }

    addPt(stageW * 0.5, stageH - 14, 'end');

    for (let i = 1; i < waypoints.length; i++) {
      if (waypoints[i].y <= waypoints[i - 1].y + 28) {
        waypoints[i].y = waypoints[i - 1].y + 42;
      }
    }

    let d = `M ${waypoints[0].x} ${waypoints[0].y}`;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const p0 = waypoints[i];
      const p1 = waypoints[i + 1];
      const dy = p1.y - p0.y;
      const dx = p1.x - p0.x;

      let cp1x, cp1y, cp2x, cp2y;

      if (p1.motif === 'bento-cross' || p1.motif === 'diagonal') {
        cp1x = p0.x + dx * 0.85;
        cp1y = p0.y + dy * 0.18;
        cp2x = p1.x - dx * 0.85;
        cp2y = p0.y + dy * 0.82;
      } else if (p1.motif === 'header-sweep') {
        cp1x = p0.x;
        cp1y = p0.y + dy * 0.65;
        cp2x = p1.x;
        cp2y = p0.y + dy * 0.25;
      } else if (p1.motif === 'vertical-seam' || p1.motif === 'center-thread') {
        const flair = (i % 2 === 0 ? 1 : -1) * Math.min(75, stageW * 0.06);
        cp1x = p0.x + flair;
        cp1y = p0.y + dy * 0.33;
        cp2x = p1.x - flair;
        cp2y = p0.y + dy * 0.67;
      } else {
        const bow = (i % 2 === 0 ? -1 : 1) * Math.min(140, stageW * 0.12);
        cp1x = clampX(p0.x + bow);
        cp1y = p0.y + dy * 0.38;
        cp2x = clampX(p1.x - bow * 0.6);
        cp2y = p0.y + dy * 0.68;
      }

      d += ` C ${Math.round(cp1x)} ${Math.round(cp1y)}, ${Math.round(cp2x)} ${Math.round(cp2y)}, ${p1.x} ${p1.y}`;
    }

    trackPath.setAttribute('d', d);
    activePath.setAttribute('d', d);

    if (anchorsGroup) {
      anchorsGroup.innerHTML = waypoints
        .slice(1, -1)
        .map((pt) => `<circle class="thread-anchor-ring" cx="${pt.x}" cy="${pt.y}" r="4" />`)
        .join('');
    }

    totalLen = activePath.getTotalLength ? activePath.getTotalLength() : 5000;
    activePath.style.strokeDasharray = `${totalLen}`;

    lengthLookup = [];
    if (activePath.getPointAtLength && totalLen > 0) {
      const SAMPLES = 240;
      for (let s = 0; s <= SAMPLES; s++) {
        const len = (s / SAMPLES) * totalLen;
        const pt = activePath.getPointAtLength(len);
        lengthLookup.push({ len, x: pt.x, y: pt.y });
      }
    }

    cachedWinH = window.innerHeight;
    cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - cachedWinH);
    cachedStageTop = stage.offsetTop || 0;

    updateThreadOnScroll();
  }

  let cachedWinH = window.innerHeight;
  let cachedMaxScroll = 1000;
  let cachedStageTop = 0;
  let threadRafPending = false;
  let lastBuiltW = 0;
  let lastBuiltH = 0;
  let rebuildTimer = null;

  function scheduleThreadRebuild() {
    if (rebuildTimer) clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => {
      rebuildTimer = null;
      requestAnimationFrame(() => {
        if (!stage) return;
        const w = stage.clientWidth || 0;
        const h = stage.scrollHeight || 0;
        if (Math.abs(w - lastBuiltW) > 4) {
          lastBuiltW = w;
          lastBuiltH = h;
          buildWeavingThreadPath();
        }
      });
    }, 420);
  }

  function getLengthForTargetY(targetY) {
    if (!lengthLookup.length) return 0;
    if (targetY <= lengthLookup[0].y) return lengthLookup[0];
    const last = lengthLookup[lengthLookup.length - 1];
    if (targetY >= last.y) return last;

    let low = 0;
    let high = lengthLookup.length - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (lengthLookup[mid].y < targetY) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const idx = Math.max(1, low);
    const p0 = lengthLookup[idx - 1];
    const p1 = lengthLookup[idx];
    const spanY = Math.max(0.001, p1.y - p0.y);
    const t = Math.max(0, Math.min(1, (targetY - p0.y) / spanY));

    return {
      len: p0.len + (p1.len - p0.len) * t,
      x: p0.x + (p1.x - p0.x) * t,
      y: p0.y + (p1.y - p0.y) * t
    };
  }

  function updateThreadOnScroll() {
    threadRafPending = false;
    if (!activePath || !totalLen || !lengthLookup.length) return;

    const sy = window.scrollY;
    const scrollRatio = Math.max(0, Math.min(1, sy / cachedMaxScroll));

    const viewportFocusY = sy - cachedStageTop + cachedWinH * (0.48 + 0.50 * scrollRatio);
    const targetY = Math.max(40, Math.min(stageHeightCached, viewportFocusY));

    const hit = getLengthForTargetY(targetY);
    activePath.style.strokeDashoffset = `${Math.max(0, totalLen - hit.len)}`;

    if (bullseye) {
      bullseye.setAttribute('transform', `translate(${hit.x.toFixed(1)}, ${hit.y.toFixed(1)})`);
    }
  }

  function onScrollScheduleThread() {
    if (!threadRafPending) {
      threadRafPending = true;
      requestAnimationFrame(updateThreadOnScroll);
    }
  }

  function runInitialThreadBuild() {
    buildWeavingThreadPath();
    if (stage) {
      lastBuiltW = stage.clientWidth || 0;
      lastBuiltH = stage.scrollHeight || 0;
    }
  }

  const loaderEl = document.getElementById('signature-intro-loader');
  if (loaderEl && !loaderEl.classList.contains('is-dismissed')) {
    window.addEventListener('signature-dismissed', runInitialThreadBuild, { once: true });
    // Safety fallback in case dismissed without event
    setTimeout(() => {
      if (!lastBuiltW) runInitialThreadBuild();
    }, 5200);
  } else {
    runInitialThreadBuild();
  }

  window.addEventListener('scroll', onScrollScheduleThread, { passive: true });
  let lastThreadW = typeof window !== 'undefined' ? window.innerWidth : 0;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastThreadW) return;
    lastThreadW = window.innerWidth;
    scheduleThreadRebuild();
  }, { passive: true });

  if (typeof ResizeObserver !== 'undefined' && stage) {
    const ro = new ResizeObserver(() => scheduleThreadRebuild());
    ro.observe(stage);
  }

  const STAGE_COPY = {
    intent: '<strong>01 // STRUCTURAL INTENT:</strong> Defining the physical &amp; spatial problem with engineering rigor—load paths, equilibrium, and tectonic honesty before a single pixel or line of code is drawn.',
    interaction: '<strong>02 // EDITORIAL INTERACTION:</strong> Translating raw technical telemetry into tactile human experiences—bold Swiss grids, expressive street-zine typography, and responsive motion.',
    system: '<strong>03 // COMPUTATIONAL SYSTEM:</strong> Architecting the intelligence underneath—WebAssembly finite-element solvers, real-time WebGL shaders, and resilient full-stack pipelines.'
  };

  // Delegated listeners: keep working even if Svelte re-creates the buttons
  // (HMR / re-render) after boot, instead of binding to elements that may be replaced.
  const activateStage = (btn) => {
    const stageButtons = document.querySelectorAll('[data-thread-stage]');
    const readoutEl = document.getElementById('thread-stage-readout');
    const key = btn.getAttribute('data-thread-stage');
    if (btn.classList.contains('active') && readoutEl && readoutEl.innerHTML === STAGE_COPY[key]) return false;
    stageButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    if (readoutEl && STAGE_COPY[key]) {
      readoutEl.innerHTML = STAGE_COPY[key];
    }
    return true;
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('[data-thread-stage]');
    if (!btn) return;
    if (activateStage(btn)) playMechanicalTick(1020, 0.025);
  });

  document.addEventListener('mouseover', (e) => {
    const btn = e.target.closest && e.target.closest('[data-thread-stage]');
    if (!btn) return;
    if (btn.contains(e.relatedTarget)) return;
    if (activateStage(btn)) playMechanicalTick(1020, 0.025);
  });
}

export function initSystemReceiptCards() {
  // All handlers are delegated from the document so they keep working even if
  // Svelte re-creates the receipt / pipeline buttons after boot (HMR / re-render).
  const PIPE_LOGS = {
    sensor: '[NODE 01 // P-WAVE INGEST]: 450 triaxial MEMS accelerometers streaming @ 200Hz via WebSocket edge mesh (RTT: 3.2ms).',
    spectral: '[NODE 02 // SPECTRAL SOLVER]: Fast Fourier Transform (FFT) &amp; Newmark-β integration computing Sa(T) response spectrum.',
    gis: '[NODE 03 // GIS CONTOURING]: Real-time spatial kriging interpolating PGA iso-contours across 12 urban fault sectors.',
    dispatch: '[NODE 04 // AUTOMATED ALERT]: Structural valve shutoff &amp; civic broadcast dispatched within 420ms of threshold.'
  };

  const AXES = [
    'R = 13.0mm [wght:800]',
    'R = 18.5mm [wght:900 // ULTRA]',
    'R = 6.0mm [wght:400 // LIGHT]'
  ];
  let axisIdx = 0;

  const STORMS = [
    { label: 'BASIN 04 // 100-YR STORM', qp: '+ 24.6 m³/s', ret: '− 11.5 m³/s', net: '13.1 m³/s' },
    { label: 'BASIN 04 // 50-YR STORM', qp: '+ 19.2 m³/s', ret: '− 9.4 m³/s', net: '9.8 m³/s' },
    { label: 'BASIN 04 // 10-YR STORM', qp: '+ 12.8 m³/s', ret: '− 6.8 m³/s', net: '6.0 m³/s' }
  ];
  let stormIdx = 0;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;

    if (target.closest('#btn-sim-truss-load')) {
      playMechanicalTick(1350, 0.035);
      const newQk = Math.floor(4200 + Math.random() * 4800);
      const netNed = 12400 + newQk - 1920;
      setText('truss-live-qk', `+ ${newQk.toLocaleString()} kN`);
      setText('truss-net-ned', `${netNed.toLocaleString()} kN`);

      // Dynamic Tied-Arch SVG Deflection & Stress Visual Feedback
      const archPath = document.getElementById('truss-arch-path');
      const webPoly = document.getElementById('truss-web-poly');
      const loadDot = document.getElementById('truss-load-dot');
      const deflText = document.getElementById('truss-deflection-text');

      const ratio = (newQk - 4200) / 4800; // 0 to 1
      const apexY = Math.round(40 + ratio * 28); // deflects from 40 down to 68px
      const deflMm = (10.2 + ratio * 16.4).toFixed(1);
      const isHighStress = netNed > 19200;

      if (archPath) {
        archPath.setAttribute('d', `M 40 210 Q 300 ${apexY} 560 210`);
        archPath.setAttribute('stroke', isHighStress ? '#FF5533' : '#D4FF00');
        archPath.setAttribute('stroke-width', isHighStress ? '4' : '3');
      }

      if (webPoly) {
        const centerSag = Math.round(ratio * 12);
        webPoly.setAttribute(
          'points',
          `40,210 105,${152 + centerSag * 0.4} 170,210 235,${126 + centerSag * 0.7} 300,${210 + centerSag} 365,${126 + centerSag * 0.7} 430,210 495,${152 + centerSag * 0.4} 560,210`
        );
        webPoly.setAttribute('stroke', isHighStress ? '#FFAA00' : '#0055FF');
      }

      if (loadDot) {
        loadDot.setAttribute('cy', `${125 + Math.round(ratio * 16)}`);
        loadDot.setAttribute('r', isHighStress ? '9' : '6');
        loadDot.setAttribute('fill', isHighStress ? '#FF3355' : '#D4FF00');
      }

      if (deflText) {
        deflText.textContent = `δ = -${deflMm}mm ${isHighStress ? '[WARN]' : '[OK]'}`;
        deflText.setAttribute('fill', isHighStress ? '#FF3355' : '#D4FF00');
      }
      return;
    }

    const pipeBtn = target.closest('[data-pipe-node]');
    if (pipeBtn) {
      playMechanicalTick(1160, 0.03);
      const key = pipeBtn.getAttribute('data-pipe-node');
      document.querySelectorAll('[data-pipe-node]').forEach((b) => b.classList.remove('active'));
      pipeBtn.classList.add('active');
      const pipeReadout = document.getElementById('seismic-pipe-readout');
      if (pipeReadout && PIPE_LOGS[key]) pipeReadout.innerHTML = PIPE_LOGS[key];

      // Dynamic Seismic Telemetry SVG Graphic Feedback
      const seismicBg = document.getElementById('seismic-bg-rect');
      const seismicWave = document.getElementById('seismic-waveform');
      const e1 = document.getElementById('seismic-ellipse-1');
      const e2 = document.getElementById('seismic-ellipse-2');
      const e3 = document.getElementById('seismic-ellipse-3');
      const figTitle = document.getElementById('seismic-fig-title');

      if (key === 'sensor') {
        if (figTitle) figTitle.textContent = 'FIG 2.1 // RAW 3-AXIS MEMS ACCELEROMETER STREAM (200Hz)';
        if (seismicBg) seismicBg.setAttribute('fill', '#0B1226');
        if (seismicWave) {
          seismicWave.setAttribute(
            'points',
            '20,140 50,136 80,144 110,137 140,143 170,135 200,146 230,133 260,147 290,134 320,146 350,136 380,144 410,137 440,143 470,136 500,142 530,138 580,140'
          );
          seismicWave.setAttribute('stroke', '#00E5FF');
        }
        if (e1) { e1.setAttribute('rx', '50'); e1.setAttribute('ry', '22'); e1.setAttribute('stroke', 'rgba(0, 229, 255, 0.4)'); }
        if (e2) { e2.setAttribute('rx', '110'); e2.setAttribute('ry', '48'); e2.setAttribute('stroke', 'rgba(0, 229, 255, 0.25)'); }
        if (e3) { e3.setAttribute('rx', '180'); e3.setAttribute('ry', '80'); e3.setAttribute('stroke', 'rgba(242, 239, 233, 0.15)'); }
      } else if (key === 'spectral') {
        if (figTitle) figTitle.textContent = 'FIG 2.2 // SPECTRAL ACCELERATION Sa(T) SPECTRUM HUD';
        if (seismicBg) seismicBg.setAttribute('fill', '#002299');
        if (seismicWave) {
          seismicWave.setAttribute(
            'points',
            '20,140 120,140 145,95 170,195 195,60 220,220 245,80 270,175 295,120 320,155 350,140 580,140'
          );
          seismicWave.setAttribute('stroke', '#F2EFE9');
        }
        if (e1) { e1.setAttribute('rx', '80'); e1.setAttribute('ry', '35'); e1.setAttribute('stroke', '#FF3355'); }
        if (e2) { e2.setAttribute('rx', '150'); e2.setAttribute('ry', '65'); e2.setAttribute('stroke', '#D4FF00'); }
        if (e3) { e3.setAttribute('rx', '220'); e3.setAttribute('ry', '95'); e3.setAttribute('stroke', 'rgba(242,239,233,0.25)'); }
      } else if (key === 'gis') {
        if (figTitle) figTitle.textContent = 'FIG 2.3 // GIS EPICENTER ISOSEISMAL CONTOURS & SHAKEMAP';
        if (seismicBg) seismicBg.setAttribute('fill', '#0A2016');
        if (seismicWave) {
          seismicWave.setAttribute(
            'points',
            '20,140 80,140 120,132 160,148 200,133 240,147 280,135 320,145 360,136 400,144 440,138 480,142 580,140'
          );
          seismicWave.setAttribute('stroke', '#D4FF00');
        }
        if (e1) { e1.setAttribute('rx', '60'); e1.setAttribute('ry', '28'); e1.setAttribute('stroke', '#FF3355'); }
        if (e2) { e2.setAttribute('rx', '130'); e2.setAttribute('ry', '58'); e2.setAttribute('stroke', '#FFAA00'); }
        if (e3) { e3.setAttribute('rx', '240'); e3.setAttribute('ry', '105'); e3.setAttribute('stroke', '#D4FF00'); }
      } else if (key === 'dispatch') {
        if (figTitle) figTitle.textContent = 'FIG 2.4 // ALERT LEVEL 4 // CRITICAL PGA EXCEEDED!';
        if (seismicBg) seismicBg.setAttribute('fill', '#260408');
        if (seismicWave) {
          seismicWave.setAttribute(
            'points',
            '20,140 80,140 110,30 140,250 170,20 200,260 230,40 260,240 290,55 320,225 350,95 390,175 430,140 580,140'
          );
          seismicWave.setAttribute('stroke', '#FF3355');
        }
        if (e1) { e1.setAttribute('rx', '95'); e1.setAttribute('ry', '42'); e1.setAttribute('stroke', '#FF3355'); }
        if (e2) { e2.setAttribute('rx', '175'); e2.setAttribute('ry', '78'); e2.setAttribute('stroke', '#FF0033'); }
        if (e3) { e3.setAttribute('rx', '255'); e3.setAttribute('ry', '110'); e3.setAttribute('stroke', '#FF5533'); }
      }
      return;
    }

    if (target.closest('#btn-toggle-type-axis')) {
      playMechanicalTick(1240, 0.03);
      axisIdx = (axisIdx + 1) % AXES.length;
      setText('type-axis-readout', AXES[axisIdx]);

      // Dynamic Type Specimen SVG Graphic Feedback
      const glyph = document.getElementById('tectonic-glyph-text');
      const circle = document.getElementById('tectonic-radius-circle');
      const figTitle = document.getElementById('tectonic-fig-title');

      if (axisIdx === 0) {
        if (glyph) {
          glyph.style.fontWeight = '800';
          glyph.style.letterSpacing = '-4px';
          glyph.style.fill = '#F2EFE9';
        }
        if (circle) {
          circle.setAttribute('r', '34');
          circle.setAttribute('cx', '195');
          circle.setAttribute('stroke', '#D4FF00');
        }
        if (figTitle) figTitle.textContent = 'FIG 3.0 // WIDE-FLANGE STRUCTURAL VARIABLE FONT';
      } else if (axisIdx === 1) {
        if (glyph) {
          glyph.style.fontWeight = '900';
          glyph.style.letterSpacing = '-7px';
          glyph.style.fill = '#D4FF00';
        }
        if (circle) {
          circle.setAttribute('r', '52');
          circle.setAttribute('cx', '205');
          circle.setAttribute('stroke', '#FF3355');
        }
        if (figTitle) figTitle.textContent = 'FIG 3.1 // AISC WF 300×150 // ULTRA HEAVY [wght:900]';
      } else if (axisIdx === 2) {
        if (glyph) {
          glyph.style.fontWeight = '400';
          glyph.style.letterSpacing = '2px';
          glyph.style.fill = '#F2EFE9';
        }
        if (circle) {
          circle.setAttribute('r', '16');
          circle.setAttribute('cx', '185');
          circle.setAttribute('stroke', '#00B4FF');
        }
        if (figTitle) figTitle.textContent = 'FIG 3.2 // AISC WF 300×150 // MONOLINE LIGHT [wght:400]';
      }
      return;
    }

    if (target.closest('#btn-cycle-storm')) {
      playMechanicalTick(1090, 0.03);
      stormIdx = (stormIdx + 1) % STORMS.length;
      const s = STORMS[stormIdx];
      setText('hydro-return-label', s.label);
      setText('hydro-qp-val', s.qp);
      setText('hydro-ret-val', s.ret);
      setText('hydro-net-val', s.net);

      // Dynamic Hydro CFD Vector Field SVG Graphic Feedback
      const p1 = document.getElementById('hydro-flow-path-1');
      const p2 = document.getElementById('hydro-flow-path-2');
      const p3 = document.getElementById('hydro-flow-path-3');
      const hydroBg = document.getElementById('hydro-bg-rect');
      const hydroHud = document.getElementById('hydro-hud-text');
      const figTitle = document.getElementById('hydro-fig-title');

      if (stormIdx === 0) {
        if (figTitle) figTitle.textContent = 'FIG 4.2 // NAVIER-STOKES Q100 STORM SURGE VECTOR FIELD';
        if (hydroBg) hydroBg.setAttribute('fill', '#070D1C');
        if (p1) {
          p1.setAttribute('d', 'M 0 80 C 140 20, 320 220, 600 60');
          p1.setAttribute('stroke-width', '4.5');
          p1.setAttribute('stroke', '#0055FF');
        }
        if (p2) {
          p2.setAttribute('d', 'M 0 135 C 180 50, 360 250, 600 100');
          p2.setAttribute('stroke-width', '3.5');
          p2.setAttribute('stroke', '#00D5FF');
        }
        if (p3) {
          p3.setAttribute('d', 'M 0 190 C 220 90, 380 260, 600 150');
          p3.setAttribute('stroke-width', '2.8');
          p3.setAttribute('stroke', '#FF3355');
        }
        if (hydroHud) {
          hydroHud.textContent = 'RUNOFF: 24.6 m³/s [Q100]';
          hydroHud.setAttribute('fill', '#FF3355');
        }
      } else if (stormIdx === 1) {
        if (figTitle) figTitle.textContent = 'FIG 4.1 // NAVIER-STOKES Q50 MODERATE RUNOFF VECTOR FIELD';
        if (hydroBg) hydroBg.setAttribute('fill', '#091016');
        if (p1) {
          p1.setAttribute('d', 'M 0 95 C 160 50, 360 190, 600 75');
          p1.setAttribute('stroke-width', '3.2');
          p1.setAttribute('stroke', '#0055FF');
        }
        if (p2) {
          p2.setAttribute('d', 'M 0 135 C 190 75, 360 210, 600 120');
          p2.setAttribute('stroke-width', '2.5');
          p2.setAttribute('stroke', '#00B4FF');
        }
        if (p3) {
          p3.setAttribute('d', 'M 0 175 C 210 110, 370 230, 600 155');
          p3.setAttribute('stroke-width', '2.0');
          p3.setAttribute('stroke', '#D4FF00');
        }
        if (hydroHud) {
          hydroHud.textContent = 'RUNOFF: 19.2 m³/s [Q50]';
          hydroHud.setAttribute('fill', '#FFAA00');
        }
      } else if (stormIdx === 2) {
        if (figTitle) figTitle.textContent = 'FIG 4.0 // NAVIER-STOKES Q10 BASELINE LAMINAR FLOW';
        if (hydroBg) hydroBg.setAttribute('fill', '#0B0D14');
        if (p1) {
          p1.setAttribute('d', 'M 0 115 C 180 80, 380 150, 600 110');
          p1.setAttribute('stroke-width', '2.2');
          p1.setAttribute('stroke', '#0055FF');
        }
        if (p2) {
          p2.setAttribute('d', 'M 0 140 C 200 110, 380 175, 600 135');
          p2.setAttribute('stroke-width', '1.8');
          p2.setAttribute('stroke', '#0088FF');
        }
        if (p3) {
          p3.setAttribute('d', 'M 0 165 C 220 135, 380 195, 600 160');
          p3.setAttribute('stroke-width', '1.5');
          p3.setAttribute('stroke', '#00E5FF');
        }
        if (hydroHud) {
          hydroHud.textContent = 'RUNOFF: 12.8 m³/s [Q10]';
          hydroHud.setAttribute('fill', '#00E5FF');
        }
      }
      return;
    }
  });
}
export function bootInteractions() {
  // Only what the intro needs runs immediately; everything else waits until the loader has left the
  // screen and is then executed as small separate tasks (no single long main-thread task).
  initSignatureIntroLoader();
  initCadCursor();

  const queue = [
    initSmoothScrollAndGSAP,
    initScrollStructuralThread,
    initThemeAndXrayControls,
    initAnimeMicroInteractions,
    initBeamDeflectionSolver,
    initCyberTerminal,
    initKineticTypePlayground,
    initArchiveFilter,
    initSystemReceiptCards,
    initDraggablePasteupBoard,
    initModalsAndForm
  ];

  let started = false;
  const runQueue = () => {
    if (started) return;
    started = true;
    const step = () => {
      const fn = queue.shift();
      if (!fn) return;
      try {
        fn();
      } catch (err) {
        console.error('[init]', fn.name, err);
      }
      setTimeout(step, 0);
    };
    step();
  };

  const loaderEl = document.getElementById('signature-intro-loader');
  if (!loaderEl || loaderEl.classList.contains('is-dismissed')) {
    runQueue();
  } else {
    window.addEventListener('signature-dismissed', runQueue, { once: true });
    setTimeout(runQueue, 8000); // safety net
  }
}
