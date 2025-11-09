import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Erweitert Vitest mit jest-dom matchers
expect.extend(matchers);

// Cleanup nach jedem Test
afterEach(() => {
  cleanup();
});
