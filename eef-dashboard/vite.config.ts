import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Relative base. Works for all three deploy targets the app ships to:
    //  - Tauri (macOS): dist/ is served from the asset protocol's root origin,
    //    so relative asset paths resolve correctly under tauri://localhost.
    //  - GitHub Pages: served from the /CAPRI/ sub-path with a HashRouter.
    //  - (legacy) Electron: loaded dist/ via the file:// protocol.
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 4173,
      host: true, // binds 0.0.0.0 so LAN devices can reach it too
      strictPort: false,
    },
  };
});
