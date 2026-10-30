/* ==========================================================================
   KINETIK.STRUCT // THREE.JS WEBGL ENGINE (src/lib/scene3d.js)
   1. Pre-baked 128x128 Paper Grain Tile (0% per-frame CPU/GPU overhead)
   2. Global Scroll-Driven Architectural Wireframe & Telemetry Field (#webgl-bg-canvas)
   3. Interactive 3D Structural & Topographic CAD Sandbox (#cad-interactive-canvas)
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
   PART 0: PRE-BAKED 128x128 PAPER GRAIN TILE
   ------------------------------------------------------------------------ */
export function initPrebakedPaperGrain() {
  const grainEl = document.querySelector('.paper-grain-overlay');
  if (!grainEl) return;
  try {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(128, 128);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 60) | 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = (Math.random() * 42) | 0;
    }
    ctx.putImageData(img, 0, 0);
    grainEl.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  } catch (e) {
    // Fallback if canvas dataURL is restricted
  }
}

/* ------------------------------------------------------------------------
   PART 1: GLOBAL SCROLL-DRIVEN THREE.JS BACKGROUND SCENE
   ------------------------------------------------------------------------ */
export function initGlobalBackgroundScene() {
  const canvas = document.getElementById('webgl-bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );
  camera.position.set(0, 2, 26);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  const ringMatBlue = new THREE.MeshBasicMaterial({
    color: COLORS.electricBlue,
    wireframe: true,
    transparent: true,
    opacity: 0.14
  });

  const ringMatLime = new THREE.MeshBasicMaterial({
    color: COLORS.acidLime,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });

  const outerTorus = new THREE.Mesh(
    new THREE.TorusGeometry(11, 0.04, 8, 96),
    ringMatBlue
  );
  rootGroup.add(outerTorus);

  const innerTorus = new THREE.Mesh(
    new THREE.TorusGeometry(8.2, 0.03, 6, 72),
    ringMatLime
  );
  innerTorus.rotation.x = Math.PI / 3;
  rootGroup.add(innerTorus);

  const icoGeo = new THREE.IcosahedronGeometry(5.5, 1);
  const wireGeo = new THREE.WireframeGeometry(icoGeo);
  const wireMat = new THREE.LineBasicMaterial({
    color: COLORS.electricBlue,
    transparent: true,
    opacity: 0.16
  });
  const spaceFrame = new THREE.LineSegments(wireGeo, wireMat);
  rootGroup.add(spaceFrame);

  const particleCount = 220;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 42;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 32;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const ptsMat = new THREE.PointsMaterial({
    color: COLORS.electricBlue,
    size: 0.14,
    transparent: true,
    opacity: 0.35
  });
  const nodeCloud = new THREE.Points(ptsGeo, ptsMat);
  scene.add(nodeCloud);

  let scrollProgress = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  let cachedWinW = window.innerWidth;
  let cachedWinH = window.innerHeight;

  window.addEventListener('scroll', () => {
    scrollProgress = window.scrollY / cachedMaxScroll;
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    targetMouseX = (e.clientX / cachedWinW - 0.5) * 2;
    targetMouseY = -(e.clientY / cachedWinH - 0.5) * 2;
  }, { passive: true });

  window.updateBgSceneTheme = function (theme) {
    if (theme === 'blueprint' || theme === 'cyber') {
      wireMat.color.setHex(COLORS.acidLime);
      wireMat.opacity = 0.22;
      ptsMat.color.setHex(COLORS.acidLime);
    } else {
      wireMat.color.setHex(COLORS.electricBlue);
      wireMat.opacity = 0.15;
      ptsMat.color.setHex(COLORS.electricBlue);
    }
  };

  const clock = new THREE.Clock();
  let bgFrameSkip = 0;

  function animateBg() {
    requestAnimationFrame(animateBg);
    if (document.hidden) return;

    // Pause rendering while the signature intro loader is covering the screen
    const loader = document.getElementById('signature-intro-loader');
    if (loader && !loader.classList.contains('is-dismissed')) {
      return;
    }

    // Render background ambient wireframe every 2nd tick so DOM scroll & card animations get 100% GPU priority
    bgFrameSkip = (bgFrameSkip + 1) & 1;
    if (bgFrameSkip !== 0) return;

    const t = clock.getElapsedTime();

    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;

    rootGroup.rotation.y = t * 0.08 + scrollProgress * Math.PI * 2.2 + currentMouseX * 0.35;
    rootGroup.rotation.x = scrollProgress * Math.PI * 1.1 + currentMouseY * 0.25;
    rootGroup.position.y = Math.sin(scrollProgress * Math.PI * 2) * 2.5;
    rootGroup.position.x = Math.cos(scrollProgress * Math.PI) * 3.5;

    outerTorus.rotation.z = t * 0.12;
    innerTorus.rotation.y = -t * 0.18;
    spaceFrame.scale.setScalar(1 + Math.sin(t * 0.8) * 0.04);

    nodeCloud.rotation.y = -t * 0.02 + scrollProgress * 0.8;

    renderer.render(scene, camera);
  }

  animateBg();

  window.addEventListener('resize', () => {
    cachedWinW = window.innerWidth;
    cachedWinH = window.innerHeight;
    cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - cachedWinH);
    camera.aspect = cachedWinW / cachedWinH;
    camera.updateProjectionMatrix();
    renderer.setSize(cachedWinW, cachedWinH);
  });
}

/* ------------------------------------------------------------------------
   PART 2: INTERACTIVE 3D STRUCTURAL & TOPOGRAPHIC CAD SANDBOX
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

  window.addEventListener('resize', () => {
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 580;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.render(scene, camera);
  });
}

export function bootScene3D() {
  initPrebakedPaperGrain();
  initGlobalBackgroundScene();
  initInteractiveCadSandbox();
}
