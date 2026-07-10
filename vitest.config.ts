import { defineConfig } from 'vitest/config'

// Config exclusiva de tests. No usamos @vitejs/plugin-react aquí: su preamble
// de Fast Refresh no funciona bajo jsdom; esbuild transforma el JSX igual.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
