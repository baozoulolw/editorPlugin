import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import removeConsole from './src/plugins/removeConsole';
import vue from '@vitejs/plugin-vue2';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    removeConsole(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://*/*'],
      },
    }),
  ],
  server:{
    port:5689
  },
  build: {
    rollupOptions: {
      external: ['vue', 'lodash','monaco-editor'],
      plugins:[visualizer],
      output: {
        globals: {
          vue: 'Vue',
          lodash: '_'
        },
      },
    },
  }
});
