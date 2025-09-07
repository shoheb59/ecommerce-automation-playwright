import { Page, expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

export class CheckoutPage {
  constructor(private page: Page) {}

  async placeOrder() {
    await this.page.fill('[name="message"]', "Please deliver between 10 AM to 5 PM");
    await this.page.click(".btn.btn-default.check_out");
    await expect(this.page).toHaveURL(/.*payment/);

    await this.page.fill('[name="name_on_card"]', "Test User");
    await this.page.fill('[name="card_number"]', "1234567890123456");
    await this.page.fill('[name="cvc"]', "123");
    await this.page.fill('[name="expiry_month"]', "12");
    await this.page.fill('[name="expiry_year"]', "2025");
    await this.page.click("#submit");

    await expect(this.page.locator('[data-qa="order-placed"]')).toContainText("Order Placed!");
  }

  async downloadInvoice(projectPath: string) {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(".btn-default.check_out"),
    ]);

    const savePath = path.join(projectPath, "downloads", "invoice.pdf");
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    await download.saveAs(savePath);

    return savePath;
  }
}
