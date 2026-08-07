import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@hub/auth': path.resolve(__dirname, './packages/auth/src/index.ts'),
      '@hub/config': path.resolve(__dirname, './packages/config/feature-flags.ts'),
      '@hub/constants': path.resolve(__dirname, './packages/constants/src/index.ts'),
      '@hub/contracts': path.resolve(__dirname, './packages/contracts/src/index.ts'),
      '@hub/database': path.resolve(__dirname, './packages/database/src/index.ts'),
      '@hub/events': path.resolve(__dirname, './packages/events/src/index.ts'),
      '@hub/logger': path.resolve(__dirname, './packages/logger/src/index.ts'),
      '@hub/telemetry': path.resolve(__dirname, './packages/telemetry/src/index.ts'),
      '@hub/types': path.resolve(__dirname, './packages/types/src/index.ts'),
      '@hub/ui': path.resolve(__dirname, './packages/ui/src/index.tsx'),
      '@hub/utils': path.resolve(__dirname, './packages/utils/src/index.ts'),
    },
  },
});
