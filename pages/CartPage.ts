import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  weblocators = {
    proceedToCheckoutButton: ".btn-default.check_out",
  }

  async proceedToCheckout() {
    await this.page.click(this.weblocators.proceedToCheckoutButton);
    await expect(this.page).toHaveURL(/.*checkout/);
  }
}
