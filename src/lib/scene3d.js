/* ==========================================================================
   KINETIK.STRUCT // THREE.JS CAD ENGINE (src/lib/scene3d.js)
   1. Pre-baked 128x128 Paper Grain Tile (0% per-frame CPU/GPU overhead)
   2. Interactive 3D Structural & Topographic CAD Sandbox (#cad-interactive-canvas)
   ========================================================================== */

const COLORS = {
  cream: 0xF2EFE9,
  black: 0x0D0D10,
  electricBlue: 0x0038FF,
  acidLime: 0xD4FF00,
  cyan: 0x00B4FF,
  oxide: 0xFF3355
};

/* ------------------------------------------------------------------------
   PART 0: TACTILE RAW INDUSTRIAL PAPER GRAIN & FIBER TILE (256x256)
   Procedurally generates tactile unbleached paper pulp, micro-grain & fibers.
   Bakes once into a base64 PNG data URL in ~2ms. 0% runtime GPU overhead.
   ------------------------------------------------------------------------ */
export function initPrebakedPaperGrain() {
  const grainEl = document.querySelector('.paper-grain-overlay');
  if (!grainEl) return;
  try {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    // 1. Base mottled paper grain noise
    const img = ctx.createImageData(size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 55 + 10) | 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = (Math.random() * 38 + 6) | 0;
    }
    ctx.putImageData(img, 0, 0);

    // 2. Procedural raw pulp fibers (random curved/straight unbleached paper fibers)
    ctx.strokeStyle = 'rgba(15, 15, 20, 0.28)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    for (let f = 0; f < 110; f++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const len = Math.random() * 6 + 2;
      const angle = Math.random() * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.stroke();
    }

    // 3. Wood pulp flecks (organic riso/kraft imperfections)
    ctx.fillStyle = 'rgba(10, 10, 15, 0.35)';
    for (let p = 0; p < 45; p++) {
      const px = Math.random() * size;
      const py = Math.random() * size;
      const pr = Math.random() * 1.2 + 0.6;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    grainEl.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  } catch (e) {
    // Fallback if canvas dataURL is restricted
  }
}

/* ------------------------------------------------------------------------
   PART 0.5: OPTION 4 CYBER KINETIC WAVE & SEISMIC FREQUENCY MESH
   Smooth sinusoidal seismic wave synthesis that drifts softly in background.
   Runs at a light 35fps and only animates when [data-bg-style="wave"].
   ------------------------------------------------------------------------ */
