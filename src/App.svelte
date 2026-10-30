<script>
  import { onMount } from 'svelte';

  import GlobalOverlays from './components/GlobalOverlays.svelte';
  import SignatureLoader from './components/SignatureLoader.svelte';
  import Header from './components/Header.svelte';
  import LeftSpine from './components/LeftSpine.svelte';
  import SectionSpread from './components/SectionSpread.svelte';
  import SectionIdentity from './components/SectionIdentity.svelte';
  import SectionCad3D from './components/SectionCad3D.svelte';
  import SectionTimeline from './components/SectionTimeline.svelte';
  import SectionArchive from './components/SectionArchive.svelte';
  import SectionPasteup from './components/SectionPasteup.svelte';
  import SectionDispatch from './components/SectionDispatch.svelte';
  import Footer from './components/Footer.svelte';
  import DossierModal from './components/DossierModal.svelte';

  import { bootScene3D } from './lib/scene3d.js';
  import { bootInteractions } from './lib/interactions.js';

  onMount(() => {
    bootInteractions();

    // Defer 3D WebGL engine until the intro loader is dismissed so GPU is 100% dedicated to loader
    const onDismissed = () => {
      bootScene3D();
    };
    window.addEventListener('signature-dismissed', onDismissed, { once: true });
    const loaderEl = document.getElementById('signature-intro-loader');
    if (!loaderEl || loaderEl.classList.contains('is-dismissed')) {
      bootScene3D();
    }
  });
</script>

<!-- Global Paper Grain, Fold Creases, Grid, WebGL Background & CAD Cursor -->
<GlobalOverlays />

<!-- One-Line Signature Intro Preloader -->
<SignatureLoader />

<!-- Fixed Editorial Header & Left Spine -->
<Header />
<LeftSpine />

<!-- Main Editorial Stage -->
<main class="main-editorial-stage" id="main-editorial-stage">
  <SectionSpread />
  <SectionIdentity />
  <SectionCad3D />
  <SectionTimeline />
  <SectionArchive />
  <SectionPasteup />
  <SectionDispatch />
</main>

<!-- Fixed Editorial Footer & Dossier Case-Study Modal -->
<Footer />
<DossierModal />
