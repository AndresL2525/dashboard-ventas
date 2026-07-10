import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// localStorage se comparte entre tests en jsdom: lo limpiamos tras cada uno
// para que AuthContext arranque siempre desde su estado inicial.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
