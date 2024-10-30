import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import removeConsole from './src/plugins/removeConsole';
import vue from '@vitejs/plugin-vue2';
import UnoCSS from 'unocss/vite';
let editorPlugin = monacoEditorPlugin.default;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    editorPlugin({}),
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
  build: {
    rollupOptions: {
      external: ['vue', 'lodash','monaco-editor'],
      output: {
        globals: {
          vue: 'Vue',
          lodash: '_'
        },
      },
    },
  }
});
