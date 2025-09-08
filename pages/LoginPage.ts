import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

 constructor(page) {
    super(page);
    this.page = page;
  }

  loginlocators = {
    emailInput: '[type="email"]',
    passwordInput: '[type="password"]',
    loginButton: '[data-qa="login-button"]',
    logoutLink: 'a[href="/logout"]',
    loginTextlabel: ".login-form h2",
    logoutButton: 'text="Logout"',
    loginErrorMessage: "//*[text()='Your email or password is incorrect!']",

  }

  async login(email: string, password: string) {
    await expect(this.page.locator(this.loginlocators.loginTextlabel)).toHaveText("Login to your account");
    await this.page.fill(this.loginlocators.emailInput, email);
    await this.page.fill(this.loginlocators.passwordInput, password);
    await this.page.click(this.loginlocators.loginButton);
  }

  async verifyLogoutbuttonVisibility() {
     await expect(this.page.locator(this.loginlocators.logoutButton)).toBeVisible();

  }

  async verifyLoginErrorMessage() {
    await expect(this.page.locator(this.loginlocators.loginErrorMessage)).toBeVisible();

  }

  async logout() {
    await this.page.click(this.loginlocators.logoutLink);
    await expect(this.page).toHaveURL(/.*login/);
  }
}
