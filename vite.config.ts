import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig} from 'vite';
import type {Plugin} from 'vite';

/**
 * GitHub Pages serves this repository from its root at /res/, so the live
 * HTML references public/... relatively. Vite normally copies public/ to the
 * dist root; copy it to dist/public/ instead so `vite preview` and the local
 * QA suite resolve the same URLs as the deployed site.
 */
function copyPublicToDist(): Plugin {
  return {
    name: 'copy-public-to-dist',
    apply: 'build',
    closeBundle() {
      const src = path.resolve(__dirname, 'public');
      const dest = path.resolve(__dirname, 'dist/public');
      if (fs.existsSync(src)) fs.cpSync(src, dest, {recursive: true});
    },
  };
}

export default defineConfig(() => {
  return {
    publicDir: false as const,
    plugins: [react(), tailwindcss(), copyPublicToDist()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
