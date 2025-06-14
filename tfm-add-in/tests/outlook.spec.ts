import { expect, test } from "@playwright/test";

test("should access outlook", async ({ page }) => {
  await page.goto("https://outlook.live.com/");

  await page.waitForURL(new RegExp("^https://outlook.live.com/mail/"));

  expect(page.getByLabel("Go to Outlook")).toBeDefined();
});

test("should open calendar view", async ({ page }) => {
  await page.goto("https://outlook.live.com/");

  await page.getByRole("button", { name: "Calendar" }).click();
  await page.waitForURL(new RegExp("^https://outlook.live.com/calendar/"));

  expect(page.getByRole("button", { name: "My calendars" })).toBeDefined();
});
