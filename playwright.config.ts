import 'dotenv/config';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration
 * Customize as needed for your project
 */

export default defineConfig({
  testDir: './tests',
  outputDir: resolve(tmpdir(), `moj-task-api-ui-tests-${process.pid}`),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results', suiteTitle: false }],
  ],
  use: {
    baseURL: process.env.ORANGEHRM_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'ui-tests',
      testMatch: '**/*.ui.ts',
      use: { ...devices['chromium'] },
    },

    ...(process.env.CROSS_BROWSER === '1'
      ? [
          {
            name: 'ui-firefox',
            testMatch: '**/*.ui.ts',
            use: { ...devices['Desktop Firefox'] },
          },
          {
            name: 'ui-edge',
            testMatch: '**/*.ui.ts',
            use: { ...devices['Desktop Edge'], channel: 'msedge' },
          },
        ]
      : []),

    {
      name: 'api-tests',
      testMatch: '**/*.api.ts',
      use: { headless: true },
    },
  ],
});
