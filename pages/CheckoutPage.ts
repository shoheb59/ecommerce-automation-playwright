import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import paymentData from "../fixtures/payment_data.json";
import * as path from "path";
import * as fs from "fs";

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  weblocators = {
    messageTextArea: '[name="message"]',
    placeOrderButton: ".btn.btn-default.check_out",
    nameOnCardInput: '[name="name_on_card"]',
    cardNumberInput: '[name="card_number"]',
    cvcInput: '[name="cvc"]',
    expiryMonthInput: '[name="expiry_month"]',
    expiryYearInput: '[name="expiry_year"]',
    submitButton: "#submit",
    orderPlacedMessage: '[data-qa="order-placed"]',
    downloadInvoiceButton: ".btn.btn-default.check_out",
  }

  async placeOrder() {
    await this.page.fill(this.weblocators.messageTextArea, paymentData.orderMessage);
    await this.page.click(this.weblocators.placeOrderButton);
    await expect(this.page).toHaveURL(/.*payment/);

    await this.page.fill(this.weblocators.nameOnCardInput, paymentData.nameOnCard);
    await this.page.fill(this.weblocators.cardNumberInput, paymentData.cardNumber);
    await this.page.fill(this.weblocators.cvcInput, paymentData.cvc);
    await this.page.fill(this.weblocators.expiryMonthInput, paymentData.expiryMonth);
    await this.page.fill(this.weblocators.expiryYearInput, paymentData.expiryYear);
    await this.page.click(this.weblocators.submitButton);

    await expect(this.page.locator(this.weblocators.orderPlacedMessage)).toHaveText("Order Placed!");
  }

  async downloadInvoice(projectPath: string) {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(this.weblocators.downloadInvoiceButton),
    ]);

    const savePath = path.join(projectPath, "downloads", "invoice.txt");
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    await download.saveAs(savePath);

    return savePath;
  }
}
