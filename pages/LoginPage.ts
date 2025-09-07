import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private emailInput = '[type="email"]';
  private passwordInput = '[type="password"]';
  private loginButton = '[data-qa="login-button"]';
  private logoutLink = 'a[href="/logout"]';

  async login(email: string, password: string) {
    await expect(this.page.locator(".login-form h2")).toHaveText("Login to your account");
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await expect(this.page.locator(this.logoutLink)).toBeVisible();
  }

  async logout() {
    await this.page.click(this.logoutLink);
    await expect(this.page).toHaveURL(/.*login/);
  }
}
