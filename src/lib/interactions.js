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


/* ------------------------------------------------------------------------
   KINETIC TYPOGRAPHY UTILITIES: MASKED WORD REVEALS & TEXT SCRAMBLER
   ------------------------------------------------------------------------ */
function splitIntoKineticWords(el) {
  if (!el || el.dataset.kineticSplit === 'true') return Array.from(el.querySelectorAll('.kinetic-word'));
  el.dataset.kineticSplit = 'true';

  const walker = (node) => {
    if (node.nodeType === 3) {
      const text = node.textContent;
      if (!text.trim()) return node;
      const words = text.split(/(\\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach((w) => {
        if (/^\\s+$/.test(w)) {
          frag.appendChild(document.createTextNode(w));
        } else if (w.length > 0) {
          const mask = document.createElement('span');
          mask.className = 'kinetic-mask';
          const inner = document.createElement('span');
          inner.className = 'kinetic-word';
          inner.textContent = w;
          mask.appendChild(inner);
          frag.appendChild(mask);
        }
      });
      return frag;
    } else if (node.nodeType === 1) {
      if (node.classList && (node.classList.contains('kinetic-mask') || node.classList.contains('bullet') || node.classList.contains('essay-inline-toggle'))) {
        return node;
      }
      const children = Array.from(node.childNodes);
      children.forEach((child) => {
        const replacement = walker(child);
        if (replacement && replacement !== child) {
          node.replaceChild(replacement, child);
        }
      });
      return node;
    }
    return node;
  };

  const children = Array.from(el.childNodes);
  children.forEach((child) => {
    const replacement = walker(child);
    if (replacement && replacement !== child) {
      el.replaceChild(replacement, child);
    }
  });

  return Array.from(el.querySelectorAll('.kinetic-word'));
}

function scrambleText(el, targetText, duration = 600) {
  if (!el) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//_░▒▓';
  const orig = targetText || el.textContent;
  const len = orig.length;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const revealedCount = Math.floor(progress * len);

    let output = '';
    for (let i = 0; i < len; i++) {
      if (i < revealedCount || orig[i] === ' ' || orig[i] === '\\n') {
        output += orig[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = output;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = orig;
    }
  }

  requestAnimationFrame(update);
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
          if (pageBadgeEl) pageBadgeEl.textContent = `${idx} / 07`;
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
    if (pageBadge) pageBadge.textContent = `${idx} / 07`;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${secId}`);
    });
  }

  if (prefersReducedMotion) return;

  // =========================================================================
  // ARCHITECTURAL KINETIC SUITE: FULL EDITORIAL TYPOGRAPHY & TECTONIC CARDS
  // =========================================================================

  // A. FULL KINETIC TYPOGRAPHY SYSTEM
  // -------------------------------------------------------------------------

  // 1. Kinetic Masked Word Reveals for Oversized Titles & Major Headings
  const majorHeadings = document.querySelectorAll([
    '.section-oversized-title',
    '.essay-main-title',
    '.pillar-title',
    '.timeline-milestone-role',
    '.receipt-project-title'
  ].join(', '));

  majorHeadings.forEach((heading) => {
    const words = splitIntoKineticWords(heading);
    if (words.length) {
      gsap.fromTo(
        words,
        {
          yPercent: 125,
          rotateZ: (i) => (i % 2 === 0 ? -4 : 4),
          opacity: 0,
          force3D: true
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.035,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  });

  // 2. Telemetry Character Decoder / Scrambler for Kickers & Badges
  const scramblerElements = document.querySelectorAll([
    '.section-kicker',
    '.essay-index-tag',
    '.pillar-id-badge',
    '.milestone-code'
  ].join(', '));

  scramblerElements.forEach((el) => {
    const origText = el.textContent.trim();
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        scrambleText(el, origText, 650);
        gsap.fromTo(
          el,
          { x: -30, opacity: 0, force3D: true },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
        );
      }
    });
  });

  // 3. Staggered Kinetic Paragraphs & Curatorial Lead Notes
  const paragraphElements = document.querySelectorAll([
    '.essay-paragraph',
    '.section-curatorial-note',
    '.pillar-desc',
    '.timeline-milestone-desc',
    '.section-meta-readout',
    '.receipt-desc'
  ].join(', '));

  paragraphElements.forEach((p) => {
    gsap.fromTo(
      p,
      {
        y: 28,
        opacity: 0,
        force3D: true
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 4. Drafting Matrix & Spec Sheet Rows (Staggered Telemetry Cascade)
  gsap.utils.toArray([
    '.essay-spec-matrix',
    '.engineering-spec-sheet .spec-table tbody',
    '.timeline-deliverables'
  ].join(', ')).forEach((container) => {
    const rows = container.querySelectorAll('.spec-row, tr, li');
    if (rows.length) {
      gsap.fromTo(
        rows,
        {
          x: -24,
          opacity: 0,
          force3D: true
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  });


  // B. FULL TECTONIC CARDS IN-ANIMATION SYSTEM
  // -------------------------------------------------------------------------

  // 1. HERO SECTION 01: Left Dossier Sidebar & Card 01 3D Entrance
  const heroCard01 = document.querySelector('.collage-card--01');
  const heroSidebar = document.querySelector('.editorial-sidebar-essay');

  if (heroSidebar) {
    gsap.fromTo(
      heroSidebar,
      {
        x: -55,
        scale: 0.94,
        opacity: 0,
        force3D: true
      },
      {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1.15,
        ease: 'power4.out',
        delay: 0.1
      }
    );
  }

  if (heroCard01) {
    // 3D perspective drop & physical settle
    gsap.fromTo(
      heroCard01,
      {
        y: 80,
        scale: 0.88,
        rotationX: 12,
        rotationY: -6,
        opacity: 0,
        force3D: true
      },
      {
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        duration: 1.35,
        ease: 'power4.out',
        delay: 0.15
      }
    );

    // Inner photo zoom-settle
    const photo01 = heroCard01.querySelector('.collage-photo');
    if (photo01) {
      gsap.fromTo(
        photo01,
        { scale: 1.15, force3D: true },
        { scale: 1.0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );
    }

    // Number '01' Badge Spring Snap
    const badge01 = heroCard01.querySelector('.badge-num-circle');
    if (badge01) {
      gsap.fromTo(
        badge01,
        { scale: 0, rotation: -45, opacity: 0, force3D: true },
        { scale: 1, rotation: -6, opacity: 1, duration: 0.8, ease: 'back.out(2.8)', delay: 0.45 }
      );
    }

    // Physical stickers & tape slap
    const stickers01 = heroCard01.querySelectorAll('.torn-tape-sticker, .barcode-sticker-box, .studio-monogram-badge');
    if (stickers01.length) {
      gsap.fromTo(
        stickers01,
        { scale: 0.65, opacity: 0, force3D: true },
        { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2.4)', delay: 0.55 }
      );
    }

    // Caption bar slide-up
    const caption01 = heroCard01.querySelector('.card-editorial-caption-bar');
    if (caption01) {
      gsap.fromTo(
        caption01,
        { y: 24, opacity: 0, force3D: true },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.65 }
      );
    }
  }

  // 2. BOTTOM SPREAD: Card 02 (Left) & Card 03 (Right) Coordinated 3D Entry
  const card02 = document.querySelector('.collage-card--02');
  const card03 = document.querySelector('.collage-card--03');

  if (card02) {
    gsap.fromTo(
      card02,
      {
        x: -65,
        y: 75,
        rotationZ: -3.5,
        rotationY: 7,
        scale: 0.9,
        opacity: 0,
        force3D: true
      },
      {
        x: 0,
        y: 0,
        rotationZ: 0,
        rotationY: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card02,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  if (card03) {
    gsap.fromTo(
      card03,
      {
        x: 65,
        y: 75,
        rotationZ: 3.5,
        rotationY: -7,
        scale: 0.9,
        opacity: 0,
        force3D: true
      },
      {
        x: 0,
        y: 0,
        rotationZ: 0,
        rotationY: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card03,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  // 3D SCROLL-EXPAND CINEMATIC ANIMATIONS
  // A. Disciplinary Synthesis 3D Chamber Scroll Expand
  const synthBanner = document.querySelector('.thread-synthesis-banner');
  if (synthBanner) {
    gsap.fromTo(
      synthBanner,
      {
        scale: 0.88,
        rotateX: 14,
        transformPerspective: 1200,
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
      },
      {
        scale: 1,
        rotateX: 0,
        boxShadow: '8px 8px 0 var(--ink-black)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: synthBanner,
          start: 'top 95%',
          end: 'top 60%',
          scrub: isTouchOrMobile ? true : 0.35
        }
      }
    );
  }



  // Badges & Photos for Cards 02 & 03
  gsap.utils.toArray('.collage-card--02 .badge-num-circle, .collage-card--03 .badge-num-circle').forEach((badge) => {
    gsap.fromTo(
      badge,
      { scale: 0, rotation: -40, opacity: 0, force3D: true },
      {
        scale: 1,
        rotation: -6,
        opacity: 1,
        duration: 0.75,
        ease: 'back.out(2.6)',
        scrollTrigger: {
          trigger: badge,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  gsap.utils.toArray('.collage-card--02 .collage-photo, .collage-card--03 .collage-photo').forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.15, force3D: true },
      {
        scale: 1.0,
        duration: 1.35,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 2.5. SYNTHESIS BRIDGE: "Intent · Interaction · System" Thread Banner 3D Entrance
  const synthesisBanner = document.querySelector('.thread-synthesis-banner');
  if (synthesisBanner) {
    const bannerTop = synthesisBanner.querySelector('.thread-banner-top');
    const stageNodes = synthesisBanner.querySelectorAll('.thread-stage-node');
    const connectors = synthesisBanner.querySelectorAll('.thread-connector-line');
    const readout = synthesisBanner.querySelector('.thread-stage-readout');

    const tlBanner = gsap.timeline({
      scrollTrigger: {
        trigger: synthesisBanner,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    // 1. Physical 3D plate drop & box-shadow settle
    tlBanner.fromTo(
      synthesisBanner,
      {
        y: 65,
        scale: 0.93,
        rotationX: 8,
        opacity: 0,
        boxShadow: '0px 0px 0 var(--ink-black)',
        force3D: true
      },
      {
        y: 0,
        scale: 1,
        rotationX: 0,
        opacity: 1,
        boxShadow: '6px 6px 0 var(--ink-black)',
        duration: 1.15,
        ease: 'power4.out'
      },
      0
    );

    // 2. Top meta kicker slide down
    if (bannerTop) {
      tlBanner.fromTo(
        bannerTop,
        { y: -16, opacity: 0, force3D: true },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.18
      );
    }

    // 3. Staggered node buttons spring pop
    if (stageNodes.length) {
      tlBanner.fromTo(
        stageNodes,
        { y: 32, scale: 0.90, opacity: 0, force3D: true },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(2.4)'
        },
        0.28
      );
    }

    // 4. Horizontal connector wires expand
    if (connectors.length) {
      tlBanner.fromTo(
        connectors,
        { scaleX: 0, opacity: 0, transformOrigin: 'center center', force3D: true },
        { scaleX: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        0.42
      );
    }

    // 5. Lower readout console slide-up & settle
    if (readout) {
      tlBanner.fromTo(
        readout,
        { y: 22, opacity: 0, force3D: true },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.52
      );
    }
  }

  // 3. SECTION 02: Three Identity Pillar Modules (Cascade 3D Lift)
  const pillarGrid = document.querySelector('.tri-pillar-grid');
  if (pillarGrid) {
    const pillars = pillarGrid.querySelectorAll('.pillar-module');
    if (pillars.length) {
      gsap.fromTo(
        pillars,
        {
          y: 70,
          scale: 0.91,
          rotationX: 10,
          opacity: 0,
          force3D: true
        },
        {
          y: 0,
          scale: 1,
          rotationX: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarGrid,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  }

  // 4. SECTION 03: 3D CAD Lab Wrapper 3D Scroll Expand & Telemetry Panel
  const cadWrapper = document.querySelector('.cad-3d-lab-wrapper');
  if (cadWrapper) {
    gsap.fromTo(
      cadWrapper,
      {
        y: 40,
        scale: 0.90,
        rotateX: 10,
        transformPerspective: 1200,
        opacity: 0.85,
        force3D: true
      },
      {
        y: 0,
        scale: 1,
        rotateX: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cadWrapper,
          start: 'top 92%',
          end: 'top 58%',
          scrub: isTouchOrMobile ? true : 0.35
        }
      }
    );

    const modelBtns = cadWrapper.querySelectorAll('.cad-model-btn');
    if (modelBtns.length) {
      gsap.fromTo(
        modelBtns,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cadWrapper,
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  }

  // 5. SECTION 04: Timeline Milestone Cards (Alternating Mechanical Impact)
  const milestoneCards = document.querySelectorAll('.timeline-milestone-card');
  milestoneCards.forEach((card, idx) => {
    const fromX = idx % 2 === 0 ? -55 : 55;
    const tilt = idx % 2 === 0 ? -2.5 : 2.5;
    gsap.fromTo(
      card,
      {
        x: fromX,
        y: 55,
        rotationZ: tilt,
        scale: 0.92,
        opacity: 0,
        force3D: true
      },
      {
        x: 0,
        y: 0,
        rotationZ: 0,
        scale: 1,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    const yearBadge = card.querySelector('.milestone-year-badge');
    if (yearBadge) {
      gsap.fromTo(
        yearBadge,
        { scale: 0.6, opacity: 0, force3D: true },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2.4)',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            once: true
          }
        }
      );
    }
  });

  // 6. SECTION 05: Archive System Receipt Cards (Paper Slip Physics)
  gsap.utils.toArray('.system-receipt-card').forEach((receipt, idx) => {
    const isLeft = receipt.classList.contains('system-receipt--tilted-left');
    const targetAngle = isLeft ? -1.6 : 1.6;
    gsap.fromTo(
      receipt,
      {
        y: 85,
        scale: 0.9,
        rotationZ: isLeft ? -6 : 6,
        opacity: 0,
        force3D: true
      },
      {
        y: 0,
        scale: 1,
        rotationZ: targetAngle,
        opacity: 1,
        duration: 0.9,
        delay: (idx % 3) * 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: receipt,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 7. SECTION 06: Draggable Pasteup Board & Dropping Stickers
  const pasteupBoard = document.querySelector('.draggable-pasteup-board');
  if (pasteupBoard) {
    gsap.fromTo(
      pasteupBoard,
      {
        y: 65,
        scale: 0.93,
        opacity: 0,
        force3D: true
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: pasteupBoard,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    const stickers = pasteupBoard.querySelectorAll('.draggable-sticker');
    if (stickers.length) {
      gsap.fromTo(
        stickers,
        {
          y: -65,
          scale: 0.65,
          rotation: (i) => (i % 2 === 0 ? -18 : 18),
          opacity: 0,
          force3D: true
        },
        {
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.75,
          ease: 'back.out(2.5)',
          scrollTrigger: {
            trigger: pasteupBoard,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  }

  // 8. SECTION 07: ISO Titleblock, Transmission Form & Approval Stamp
  const titleblockWrap = document.querySelector('.iso-titleblock-wrapper');
  if (titleblockWrap) {
    gsap.fromTo(
      titleblockWrap,
      {
        y: 60,
        scale: 0.94,
        opacity: 0,
        force3D: true
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleblockWrap,
          start: 'top 84%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  const dispatchForm = document.querySelector('.transmission-form-pane');
  if (dispatchForm) {
    gsap.fromTo(
      dispatchForm,
      {
        x: 45,
        opacity: 0,
        force3D: true
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dispatchForm,
          start: 'top 84%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  const isoStamp = document.querySelector('.iso-approval-stamp');
  if (isoStamp) {
    gsap.fromTo(
      isoStamp,
      {
        scale: 1.85,
        opacity: 0,
        rotationZ: -16,
        force3D: true
      },
      {
        scale: 1,
        opacity: 1,
        rotationZ: -2.5,
        duration: 0.7,
        ease: 'back.out(3.2)',
        scrollTrigger: {
          trigger: isoStamp,
          start: 'top 86%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  // 9. Hydraulic Progress Bars & Telemetry Fills
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

export function initFooterCoordinates() {
  const footerCoords = document.getElementById('footer-live-coords');
  if (!footerCoords) return;
  let winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
  let winH = typeof window !== 'undefined' ? window.innerHeight : 800;
  let prevCoordKey = '';
  window.addEventListener('resize', () => {
    winW = window.innerWidth;
    winH = window.innerHeight;
  }, { passive: true });
  window.addEventListener('pointermove', (e) => {
    const normX = ((e.clientX / winW) * 1000).toFixed(0).padStart(4, '0');
    const normY = ((e.clientY / winH) * 1000).toFixed(0).padStart(4, '0');
    const key = normX + ':' + normY;
    if (key !== prevCoordKey) {
      prevCoordKey = key;
      footerCoords.textContent = 'GRID [' + normX + ', ' + normY + ']';
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


    });
  });

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
  const progressFill = document.getElementById('signature-progress-fill');
  const phaseTagEl = document.getElementById('loader-phase-tag');
  const consoleTextEl = document.getElementById('loader-console-text');
  const clockEl = document.getElementById('loader-clock-display');
  const skipBtn = document.getElementById('signature-skip-btn');

  if (!loader) return;

  let tl = null;
  let dismissedEmitted = false;
  function emitDismissed() {
    if (dismissedEmitted) return;
    dismissedEmitted = true;
    window.dispatchEvent(new CustomEvent('signature-dismissed'));
  }

  // Live Clock updater (low frequency: 1s)
  function updateClock() {
    if (!clockEl) return;
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s} LOCAL`;
  }
  updateClock();
  const clockTimer = setInterval(updateClock, 1000);

  function dismissLoader() {
    if (loader.classList.contains('is-dismissed')) return;
    loader.classList.add('is-dismissed');
    if (tl) tl.kill();
    clearInterval(clockTimer);
    window.removeEventListener('keydown', onKey);
    playMechanicalTick(1280, 0.05);

    // Notify the rest of the application so interactive systems mount
    emitDismissed();

    // Cinematic editorial shutter slide-up with GSAP
    gsap.to(loader, {
      yPercent: -102,
      duration: 0.85,
      ease: 'power4.inOut',
      onComplete: () => {
        loader.style.display = 'none';
      }
    });
  }

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      dismissLoader();
    }
  };
  window.addEventListener('keydown', onKey);

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissLoader();
    });
  }

  if (prefersReducedMotion || !path) {
    setTimeout(dismissLoader, 600);
    return;
  }

  const len = Math.ceil(path.getTotalLength ? path.getTotalLength() : 2500);
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${len}`;

  const PHASES = [
    { threshold: 0, tag: 'PHASE 01 // CONTINUUM BOOT', msg: 'INITIALIZING CONTINUUM MECHANICS & TECTONIC SYSTEM...' },
    { threshold: 22, tag: 'PHASE 02 // FINITE ELEMENT NODES', msg: 'SOLVING FINITE ELEMENT EQUILIBRIUM & STRAIN TENSORS...' },
    { threshold: 48, tag: 'PHASE 03 // 3D CAD ENGINE', msg: 'COMPILING WEBGL 3D SHADERS & PARAMETRIC BUFFERS...' },
    { threshold: 74, tag: 'PHASE 04 // EDITORIAL SYNTHESIS', msg: 'MOUNTING BRUTALIST SWISS GRID & KINETIC TYPOGRAPHY...' },
    { threshold: 95, tag: 'PHASE 05 // TECTONIC LOCK', msg: 'TECTONIC LOCK ESTABLISHED // ALL CORES SYNCHRONIZED' }
  ];

  const progressObj = { pct: 0 };
  let lastPct = -1;
  let currentPhaseIndex = -1;

  // Cinematic pacing: ~3.2s on desktop, ~2.8s on mobile/tablet (fluid, hardware-accelerated, zero lag)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  const drawDuration = isMobile ? 2.8 : 3.2;

  tl = gsap.timeline({
    onComplete: () => {
      // Hold for 350ms at 100% so user sees the complete locked state
      setTimeout(dismissLoader, 350);
    }
  });

  tl.to(path, {
    strokeDashoffset: 0,
    duration: drawDuration,
    ease: 'power2.inOut'
  }, 0);

  tl.to(progressObj, {
    pct: 100,
    duration: drawDuration,
    ease: 'power2.inOut',
    onUpdate: () => {
      const current = Math.min(100, Math.round(progressObj.pct));
      if (current !== lastPct) {
        lastPct = current;
        if (pctEl) {
          pctEl.textContent = `${current.toString().padStart(3, '0')}%`;
        }
        if (progressFill) {
          progressFill.style.width = `${current}%`;
        }

        // Determine current phase
        let pIndex = 0;
        for (let i = PHASES.length - 1; i >= 0; i--) {
          if (current >= PHASES[i].threshold) {
            pIndex = i;
            break;
          }
        }
        if (pIndex !== currentPhaseIndex) {
          currentPhaseIndex = pIndex;
          if (phaseTagEl) phaseTagEl.textContent = PHASES[pIndex].tag;
          if (consoleTextEl) consoleTextEl.textContent = PHASES[pIndex].msg;
          playMechanicalTick(920 + pIndex * 100, 0.015);
        }
      }
    }
  }, 0);
}

export function initScrollStructuralThread() {
  // Heavy line path SVG completely removed per user request for peak 60fps performance.
  // Stage nodes (01 INTENT, 02 INTERACTION, 03 SYSTEM) directly drive the 3D Synthesis Core:
  const STAGE_COPY = {
    intent: '<strong>01 // STRUCTURAL INTENT:</strong> Defining the physical &amp; spatial problem with engineering rigor—load paths, equilibrium, and tectonic honesty before a single pixel or line of code is drawn.',
    interaction: '<strong>02 // EDITORIAL INTERACTION:</strong> Translating raw technical telemetry into tactile human experiences—bold Swiss grids, expressive street-zine typography, and responsive motion.',
    system: '<strong>03 // COMPUTATIONAL SYSTEM:</strong> Architecting the intelligence underneath—WebAssembly finite-element solvers, real-time WebGL shaders, and resilient full-stack pipelines.'
  };

  const activateStage = (btn) => {
    const stageButtons = document.querySelectorAll('[data-thread-stage]');
    const readoutEl = document.getElementById('thread-stage-readout');
    const key = btn.getAttribute('data-thread-stage');
    if (!key || !STAGE_COPY[key]) return false;
    stageButtons.forEach((b) => b.classList.toggle('active', b === btn));
    if (readoutEl) {
      readoutEl.innerHTML = STAGE_COPY[key];
    }
    if (typeof window.switchSynthesis3DStage === 'function') {
      window.switchSynthesis3DStage(key);
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
  initFooterCoordinates();

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
