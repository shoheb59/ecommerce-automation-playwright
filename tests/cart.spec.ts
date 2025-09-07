import { test, expect } from "@playwright/test";
import cred from "../fixtures/user_credentials.json";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { fileExists, fileSize } from "../utils/helper";

const projectPath = process.cwd();

test("Add two products and complete checkout", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await home.open();
  await home.goToLogin();
  await login.login(cred.email, cred.password);

  await home.goToProducts();
  await product.selectCategory(0, "Dress");
  await product.addFirstProductToCart();

  await product.selectCategory(1, "Tshirts");
  await product.addFirstProductToCart();

  await home.goToCart();
  await cart.proceedToCheckout();

  await checkout.placeOrder();

  const invoicePath = await checkout.downloadInvoice(projectPath);
  expect(fileExists(invoicePath)).toBeTruthy();
  expect(fileSize(invoicePath)).toBeGreaterThan(0);
});
