---
name: test-scaffold
description: "Generate test boilerplate for components, API routes, and utilities. Use this skill when the user wants to add tests, create test files, set up testing infrastructure, generate unit/integration/e2e tests, or needs test scaffolding for their code. Triggers on: write tests, add tests, test file, unit test, integration test, e2e test, testing setup, Jest, Vitest, Playwright, Cypress, pytest, test scaffold, test coverage, describe block, test suite."
---

# Test Scaffolder

Generate test boilerplate for components, API routes, and utility functions.

## Supported Test Runners

Detect from project config, or ask:
- **Vitest** (default for Vite projects)
- **Jest** (default for CRA, general Node.js)
- **Playwright** (e2e)
- **Cypress** (e2e)
- **pytest** (Python)
- **unittest** (Python)

## Process

1. **Read the source file(s)** the user wants tests for
2. **Identify testable units** — exports, components, endpoints, functions
3. **Generate test file** with meaningful test cases
4. **Place test file** following the project's convention (co-located or in `__tests__/`)

## Test File Placement

Detect the project's convention:
- **Co-located**: `Button.test.tsx` next to `Button.tsx`
- **Test directory**: `__tests__/Button.test.tsx` or `tests/test_button.py`
- If no convention exists, default to co-located for components and a `tests/` directory for backend code.

## Test Generation by Type

### Component Tests (React/Vue)
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => { ... });
  it('calls onClick when clicked', () => { ... });
  it('is disabled when disabled prop is true', () => { ... });
  it('renders the correct variant styles', () => { ... });
  // Accessibility
  it('has correct role and aria attributes', () => { ... });
  it('is focusable via keyboard', () => { ... });
});
```

Test: rendering, props, events, states (loading, disabled, error), accessibility.
Use `@testing-library/*` — test behavior, not implementation details.

### API Route / Controller Tests
```typescript
import request from 'supertest';
import { app } from '../app';

describe('POST /api/users', () => {
  it('creates a user with valid data', async () => { ... });
  it('returns 400 for invalid email', async () => { ... });
  it('returns 409 for duplicate email', async () => { ... });
  it('returns 401 without auth token', async () => { ... });
});
```

Test: happy path, validation errors, auth, not found, edge cases.
Mock database/external services. Test HTTP status codes and response shapes.

### Utility Function Tests
```typescript
describe('formatCurrency', () => {
  it('formats USD correctly', () => { ... });
  it('handles zero', () => { ... });
  it('handles negative values', () => { ... });
  it('rounds to 2 decimal places', () => { ... });
  // Edge cases
  it('handles very large numbers', () => { ... });
  it('throws on non-numeric input', () => { ... });
});
```

Test: normal cases, edge cases, error cases, boundary values.

### E2E Tests (Playwright/Cypress)
```typescript
test('user can sign up and log in', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'securepassword');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

Test: critical user flows end-to-end. Keep these focused on high-value paths.

## Test Quality Guidelines

- **Test behavior, not implementation** — don't test internal state or private methods
- **One assertion per concept** — each `it` block tests one thing (can have multiple `expect` if they verify the same behavior)
- **Descriptive names** — `it('returns 404 when user does not exist')` not `it('test 3')`
- **Arrange-Act-Assert** pattern in each test
- **Mock external dependencies** (APIs, databases, file system) but don't mock the thing being tested
- **Include edge cases** — empty inputs, null, undefined, boundary values, error states
- **No test interdependence** — each test runs independently, setup/teardown in beforeEach/afterEach

## Output

- Test file(s) with comprehensive test cases
- Any needed test utilities (custom render wrapper, mock factories)
- If testing infrastructure doesn't exist yet, offer to set it up (install deps, config file)

## Static Site (No Build Tool) Testing — Kay's Originals

For vanilla HTML/CSS/JS projects without npm/webpack, standard test runners (Jest, Vitest) need special setup. Here are the recommended approaches:

### Option 1: Browser-Based Unit Tests (No Dependencies)

Create a `tests/test-runner.html` that loads `data.js` and runs assertions:

```html
<script src="../js/data.js"></script>
<script>
var passed = 0, failed = 0;

function assert(condition, message) {
  if (condition) { passed++; console.log('PASS: ' + message); }
  else { failed++; console.error('FAIL: ' + message); }
}

// KaysData function tests
assert(typeof KaysData.getArtist === 'function', 'getArtist exists');
assert(KaysData.getArtist('artist-1').name, 'getArtist returns artist with name');
assert(KaysData.getArtworksByCategory('painting').length > 0, 'paintings exist');
assert(!KaysData.getArtist('nonexistent'), 'nonexistent artist returns falsy');

console.log('Results: ' + passed + ' passed, ' + failed + ' failed');
</script>
```

### Option 2: Playwright E2E Tests (Recommended for Full Testing)

Use `playwright-cli` (already available) for end-to-end tests:

```bash
# Start a local server first
npx serve . -p 3000

# Then run test flows
playwright-cli open http://localhost:3000
playwright-cli snapshot
# ... interact and verify
```

### KaysData Unit Test Cases

| Function | Test Cases |
|----------|-----------|
| `getArtist(id)` | Valid ID returns object, invalid ID returns undefined, returns correct fields |
| `getArtwork(id)` | Valid ID returns object, invalid ID returns undefined |
| `getArtworksByArtist(artistId)` | Returns array, correct count, empty for invalid ID |
| `getArtworksByCategory(cat)` | Returns paintings/sculptures/sketches, empty for invalid category |
| `searchArtworks(query)` | Matches title, matches artist name, empty for no match, case-insensitive |
| `getArtistList()` | Returns all artists, each has required fields |

### E2E Test Scenarios

| Flow | Steps |
|------|-------|
| Hero slideshow | Load homepage → verify first slide visible → wait 10s → verify slide changed |
| Gallery filter | Load gallery → click "Paintings" → verify only paintings shown → click "All" → verify all restored |
| Artist search | Load gallery → type in search → verify filtered results → clear → verify all restored |
| Lightbox | Load artwork detail → click image → verify overlay visible → press Escape → verify closed |
| Hamburger menu | Resize to mobile → click hamburger → verify nav visible → click link → verify navigation |
| Contact form | Load contact → submit empty → verify errors → fill fields → verify errors clear |
| Navigation | Load homepage → click each nav link → verify correct page loads |
