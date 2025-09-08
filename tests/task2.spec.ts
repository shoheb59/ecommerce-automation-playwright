import { test, expect } from "@playwright/test";
import registrationData from "../fixtures/user_registration.json";

test("Register user and check duplicate email error", async ({ request }) => {

  const random4Digit = Math.floor(1000 + Math.random() * 9000);
  const email = `hasnat${random4Digit}@yopmail.com`;
  const password = "12345";

  const data = {
    ...registrationData,
    email,
    password,
  };

  const firstResponse = await request.post(
    "https://automationexercise.com/api/createAccount",
    { form: data }
  );

  const firstBody = await firstResponse.json();
  console.log("First Response:", firstBody);

  expect(firstBody.responseCode).toBe(201);
  expect(firstBody.message).toContain("User created!");

  const secondResponse = await request.post(
    "https://automationexercise.com/api/createAccount",
    { form: data }
  );

  const secondBody = await secondResponse.json();
  console.log("Second Response:", secondBody);

  expect(secondBody.responseCode).toBe(400);
  expect(secondBody.message).toContain("Email already exists!");
});
