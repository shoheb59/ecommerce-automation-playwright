import { test, expect } from "@playwright/test";
import * as fs from "fs";
import registrationData from "../fixtures/user_registration.json";

test("Register new user and save credentials", async ({ request }) => {
  const random4Digit = Math.floor(1000 + Math.random() * 9000);
  const email = `hasnat${random4Digit}@yopmail.com`;
  const password = "12345"; 

  const data = {
    ...registrationData,
    
    email,
    password,
   
  };

  const response = await request.post(
    "https://automationexercise.com/api/createAccount",
    { form: data }
  );

  console.log("Status:", response.status());
  console.log("Response:", await response.text());

  expect(response.ok()).toBeTruthy();

  if (response.status() === 200) {
    const credential = { email, password };

    const jsonData = { valid: [credential] };
    fs.writeFileSync("fixtures/user_credentials.json", JSON.stringify(jsonData, null, 2));

    console.log("Credentials saved to fixtures/user_credentials.json");
    console.log(`Email: ${email}, Password: ${password}`);
  }
});
