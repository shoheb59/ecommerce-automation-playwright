import { test } from "@playwright/test";
import cred from "../fixtures/user_credentials.json";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

test("Login and Logout Test", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  await home.open();
  await home.goToLogin();
  await login.login(cred.email, cred.password);
  await login.logout();
});