let waveAnimFrame = null;
export function initKineticWaveBackground() {
  const canvas = document.getElementById('kinetic-wave-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Track window width to strictly ignore vertical-only resize events triggered by mobile/tablet address bar expand/collapse
  let lastWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  let width = (canvas.width = canvas.clientWidth || window.innerWidth);
  let height = (canvas.height = canvas.clientHeight || window.innerHeight);

  const onResize = () => {
    // On touch/mobile browsers, address bar collapse/expand only alters height, not width.
    // Guarding by width ensures the wave baseline never jumps or repositions when releasing scroll!
    if (Math.abs(window.innerWidth - lastWidth) < 4) return;
    lastWidth = window.innerWidth;
    width = canvas.width = canvas.clientWidth || window.innerWidth;
    height = canvas.height = canvas.clientHeight || window.innerHeight;
  };
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      lastWidth = window.innerWidth;
      width = canvas.width = canvas.clientWidth || window.innerWidth;
      height = canvas.height = canvas.clientHeight || window.innerHeight;
    }, 250);
  }, { passive: true });

  let time = 0;
  const WAVES = [
    { amp: 38, freq: 0.0018, speed: 0.016, color: 'rgba(0, 56, 255, 0.45)', lineW: 1.8, yRatio: 0.35 },
    { amp: 55, freq: 0.0012, speed: 0.012, color: 'rgba(212, 255, 0, 0.40)', lineW: 2.0, yRatio: 0.52 },
    { amp: 44, freq: 0.0022, speed: 0.020, color: 'rgba(0, 180, 255, 0.35)', lineW: 1.4, yRatio: 0.68 },
    { amp: 62, freq: 0.0009, speed: 0.008, color: 'rgba(255, 42, 85, 0.28)', lineW: 1.2, yRatio: 0.82 }
  ];

  let lastTime = 0;
  function render(now) {
    waveAnimFrame = requestAnimationFrame(render);
    // Throttle to ~35fps for zero battery impact
    if (now - lastTime < 28) return;
    lastTime = now;

// Pure Cyber Kinetic Wave active

    ctx.clearRect(0, 0, width, height);
    time += 1;

    WAVES.forEach((w) => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.lineW;
      const baseY = height * w.yRatio;

      for (let x = 0; x <= width; x += 12) {
        const y = baseY + Math.sin(x * w.freq + time * w.speed) * w.amp + Math.cos(x * w.freq * 0.5 + time * 0.01) * (w.amp * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      for (let x = 60; x <= width - 60; x += 180) {
        const y = baseY + Math.sin(x * w.freq + time * w.speed) * w.amp + Math.cos(x * w.freq * 0.5 + time * 0.01) * (w.amp * 0.4);
        ctx.fillStyle = w.color;
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    });
  }

  render(0);
}

/* ------------------------------------------------------------------------
   PART 1: INTERACTIVE 3D STRUCTURAL & TOPOGRAPHIC CAD SANDBOX
   ------------------------------------------------------------------------ */
export function initInteractiveCadSandbox() {
  const canvas = document.getElementById('cad-interactive-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const width = container.clientWidth || 900;
  const height = container.clientHeight || 580;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 300);
  const orbit = {
    radius: 24,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    targetRadius: 24,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3,
    isDragging: false,
    prevX: 0,
    prevY: 0,
    autoRotate: true
  };

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const dirLight1 = new THREE.DirectionalLight(0xd4ff00, 1.2);
  dirLight1.position.set(15, 25, 15);
  scene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x0055ff, 1.4);
  dirLight2.position.set(-18, -10, -12);
  scene.add(dirLight2);

  const gridHelper = new THREE.GridHelper(32, 32, COLORS.electricBlue, 0x222638);
  gridHelper.position.y = -5.5;
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(4);
  axesHelper.position.set(-14, -5.4, -14);
  scene.add(axesHelper);

  const assemblyGroup = new THREE.Group();
  scene.add(assemblyGroup);

  const simParams = {
    modelType: 'hypar',
    loadKN: 450,
    freqHz: 2.4,
    density: 24,
    explode: 0.0
  };

  let activeMeshGroup = null;

  function stressColor(normVal) {
    const c = new THREE.Color();
    const t = Math.max(0, Math.min(1, normVal));
    if (t < 0.5) {
      c.setHex(COLORS.electricBlue).lerp(new THREE.Color(COLORS.acidLime), t * 2);
    } else {
      c.setHex(COLORS.acidLime).lerp(new THREE.Color(COLORS.oxide), (t - 0.5) * 2);
    }
    return c;
  }

  function buildHyparShell(segs) {
    const group = new THREE.Group();
    const span = 14;
    const geo = new THREE.PlaneGeometry(span, span, segs, segs);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = ((x * x - z * z) / (span * 1.45)) * 2.2;
      pos.setY(i, y);

      const norm = (y + 3.5) / 7.0;
      const col = stressColor(norm);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const surfMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.42,
      roughness: 0.3,
      metalness: 0.5
    });
    const surfMesh = new THREE.Mesh(geo, surfMat);
    surfMesh.name = 'deformableSurface';
    group.add(surfMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true
    });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.name = 'deformableWire';
    group.add(wireMesh);

    const pinGeo = new THREE.ConeGeometry(0.55, 1.4, 4);
    const pinMat = new THREE.MeshBasicMaterial({ color: COLORS.acidLime, wireframe: true });
    const half = span / 2;
    [
      [-half, -half],
      [half, -half],
      [-half, half],
      [half, half]
    ].forEach(([cx, cz]) => {
      const pin = new THREE.Mesh(pinGeo, pinMat);
      const cy = ((cx * cx - cz * cz) / (span * 1.45)) * 2.2;
      pin.position.set(cx, cy - 0.7, cz);
      group.add(pin);
    });

    return group;
  }

  function buildPrattTruss(bays) {
    const group = new THREE.Group();
    const numBays = Math.max(4, Math.min(16, Math.floor(bays / 2.5)));
    const length = 18;
    const height = 4.2;
    const width = 4.0;
    const dx = length / numBays;

    const nodePositions = [];
    const nodeGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: COLORS.acidLime });

    for (let i = 0; i <= numBays; i++) {
      const x = -length / 2 + i * dx;
      nodePositions.push(new THREE.Vector3(x, -1.5, -width / 2));
      nodePositions.push(new THREE.Vector3(x, -1.5, width / 2));
      const archCam = Math.sin((i / numBays) * Math.PI) * 1.4;
      nodePositions.push(new THREE.Vector3(x, height - 1.5 + archCam, -width / 2));
      nodePositions.push(new THREE.Vector3(x, height - 1.5 + archCam, width / 2));
    }

    nodePositions.forEach((pt, idx) => {
      const sphere = new THREE.Mesh(nodeGeo, nodeMat);
      sphere.position.copy(pt);
      sphere.userData = { basePos: pt.clone(), idx };
      sphere.name = 'trussNode';
      group.add(sphere);
    });

    const linePts = [];
    const lineColors = [];

    function addMember(i1, i2, stressRatio) {
      const p1 = nodePositions[i1];
      const p2 = nodePositions[i2];
      linePts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      const c = stressColor(stressRatio);
      lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    }

    for (let i = 0; i <= numBays; i++) {
      const base = i * 4;
      const midFactor = Math.sin((i / numBays) * Math.PI);
      addMember(base, base + 1, 0.25);
      addMember(base + 2, base + 3, 0.65 * midFactor);
      addMember(base, base + 2, 0.45);
      addMember(base + 1, base + 3, 0.45);
      addMember(base, base + 3, 0.3);

      if (i < numBays) {
        const next = (i + 1) * 4;
        addMember(base, next, 0.85 * midFactor);
        addMember(base + 1, next + 1, 0.85 * midFactor);
        addMember(base + 2, next + 2, 0.9 * midFactor);
        addMember(base + 3, next + 3, 0.9 * midFactor);
        addMember(base, next + 2, 0.6);
        addMember(base + 1, next + 3, 0.6);
        addMember(base + 2, next + 3, 0.35);
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 2 });
    const trussLines = new THREE.LineSegments(lineGeo, lineMat);
    trussLines.name = 'trussMembers';
    group.add(trussLines);

    return group;
  }

  function buildTopoMatrix(segs) {
    const group = new THREE.Group();
    const size = 16;
    const geo = new THREE.PlaneGeometry(size, size, segs, segs);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const d = Math.sqrt(x * x + z * z);
      const y =
        Math.sin(x * 0.45) * Math.cos(z * 0.45) * 2.4 +
        Math.cos(d * 0.65) * 1.3;
      pos.setY(i, y);

      const col = stressColor((y + 3.5) / 7.0);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const wireMesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true })
    );
    wireMesh.name = 'topoWire';
    group.add(wireMesh);

    const ptsMesh = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: COLORS.acidLime, size: 0.16 })
    );
    group.add(ptsMesh);

    return group;
  }

  function buildTensegrityModel(detail) {
    const group = new THREE.Group();
    const sub = Math.max(0, Math.min(2, Math.floor(detail / 16)));

    const outerGeo = new THREE.OctahedronGeometry(5.6, sub);
    const innerGeo = new THREE.IcosahedronGeometry(3.2, sub);

    const outerWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(outerGeo),
      new THREE.LineBasicMaterial({ color: COLORS.acidLime })
    );
    outerWire.name = 'tensegrityOuter';
    group.add(outerWire);

    const innerMesh = new THREE.Mesh(
      innerGeo,
      new THREE.MeshStandardMaterial({
        color: COLORS.electricBlue,
        wireframe: false,
        flatShading: true,
        transparent: true,
        opacity: 0.72
      })
    );
    innerMesh.name = 'tensegrityInner';
    group.add(innerMesh);

    const innerWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(innerGeo),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    group.add(innerWire);

    return group;
  }

  function rebuildActiveModel() {
    if (activeMeshGroup) {
      assemblyGroup.remove(activeMeshGroup);
    }

    if (simParams.modelType === 'hypar') {
      activeMeshGroup = buildHyparShell(simParams.density);
    } else if (simParams.modelType === 'truss') {
      activeMeshGroup = buildPrattTruss(simParams.density);
    } else if (simParams.modelType === 'topo') {
      activeMeshGroup = buildTopoMatrix(simParams.density);
    } else {
      activeMeshGroup = buildTensegrityModel(simParams.density);
    }

    assemblyGroup.add(activeMeshGroup);
    updateHudReadouts();
  }

  function updateHudReadouts() {
    const stressMPa = ((simParams.loadKN * 0.42) * (1 + simParams.explode * 0.5)).toFixed(1);
    const safetyFactor = Math.max(1.05, (345 / Math.max(40, stressMPa))).toFixed(2);
    const nodeCount = simParams.density * simParams.density;

    const elStress = document.getElementById('hud-von-mises');
    const elSafety = document.getElementById('hud-safety-factor');
    const elNodes = document.getElementById('hud-node-count');

    if (elStress) elStress.textContent = `${stressMPa} MPa`;
    if (elSafety) {
      elSafety.textContent = `FS = ${safetyFactor}`;
      elSafety.style.color = safetyFactor < 1.5 ? '#FF3355' : '#D4FF00';
    }
    if (elNodes) elNodes.textContent = `${nodeCount} NODES`;
  }

  rebuildActiveModel();

  canvas.addEventListener('pointerdown', (e) => {
    orbit.isDragging = true;
    orbit.autoRotate = false;
    orbit.prevX = e.clientX;
    orbit.prevY = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!orbit.isDragging) return;
    const dx = e.clientX - orbit.prevX;
    const dy = e.clientY - orbit.prevY;
    orbit.prevX = e.clientX;
    orbit.prevY = e.clientY;

    orbit.targetTheta -= dx * 0.008;
    orbit.targetPhi = Math.max(0.15, Math.min(Math.PI - 0.15, orbit.targetPhi - dy * 0.008));
  });

  window.addEventListener('pointerup', () => {
    orbit.isDragging = false;
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    orbit.targetRadius = Math.max(10, Math.min(42, orbit.targetRadius + e.deltaY * 0.015));
  }, { passive: false });

  document.querySelectorAll('[data-cad-model]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cad-model]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      simParams.modelType = btn.getAttribute('data-cad-model');
      rebuildActiveModel();
    });
  });

  const sliderLoad = document.getElementById('cad-slider-load');
  const sliderFreq = document.getElementById('cad-slider-freq');
  const sliderDensity = document.getElementById('cad-slider-density');
  const sliderExplode = document.getElementById('cad-slider-explode');

  if (sliderLoad) {
    sliderLoad.addEventListener('input', (e) => {
      simParams.loadKN = parseFloat(e.target.value);
      document.getElementById('cad-val-load').textContent = `${simParams.loadKN} kN`;
      updateHudReadouts();
    });
  }

  if (sliderFreq) {
    sliderFreq.addEventListener('input', (e) => {
      simParams.freqHz = parseFloat(e.target.value);
      document.getElementById('cad-val-freq').textContent = `${simParams.freqHz.toFixed(1)} Hz`;
    });
  }

  if (sliderDensity) {
    sliderDensity.addEventListener('input', (e) => {
      simParams.density = parseInt(e.target.value, 10);
      document.getElementById('cad-val-density').textContent = `${simParams.density}×${simParams.density}`;
      rebuildActiveModel();
    });
  }

  if (sliderExplode) {
    sliderExplode.addEventListener('input', (e) => {
      simParams.explode = parseFloat(e.target.value);
      document.getElementById('cad-val-explode').textContent = `${Math.round(simParams.explode * 100)}%`;
      updateHudReadouts();
    });
  }

  document.querySelectorAll('[data-cam-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cam-view]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-cam-view');
      orbit.autoRotate = view === 'iso';
      if (view === 'iso') {
        orbit.targetTheta = Math.PI / 4;
        orbit.targetPhi = Math.PI / 3;
        orbit.targetRadius = 24;
      } else if (view === 'top') {
        orbit.targetTheta = 0;
        orbit.targetPhi = 0.08;
        orbit.targetRadius = 26;
      } else if (view === 'front') {
        orbit.targetTheta = 0;
        orbit.targetPhi = Math.PI / 2;
        orbit.targetRadius = 22;
      } else if (view === 'side') {
        orbit.targetTheta = Math.PI / 2;
        orbit.targetPhi = Math.PI / 2;
        orbit.targetRadius = 22;
      }
    });
  });

  const clock = new THREE.Clock();
  let isCadVisible = false;

  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCadVisible = entry.isIntersecting;
        });
      },
      { rootMargin: '150px 0px' }
    );
    io.observe(canvas);
  } else {
    isCadVisible = true;
  }

  camera.position.x = orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);
  camera.position.y = orbit.radius * Math.cos(orbit.phi);
  camera.position.z = orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);

  function animateCad() {
    requestAnimationFrame(animateCad);
    if (!isCadVisible || document.hidden) return;
    const t = clock.getElapsedTime();

    if (orbit.autoRotate && !orbit.isDragging) {
      orbit.targetTheta += 0.0035;
    }

    orbit.theta += (orbit.targetTheta - orbit.theta) * 0.08;
    orbit.phi += (orbit.targetPhi - orbit.phi) * 0.08;
    orbit.radius += (orbit.targetRadius - orbit.radius) * 0.08;

    camera.position.x = orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);
    camera.position.y = orbit.radius * Math.cos(orbit.phi);
    camera.position.z = orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);
    camera.lookAt(0, 0, 0);

    if (activeMeshGroup) {
      const loadAmp = (simParams.loadKN / 500) * 0.65;
      const omega = simParams.freqHz * 2.0;
      const wave = Math.sin(t * omega) * loadAmp * 0.35;

      activeMeshGroup.position.y = wave;
      const explodeScale = 1 + simParams.explode * 0.45;
      activeMeshGroup.scale.set(explodeScale, 1 + (simParams.loadKN / 1200) * 0.25, explodeScale);
    }

    renderer.render(scene, camera);
  }

  animateCad();

  let lastCadW = container ? container.clientWidth : 0;
  let cadResizeTimer = null;
  window.addEventListener('resize', () => {
    const w = container.clientWidth || 800;
    if (w === lastCadW) return;
    lastCadW = w;

    if (cadResizeTimer) clearTimeout(cadResizeTimer);
    cadResizeTimer = setTimeout(() => {
      const h = container.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    }, 120);
  }, { passive: true });
}

