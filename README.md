# API and UI Tests

Playwright-based API and UI tests.

## Project Structure

```
moj-task-api-ui-tests/
  fixtures/       Shared test fixtures (auth, page objects, setup)
  pages/          Page object models
  test-data/      Reusable test data
  tests/
    api/          API test suites
    ui/           UI test suites
  utils/          Common helpers and utilities
```

## Quick Start

### Prerequisites

- Node.js 20.19+ (20.x), 22.13+ (22.x), or a supported newer LTS
- npm 10 or newer
- Java, for Allure reports

### Setup

Run these commands from the repository root. First, use Node.js 22; with `nvm`,
run `nvm install` and `nvm use`.

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Create `.env`: `cp .env.example .env`
4. Set `ORANGEHRM_BASE_URL` and `PETSTORE_BASE_URL` in `.env`

If you don't use `nvm`, install a supported Node.js version from
https://nodejs.org/en/download.

### Run Tests

Run these commands from the repository root:

```bash
# All tests or tests by project
npm test
npm run test:ui
npm run test:api

# Specific file
npm run test:ui -- tests/ui/happy/demo.happy.ui.ts

# Petstore create-user API test (no authentication needed)
npm run test:api -- tests/api/happy/create-user.happy.api.ts

# Test tags and reports
npm run test:api -- --grep @smoke
npm run test:ui -- --grep @create-demo
npm run allure:serve

# With options
npm run test:headed       # Show browser
npm run test:debug        # Debug mode
npm run test:ui:interactive # Playwright UI mode for UI tests

# Code checks
npm run lint
npm run build             # Type-check
```

### Optional cross-browser UI tests

The default test run uses Chromium for UI tests. To run the UI tests in Firefox
or Microsoft Edge, install Firefox and ensure Microsoft Edge is installed:

```bash
npx playwright install firefox
npm run test:ui:firefox
npm run test:ui:edge
# Run both browsers
CROSS_BROWSER=1 npx playwright test --project=ui-firefox --project=ui-edge
```

The combined command does not run the report-cleaning scripts; existing Allure
results may be included in the next report.

Test scripts clean `allure-results`, `allure-report`, `test-results`, and
`playwright-report` before running. Save any reports you need first.
Test results are listed in the terminal; Allure is the only file-based report.
Playwright failure artifacts are stored in a temporary directory, not in the
project's `test-results` folder. These temporary artifacts are not removed by
the report-cleaning scripts.
`@smoke` covers essential journeys; `@regression` covers broader scenarios.
`@create-demo` selects demo-form UI tests, and `@create-user` selects Petstore
user API tests. The demo-form tests do not create a real demo request.
Tests marked `test.fixme` are skipped until implemented. UI tests use `ORANGEHRM_BASE_URL`
from `.env`, fill the demo form with generated fictional data, and do not solve
CAPTCHA or submit a real demo request.

GitHub Actions runs the API and UI tests on pull requests and manual triggers
using the public URLs in `.env.example`. The workflow uploads Allure results
and, on failure, Playwright artifacts. Both services must be reachable for the tests.
The `@regression` tests are also scheduled for weekdays at 7:00 am UK time,
using the default branch. GitHub may delay or drop scheduled runs.

The Petstore test reads `PETSTORE_BASE_URL` from `.env` (see `.env.example`),
creates a user with a random username suffix and verifies it with GET. It does
not delete the user afterward. The API fixture currently re-exports Playwright's `test` and
`expect`; token setup and teardown can be added if authentication is needed later.

The test user is generated in `test-data/api-create-user-data.ts` using Faker for names,
an `example.com` email and a random password. Its ID combines the current
timestamp (date and time) with an in-process counter to avoid repeated IDs; the
name-based username has a random suffix to reduce collisions. IDs can still
repeat across process restarts or parallel workers.
Fictional UK phone numbers do not repeat within a process; the generator reports
an error after all 1,000 reserved numbers are used. Numbers may repeat across
processes or restarts.
`.env` is better suited to configuration and real credentials than disposable
test data. Neither a helper nor `.env` hides values from the API request or its
recipient. Never send real credentials to this public demo API.

## Test Naming Conventions

- **API tests**: `.api.ts`
- **UI tests**: `.ui.ts`

TypeScript aliases such as `@utils/`, `@fixtures/` and `@test-data/` are defined
in `tsconfig.json` and can be used in Playwright tests.

## Key Files

- [fixtures/](./fixtures/) - Shared test fixtures
- [pages/](./pages/) - Page object models
- [test-data/](./test-data/) - Test data generators
- [utils/](./utils/) - Helper utilities
- [playwright.config.ts](./playwright.config.ts) - Playwright configuration
