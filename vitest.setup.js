// This file can be used to set up global configurations or mocks for Vitest.
// For now, it's empty but ready for future configurations.
import { beforeAll, afterAll } from 'vitest';
// mock console.log globally
beforeAll(() => {
  global.console = {
    ...global.console,
    log: () => {}, // Mock console.log to prevent cluttering test output
    warn: () => {}, // Mock console.log to prevent cluttering test output
  };
});
afterAll(() => {
  global.console = console; // Restore original console after tests
});

