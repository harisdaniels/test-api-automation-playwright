# Simple Books API - Playwright API Tests

![Playwright API Tests](https://github.com/harisdaniels/test-api-automation-playwright/actions/workflows/playwright-api.yml/badge.svg)

API test automation for Simple Books API (https://simple-books-api.click), built with Playwright Test and TypeScript. This project replaces an earlier Mocha + Chai suite.

## Prerequisites

- Node.js 22 (LTS) or newer
- npm

## Setup

    npm install
    cp .env.example .env

Edit .env and set:

    API_BASE_URL=https://simple-books-api.click
    API_TIMEOUT_MS=15000

.env is git-ignored. Never commit real credentials.

## Running tests

    npx playwright test                    # all tests
    npx playwright test --grep @smoke      # smoke tests only
    npx playwright test --grep @negative   # negative tests only
    npx playwright show-report             # open the HTML report

Reports are written to:
- playwright-report/ (HTML)
- reports/junit.xml (JUnit, for CI)

## Architecture

Tests describe WHAT is verified. The layers below handle HOW requests are sent.

    tests/          -> scenarios: what is being tested
      fixtures.ts   -> setup and teardown, tokens, ready-to-use objects
    clients/        -> one class per resource (OrdersApi, BooksApi)
    core/           -> HTTP wrapper: headers, bearer token, timeout
    config/         -> reads environment variables
    data/           -> payload factories and random test data
    schema/         -> response contracts (zod)

Dependencies flow in one direction:

    tests -> fixtures -> clients -> core -> config

Lower layers must not import from higher ones. data/ and schema/ can be used from any layer.

## Project structure

    config/settings.ts          environment settings
    core/apiClient.ts           HTTP wrapper with optional bearer token
    clients/ordersApi.ts        orders endpoints
    clients/booksApi.ts         books endpoints
    data/factories.ts           payloads and random data
    schema/orderResponse.ts     zod schemas for order responses
    tests/fixtures.ts           custom Playwright fixtures
    tests/orders/               order tests
    tests/books/                book tests
    tests/main-page.spec.ts     health and welcome endpoints

## Conventions

- Fixtures decide auth. Use anonApi for public endpoints and negative auth tests. Use api for endpoints that require a token.
- Each test creates its own data. Use createdOrder for an order that must exist, and books.findBookById() to find a book that is available or unavailable. Never depend on data left by other tests.
- Tests never call request directly. Go through a client class.
- Test names describe behavior. Example: "rejects order for a book that is not available".
- Tags describe the purpose of a test:
  - @smoke: quick checks that should pass after every deploy
  - @positive: expected behavior with valid input
  - @negative: invalid input, missing auth, or not-found cases
- Assertions check status and body. For writes, also verify the change persisted (for example, GET after PATCH).

## Continuous integration

The workflow .github/workflows/playwright-api.yml runs manually from the Actions tab (workflow_dispatch).

To run it:
1. Go to Actions -> Playwright API Tests -> Run workflow.
2. When it finishes, open the run and download the playwright-reports artifact.

The base URL comes from the repository variable API_BASE_URL (Settings -> Secrets and variables -> Actions -> Variables), not from .env. Make sure it is set before the first run.
