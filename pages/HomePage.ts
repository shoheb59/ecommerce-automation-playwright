import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

  constructor(page) {
    super(page);
    this.page = page;
  }

  weblocators = {
    loginSignupLink: 'a[href="/login"]',
    productsLink: 'a[href="/products"]',
    cartLink: 'a[href="/view_cart"]',
  }
  

  async open() {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async goToLogin() {
    await this.page.click(this.weblocators.loginSignupLink);
  }

  async goToProducts() {
    await this.page.click(this.weblocators.productsLink);
    await expect(this.page).toHaveURL(/.*products/);
  }

  async goToCart() {
    await this.page.click(this.weblocators.cartLink);
    await expect(this.page).toHaveURL(/.*view_cart/);
  }
}
