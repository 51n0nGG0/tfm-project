import { expect, test } from "@playwright/test";
import AxeBuilder from '@axe-core/playwright';

test("Add-in E2E Test", async ({ page }) => {

  await page.goto("https://outlook.live.com/");

  await page.waitForURL(new RegExp("^https://outlook.live.com/mail/"));

  expect(page.getByLabel("Go to Outlook")).toBeDefined();

  await page.getByRole('main').waitFor();

  await page.locator('[id="AQAAAEYN3RkBAAAASmgM5gAAAAA="]').click();

  await page.getByRole('button', { name: 'Más acciones' }).click();

  await page.getByRole('menuitem', { name: 'Aplicaciones' }).click();

  await page.getByLabel('TFM Add-in').click();
  
  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByText("Analizar un correo ahora").click();
  const loginPopupPromise = page.waitForEvent('popup');
  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Permitir' }).click();
  const loginPopup = await loginPopupPromise;

  await loginPopup.getByRole('checkbox', { name: 'Acepto y estoy de acuerdo con' }).check();
  await loginPopup.getByRole('button', { name: 'Autorizar' }).click();

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Analizar correo' }).click();

  await expect(page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByLabel('Phishing. Gauge chart with 2')).toContainText('Phishing');
  await expect(page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByLabel('BEC. Gauge chart with 2')).toContainText('BEC');
  await expect(page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByLabel('ISE. Gauge chart with 2')).toContainText('ISE');

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Icono de usuario de la cuenta' }).click();
  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Cerrar sesión' }).click();
  const logoutPopupPromise = page.waitForEvent('popup');
  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Permitir' }).click();
  const logoutPopup = await logoutPopupPromise;

  await logoutPopup.locator('[data-test-id="eloyschmidtrodriguez@hotmail.com"]').click();

});

test('Add-in Accesibility Test', async ({ page }, testInfo) => {
  await page.goto("https://outlook.live.com/");

  await page.waitForURL(new RegExp("^https://outlook.live.com/mail/"));

  expect(page.getByLabel("Go to Outlook")).toBeDefined();

  await page.getByRole('main').waitFor();

  await page.locator('[id="AQAAAEYN3RkBAAAASmgM5gAAAAA="]').click();

  await page.getByRole('button', { name: 'Más acciones' }).click();

  await page.getByRole('menuitem', { name: 'Aplicaciones' }).click();

  await page.getByLabel('TFM Add-in').click();

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByText("Analizar un correo ahora").waitFor();

  const accessibilityScanResultsBeforeLogin = await new AxeBuilder({ page })
  .include('iframe[title="Complemento de Office TFM Add-in"]')
  .disableRules('aria-hidden-focus')
  .analyze();

  await testInfo.attach('accessibility-scan-results-before-login', {
    body: JSON.stringify(accessibilityScanResultsBeforeLogin, null, 2),
    contentType: 'application/json'
  });

  expect(accessibilityScanResultsBeforeLogin.violations).toEqual([]);

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByText("Analizar un correo ahora").click();
  const loginPopupPromise = page.waitForEvent('popup');
  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Permitir' }).click();
  const loginPopup = await loginPopupPromise;

  await loginPopup.getByRole('checkbox', { name: 'Acepto y estoy de acuerdo con' }).check();
  await loginPopup.getByRole('button', { name: 'Autorizar' }).click();

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Analizar correo' }).waitFor();

  const accessibilityScanResultsAfterLogin = await new AxeBuilder({ page })
  .include('iframe[title="Complemento de Office TFM Add-in"]')
  .disableRules('aria-hidden-focus')
  .analyze();

  await testInfo.attach('accessibility-scan-results-after-login', {
    body: JSON.stringify(accessibilityScanResultsAfterLogin, null, 2),
    contentType: 'application/json'
  });

  expect(accessibilityScanResultsAfterLogin.violations).toEqual([]);

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('button', { name: 'Analizar correo' }).click();

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByLabel('Phishing. Gauge chart with 2').waitFor();

  const accessibilityScanResultsAfterAnalysis = await new AxeBuilder({ page })
  .include('iframe[title="Complemento de Office TFM Add-in"]')
  .disableRules('aria-hidden-focus')
  .analyze();

  await testInfo.attach('accessibility-scan-results-after-analysis', {
    body: JSON.stringify(accessibilityScanResultsAfterAnalysis, null, 2),
    contentType: 'application/json'
  });

  expect(accessibilityScanResultsAfterAnalysis.violations).toEqual([]);

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByRole('tab', { name: 'Other Messages' }).click();

  await page.locator('iframe[title="Complemento de Office TFM Add-in"]').contentFrame().getByText('EEloy Alfredo Schmidt Rodríguez<eloyschmidtrodriguez@hotmail.com>Phishing').waitFor();

  const accessibilityScanResultsAfterOtherMessages = await new AxeBuilder({ page })
  .include('iframe[title="Complemento de Office TFM Add-in"]')
  .disableRules('aria-hidden-focus')
  .analyze();

  await testInfo.attach('accessibility-scan-results-after-other-messages', {
    body: JSON.stringify(accessibilityScanResultsAfterOtherMessages, null, 2),
    contentType: 'application/json'
  });

  expect(accessibilityScanResultsAfterOtherMessages.violations).toEqual([]);
});