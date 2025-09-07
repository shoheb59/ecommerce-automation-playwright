import { Page, expect, Locator } from "@playwright/test";

export class ProductPage {
    readonly products:Locator;
  constructor(private page: Page) {
    this.page = page;
    this.products = page.locator(".single-products");
  }


  async selectCategory(categoryIndex: number, subCategory: string) {
    await this.page.locator('[data-toggle="collapse"]').nth(categoryIndex).click();
    await this.page.locator(`//*[text() ="${subCategory} "]`).first().click();
  }

  async addFirstProductToCart() {
    const count = await this.products.count();
    if (count === 0) throw new Error("❌ No products found");

    await this.products.first().locator(".btn.btn-default.add-to-cart").first().click();
    await expect(this.page.locator("#cartModal")).toBeVisible();
    await this.page.locator('[data-dismiss="modal"]').click();
  }
}
