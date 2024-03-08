import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  test: {
    exclude: ['**/e2e/**'],
    root: './',
    reporters: ['default'],
  },
  // base: 'https://ddf9795.github.io/webismanycolors',
});
