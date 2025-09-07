import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    await this.page.click(".btn-default.check_out");
    await expect(this.page).toHaveURL(/.*checkout/);
  }
}
