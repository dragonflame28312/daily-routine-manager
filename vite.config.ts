import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Use a relative base path so that the built app works when served from a subfolder on GitHub Pages
      // Without this, Vite defaults to '/' which breaks asset loading on GitHub Pages.
      base: './',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Remove unnecessary Gemini API definitions. The app doesn't rely on Gemini APIs.
      define: {},
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
