/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        'e2e/',
        'src/__tests__/',
        'src/vite-env.d.ts',
        'src/main.tsx',
        'src/App.tsx',
        'src/pages/',
        'src/components/articles/',
        'src/components/certifications/',
        'src/components/platforms/',
        'src/components/projects/',
        'src/components/layout/',
        'src/types/',
        '*.config.{js,ts}',
      ],
      // Realistic thresholds - targeting 50% minimum
      thresholds: {
        statements: 50,
        branches: 25,
        functions: 45,
        lines: 55,
      },
    },
  },
});
