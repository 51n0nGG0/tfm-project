import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const username = process.env.OUTLOOK_USERNAME;

  if (!username) {
    console.error("Username is missing. See README.md how to set value");
    return;
  }

  const password = process.env.OUTLOOK_PASSWORD;
  if (!password) {
    console.error("Password is missing. See README.md how to set value");
    return;
  }

  // Go to login page
  await page.goto("https://login.live.com/");

  // Fill username
  await page.getByLabel("Email or phone number").fill(username);
  await page.getByRole("button", { name: "Next" }).click();

  // Insert password
  await page.getByLabel("Password").nth(0).fill(password);
  await page.getByRole("button", { name: "Next" }).click();

  // Answer "Stay signed in?"
  await page.getByRole("button", { name: "No" }).click();

  await page.context().storageState({ path: authFile });
});
