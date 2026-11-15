# Project Structure

```
moj-task-api-ui-tests/
│
├── fixtures/
│   ├── api-auth-fixture.ts         # API authentication placeholder
│   ├── ui-auth-fixture.ts          # UI authentication placeholder
│   └── orangehrm-page-fixture.ts   # Page objects and cookie handling
│
├── pages/
│   ├── orangehrm-demo-page.ts      # Demo page object
│   └── orangehrm-landing-page.ts   # Landing page object
│
├── test-data/
│   ├── api-create-user-data.ts     # API test data generator
│   └── ui-demo-data.ts             # UI demo form data generator
│
├── tests/
│   ├── api/
│   │   ├── happy/                  # Successful API scenarios
│   │   └── unhappy/                # Unsuccessful API scenarios
│   └── ui/
│       ├── happy/                  # Successful UI scenarios
│       └── unhappy/                # Unsuccessful UI scenarios
│
├── utils/
│   ├── ui-helpers.ts               # Common UI test helpers
│   ├── api-helpers.ts              # API test helpers
│   └── random-data.ts              # Random data helpers
│
├── .github/workflows/tests.yml     # CI and scheduled regression workflow
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── .nvmrc                          # Recommended Node.js version
├── .prettierrc.json                # Prettier configuration
├── eslint.config.js                # ESLint configuration
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked npm dependencies
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── README.md                       # Project documentation
└── STRUCTURE.md                    # This file
```

## Directory Purposes

### `fixtures/`

Shared test fixtures used across tests:

- API and UI authentication placeholders for future setup
- OrangeHRM page object initialization and cookie banner handling

### `pages/`

Page-specific classes for the OrangeHRM landing and demo pages.

### `test-data/`

Reusable Petstore user and UI demo form data generation.

### `tests/`

Organized by test type

- **api/**: Backend/API tests (.api.ts)
- **ui/**: User interface tests (.ui.ts)

### `utils/`

Common utility functions

- `ui-helpers.ts`: UI testing helpers (navigation, verify, click)
- `api-helpers.ts`: API response validation helpers
- `random-data.ts`: Random test data helpers

## File Naming Conventions

| Type | Suffix  | Purpose                     |
| ---- | ------- | --------------------------- |
| API  | .api.ts | Backend/API endpoint tests  |
| UI   | .ui.ts  | UI component and page tests |

## Quick Start

Run these commands from the repository root.

1. **Install dependencies:**

   ```bash
   npm install
   npx playwright install
   ```

2. **Setup environment:**

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Run tests:**
   ```bash
   npm test              # All tests
   npm run test:ui       # UI tests only
   npm run test:api      # API tests only
   ```

## Extending the Project

### Adding a New Page Object

1. Create `pages/my-page.ts`
2. Add page-specific selectors and methods
3. Add the page object to a fixture if it should be shared
4. Use the fixture in tests

### Adding a New Test Suite

1. Create test file with appropriate suffix (`.api.ts` or `.ui.ts`)
2. Import fixtures and helpers
3. Use `test.describe()` to organize tests
4. Add `@tags` for selective execution

### Adding Test Data

1. Add data generators to an appropriate file in `test-data/`
2. Export from that file
3. Import in tests as needed

### Adding Utilities

1. Create helpers in `utils/` (e.g., `pdf-helpers.ts`)
2. Export functions as classes or named exports
3. Import in tests or other utilities
