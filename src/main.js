/* Self-hosted fonts — strictly pruned to required subsets & weights to avoid critical chain waterfalls */
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import '@fontsource/space-grotesk/latin-500.css';
import '@fontsource/space-grotesk/latin-700.css';
import '@fontsource/syne/latin-800.css';
import '@fontsource/permanent-marker/latin-400.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';

import './app.css';
import App from './App.svelte';
import { injectSpeedInsights } from '@vercel/speed-insights';

const app = new App({
  target: document.getElementById('app')
});

// Initialize Vercel Speed Insights
injectSpeedInsights();

export default app;