/* ------------------------------------------------------------------------
   LAZY THREE.JS LOADING
   Three.js (~600 KB) is no longer a render-blocking <head> script. It is fetched on demand:
   - Background wireframe field: after the signature intro loader is dismissed (it is hidden behind it anyway)
   - CAD sandbox: only when its canvas is about to scroll into view
   ------------------------------------------------------------------------ */
const THREE_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
let threeLoadPromise = null;

function loadThree() {
  if (typeof THREE !== 'undefined') return Promise.resolve();
  if (!threeLoadPromise) {
    threeLoadPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = THREE_CDN_URL;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        threeLoadPromise = null;
        reject(new Error('three.js failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return threeLoadPromise;
}

function whenIdle(cb, timeout = 1500) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(cb, { timeout });
  } else {
    setTimeout(cb, 120);
  }
}


/* ------------------------------------------------------------------------
   PART 3: 3D KINETIC TECTONIC SYNTHESIS CORE (#synthesis-3d-canvas)
   Scroll-expanded real-time Three.js viewport showcasing the 3 core disciplines:
   01 INTENT (Civil Space Truss), 02 INTERACTION (Kinetic Ribbon), 03 SYSTEM (Geodesic Matrix).
   Supports mouse/touch drag orbit, scroll-driven radial expansion & geometry morphing.
   ------------------------------------------------------------------------ */
export function initSynthesis3DCore() {
  const canvas = document.getElementById('synthesis-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.clientWidth || 800;
  let height = container.clientHeight || 320;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 15);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambLight);
  const dirLight1 = new THREE.DirectionalLight(0xd4ff00, 1.3);
  dirLight1.position.set(12, 16, 10);
  scene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x0055ff, 1.2);
  dirLight2.position.set(-12, -10, -10);
  scene.add(dirLight2);

  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 1. Model INTENT (01 Civil - Space Truss Arch)
  const groupIntent = new THREE.Group();
  const trussPts = [];
  const span = 12;
  const count = 14;
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = (t - 0.5) * span;
    const yBot = -2.4;
    const yTop = yBot + Math.sin(t * Math.PI) * 4.2;
    if (i < count) {
      const nextX = ((i + 1) / count - 0.5) * span;
      trussPts.push(new THREE.Vector3(x, yBot, -1.2), new THREE.Vector3(nextX, yBot, -1.2));
      trussPts.push(new THREE.Vector3(x, yBot, 1.2), new THREE.Vector3(nextX, yBot, 1.2));
      trussPts.push(new THREE.Vector3(x, yBot, -1.2), new THREE.Vector3(nextX, yBot, 1.2));
      const nextYTop = yBot + Math.sin(((i + 1) / count) * Math.PI) * 4.2;
      trussPts.push(new THREE.Vector3(x, yTop, 0), new THREE.Vector3(nextX, nextYTop, 0));
      trussPts.push(new THREE.Vector3(x, yBot, -1.2), new THREE.Vector3(x, yTop, 0));
      trussPts.push(new THREE.Vector3(x, yBot, 1.2), new THREE.Vector3(x, yTop, 0));
      trussPts.push(new THREE.Vector3(nextX, yBot, -1.2), new THREE.Vector3(x, yTop, 0));
    }
  }
  const geoIntent = new THREE.BufferGeometry().setFromPoints(trussPts);
  const matIntent = new THREE.LineBasicMaterial({ color: 0xD4FF00, linewidth: 2 });
  groupIntent.add(new THREE.LineSegments(geoIntent, matIntent));

  const nodeGeo = new THREE.SphereGeometry(0.14, 8, 8);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00B4FF });
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = (t - 0.5) * span;
    const yBot = -2.4;
    const yTop = yBot + Math.sin(t * Math.PI) * 4.2;
    const n1 = new THREE.Mesh(nodeGeo, nodeMat); n1.position.set(x, yBot, -1.2); groupIntent.add(n1);
    const n2 = new THREE.Mesh(nodeGeo, nodeMat); n2.position.set(x, yBot, 1.2); groupIntent.add(n2);
    const n3 = new THREE.Mesh(nodeGeo, nodeMat); n3.position.set(x, yTop, 0); groupIntent.add(n3);
  }
  coreGroup.add(groupIntent);

  // 2. Model INTERACTION (02 Editorial - Torus Knot Wireframe)
  const groupInteraction = new THREE.Group();
  const geoInteraction = new THREE.TorusKnotGeometry(3.6, 1.1, 72, 12, 2, 3);
  const matInteraction = new THREE.MeshBasicMaterial({ color: 0x0055FF, wireframe: true });
  const meshInteraction = new THREE.Mesh(geoInteraction, matInteraction);
  groupInteraction.add(meshInteraction);
  groupInteraction.visible = false;
  coreGroup.add(groupInteraction);

  // 3. Model SYSTEM (03 WebGL - Geodesic Icosahedron Cluster)
  const groupSystem = new THREE.Group();
  const geoSysOuter = new THREE.IcosahedronGeometry(4.4, 1);
  const matSysOuter = new THREE.LineSegments(
    new THREE.WireframeGeometry(geoSysOuter),
    new THREE.LineBasicMaterial({ color: 0xD4FF00 })
  );
  const geoSysInner = new THREE.OctahedronGeometry(2.6, 1);
  const matSysInner = new THREE.LineSegments(
    new THREE.WireframeGeometry(geoSysInner),
    new THREE.LineBasicMaterial({ color: 0xFF2A55 })
  );
  groupSystem.add(matSysOuter);
  groupSystem.add(matSysInner);
  groupSystem.visible = false;
  coreGroup.add(groupSystem);

  // Orbit drag state
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let rotX = 0.2, rotY = 0.4;
  let targetRotX = 0.2, targetRotY = 0.4;

  const onPointerDown = (e) => {
    isDragging = true;
    prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    const cx = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const cy = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const dx = cx - prevX;
    const dy = cy - prevY;
    prevX = cx;
    prevY = cy;
    targetRotY += dx * 0.008;
    targetRotX += dy * 0.008;
  };
  const onPointerUp = () => { isDragging = false; };

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  window.switchSynthesis3DStage = (stageKey) => {
    groupIntent.visible = stageKey === 'intent';
    groupInteraction.visible = stageKey === 'interaction';
    groupSystem.visible = stageKey === 'system';

    const stageEl = document.getElementById('synthesis-telemetry-stage');
    const geoEl = document.getElementById('synthesis-telemetry-geo');
    if (stageEl) {
      stageEl.textContent = stageKey === 'intent' ? '01 INTENT' : (stageKey === 'interaction' ? '02 INTERACTION' : '03 SYSTEM');
    }
    if (geoEl) {
      geoEl.textContent = stageKey === 'intent' ? 'SPACE TRUSS' : (stageKey === 'interaction' ? 'KINETIC RIBBON' : 'NEURAL LATTICE');
    }
  };

  let targetScale = 1.0;
  const updateScrollProgress = () => {
    const rect = container.getBoundingClientRect();
    const winH = window.innerHeight;
    const prog = Math.max(0, Math.min(1, (winH - rect.top) / (winH + rect.height * 0.4)));
    targetScale = 0.85 + prog * 0.35;

    const expandEl = document.getElementById('synthesis-telemetry-expand');
    if (expandEl) {
      expandEl.textContent = `${Math.round(prog * 100)}%`;
    }
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  let isVisible = true;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      isVisible = entries.some(e => e.isIntersecting);
    }, { rootMargin: '200px 0px' });
    io.observe(container);
  }

  let currentScale = 1.0;
  const coordsEl = document.getElementById('synthesis-3d-coords');

  const animate = () => {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    if (!isDragging) {
      targetRotY += 0.006;
    }
    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;
    currentScale += (targetScale - currentScale) * 0.06;

    coreGroup.rotation.x = rotX;
    coreGroup.rotation.y = rotY;
    coreGroup.scale.set(currentScale, currentScale, currentScale);

    if (groupInteraction.visible) {
      meshInteraction.rotation.z += 0.01;
    }
    if (groupSystem.visible) {
      matSysInner.rotation.x -= 0.015;
      matSysInner.rotation.y += 0.012;
    }

    if (coordsEl && Math.random() < 0.1) {
      const degX = Math.round((rotX * 180 / Math.PI) % 360);
      const degY = Math.round((rotY * 180 / Math.PI) % 360);
      coordsEl.textContent = `θ: ${degY}° φ: ${degX}°`;
    }

    renderer.render(scene, camera);
  };
  animate();

  if (typeof ResizeObserver !== 'undefined' && container) {
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);
  }

  let lastW = container.clientWidth;
  window.addEventListener('resize', () => {
    if (container.clientWidth === lastW) return;
    lastW = container.clientWidth;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 320;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, { passive: true });
}

export function bootScene3D() {
  initPrebakedPaperGrain();

  let threeEngineStarted = false;
  const start3DEngines = () => {
    if (threeEngineStarted) return;
    threeEngineStarted = true;
    loadThree()
      .then(() => {
        initSynthesis3DCore();
        initInteractiveCadSandbox();
      })
      .catch((err) => {
        threeEngineStarted = false;
        console.warn('Three.js engines deferred:', err);
      });
  };

  // Pre-warm Three.js and mount both 3D viewports immediately so they are live when scrolled to
  start3DEngines();
}
