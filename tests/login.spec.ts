import { test, expect } from "@playwright/test";
import credentials from "../fixtures/login_datadriven.json";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

// Types
type Credential = { email: string; password: string };

const validCreds: Credential[] = credentials.valid;
const invalidCreds: Credential[] = credentials.invalid;

//Tests for valid credentials
test.describe("Login with VALID credentials", () => {

  for (const cred of validCreds) {
    test(`should login successfully with ${cred.email}`, async ({ page }) => {
      const home = new HomePage(page);
      const login = new LoginPage(page);

      await home.open();
      await home.goToLogin();
      await login.login(cred.email, cred.password);
      await login.verifyLogoutbuttonVisibility();
      await login.logout();
    });
  }
});

test.describe("Login with INVALID credentials", () => {
  for (const cred of invalidCreds) {
    test(`should fail to login with ${cred.email}`, async ({ page }) => {
      const home = new HomePage(page);
      const login = new LoginPage(page);

      await home.open();
      await home.goToLogin();
      await login.login(cred.email, cred.password);
      await login.verifyLoginErrorMessage();

    });
  }
});
