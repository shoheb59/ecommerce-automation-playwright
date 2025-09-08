import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { add } from "winston";

export class ProductPage extends BasePage {
   constructor(page) {
    super(page);
    this.page = page;
  }

  productlocators={
    productCategories:'[data-toggle="collapse"]',
    allProducts: '.single-products',
    addToCartButton: '.btn.btn-default.add-to-cart',
    cartModal: '#cartModal',
    continueShoppingButton: '[data-dismiss="modal"]',

    
  }

  getProductSubCategory(subCategory: string) {
  return this.page.locator(`//a[normalize-space(text())="${subCategory}"]`);
}

 


  async selectCategory(categoryIndex: number, subCategory: string) {
    await this.page.locator(this.productlocators.productCategories).nth(categoryIndex).click();
    await this.getProductSubCategory(subCategory).first().click();

  }

  async addFirstProductToCart() {
    const products= this.page.locator(this.productlocators.allProducts);
    const count = await products.count();
    if (count === 0) 
      throw new Error("No products found");

    await products.first().locator(this.productlocators.addToCartButton).first().click();
    await expect(this.page.locator(this.productlocators.cartModal)).toBeVisible();
    await this.page.locator(this.productlocators.continueShoppingButton).click();
  }
}
