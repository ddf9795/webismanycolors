import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  test: {
    exclude: ['**/e2e/**'],
    root: './dist/',
    reporters: ['default'],
  },
  base: '',
});
