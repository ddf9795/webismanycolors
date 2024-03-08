import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  test: {
    exclude: ['**/e2e/**'],
    root: './',
    reporters: ['default'],
  },
  base: './src',
});
