import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    publicDir: false,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'milkii-preview-virtual',
        resolveId(id) {
          if (id === 'virtual:milkii-preview') {
            return '\0virtual:milkii-preview';
          }
        },
        load(id) {
          if (id === '\0virtual:milkii-preview') {
            const html = fs.readFileSync(path.resolve(__dirname, 'public/index.html'), 'utf8');
            const backendSrc = fs.readFileSync(
              path.resolve(__dirname, 'functions/api/[[route]].js'),
              'utf8'
            );
            const marker = 'const encoder = new TextEncoder();';
            const head = backendSrc.split(marker)[0];
            const sandbox: Record<string, unknown> = {};
            vm.runInNewContext(`${head}\nthis.__out = { PLANS, LIMITS, DEFAULT_PAYMENT, DEFAULT_LIMITS, REGIONS, CATEGORIES };`, sandbox);
            return `export const milkiiHtml = ${JSON.stringify(html)};\nexport const milkiiBackendConfig = ${JSON.stringify(sandbox.__out)};`;
          }
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
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
