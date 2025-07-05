import { defineConfig, devices } from '@playwright/experimental-ct-react';
import path from 'path';

export default defineConfig({
  testDir: './tests/components',
  snapshotDir: './__snapshots__',
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    ctViteConfig: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './'),
        },
      },
    },
    trace: 'on-first-retry',
    ctPort: 3100,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
