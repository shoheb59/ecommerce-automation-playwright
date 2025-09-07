import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async goToLogin() {
    await this.page.click('a[href="/login"]');
  }

  async goToProducts() {
    await this.page.click('a[href="/products"]');
    await expect(this.page).toHaveURL(/.*products/);
  }

  async goToCart() {
    await this.page.click('a[href="/view_cart"]');
    await expect(this.page).toHaveURL(/.*view_cart/);
  }
}
