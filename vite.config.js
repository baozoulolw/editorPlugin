import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import removeConsole from './src/plugins/removeConsole';
import vue from '@vitejs/plugin-vue2';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    removeConsole(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          '*://*/index/*',
          '*://*/other/*',
          '*://*/yyx/*'
        ],
      },
    }),
  ],
  server: {
    host:'0.0.0.0',
    port: 5689
  },
  build: {
    rollupOptions: {
      external: ['vue', 'lodash', 'monaco-editor'],
      plugins: [visualizer],
      output: {
        globals: {
          vue: 'Vue',
          lodash: '_'
        },
      },
    },
    // 添加worker配置
    target: 'esnext',
    minify: false, // 开发阶段不压缩，便于调试
  },
  worker: {
    format: 'es', // 使用ES模块格式
    plugins: [
      // 可以在这里添加worker专用的插件
    ]
  }
});
