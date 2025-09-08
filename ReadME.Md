# Playwright Automation Tests

This repository contains end-to-end tests for AutomationExercise using Playwright.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/automationexercise-playwright.git
   cd automationexercise-playwright
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**:
   ```bash
   npx playwright install
   ```

4. **Run Tests**:
   - To run all tests:
     ```bash
     npm run test
     ```
   - To run specific tests (e.g., registration and cart):
     ```bash
     npm run test:reg-cart
     ```
   - To run tests in headed mode:
     ```bash
     npm run test -- --headed
     ```

5. **View Reports**:
   - After running tests, open the HTML report:
     ```bash
     npm run test:report
     ```

## Available Scripts

- `npm run test` – Run all tests
- `npm run test:report` – Run tests and generate an HTML report
- `npm run test:headed` – Run tests in headed mode (with browser UI)
- `npm run test:reg-cart` – Run registration API + cart tests
- `npm run test:reg-login-cart` – Run registration API + login + cart tests

## CI/CD

This project uses GitHub Actions for CI/CD. Each push to the main branch triggers:

- Install dependencies
- Run Playwright tests on Chromium and Firefox
- Save artifacts: HTML report, screenshots/trace files for failed tests, and invoice files

### CI/CD Status

![CI/CD Status](https://github.com/shoheb59/ecommerce-automation-playwright/actions/workflows/playwright-ci.yml/badge.svg)

[View Latest CI/CD Run](https://github.com/shoheb59/ecommerce-automation-playwright/actions)

## Test Data

- **User Credentials**: Stored in `fixtures/user_credentials.json`
- **Registration Data**: Stored in `fixtures/user_registration.json`
- **Payment Details**: Stored in `fixtures/payment_data.json`
- **Login Scenarios**: Valid and invalid login scenarios are supported

## Retry Logic and Known Limitations

- **Retry Logic**: Flaky tests are retried up to 2 times by default (configured in `playwright.config.ts`).
- **Known Limitations**:
  - Test execution may fail if the demo site is down.
  - Ensure the test data matches the environment setup.

## Parallel and Multi-Browser Execution

- **Run Tests in Chromium Only**:
  ```bash
  npx playwright test --browser=chromium
  ```

- **Run Tests in Firefox Only**:
  ```bash
  npx playwright test --browser=firefox
  ```

- **Run Tests in Headed Mode**:
  ```bash
  npm run test:headed
  ```

- **Run Tests with Multiple Workers in Parallel**:
  ```bash
  npx playwright test --workers=4 --browser=chromium
  ```

## Artifacts

- Test results and reports are stored in the `playwright-report/` and `test-results/` folders.
- Downloadable artifacts are available in the CI/CD pipeline runs.
