import { test, expect } from '@playwright/test';

test('initial page', async ({ page }) => {
  await page.goto('http://localhost:5173/casino-reviews.html');

  // Wait till loading skeleton disappears.
  await page.waitForSelector('.loading-skeleton', { state: 'hidden' });

  // Take a screenshot.
  const screenshot = await page.screenshot();

  // Compare screenshot with expected result.
  await expect(screenshot).toMatchSnapshot('initial-page.png');
});

test('show popup', async ({ page }) => {
  await page.goto('http://localhost:5173/casino-reviews.html');

  // Wait till loading skeleton disappears.
  await page.waitForSelector('.loading-skeleton', { state: 'hidden' });

  // Click the first .badge inside the first .casino-card component.
  const firstBadge = await page.locator('.casino-card .badges > div').first();
  await firstBadge.click();

  // Take a screenshot.
  const screenshot = await page.screenshot();

  // Compare screenshot with expected result.
  await expect(screenshot).toMatchSnapshot('show-popup.png');
});

test('code copied', async ({ page }) => {
  await page.goto('http://localhost:5173/casino-reviews.html');

  // Wait till loading skeleton disappears.
  await page.waitForSelector('.loading-skeleton', { state: 'hidden' });

  // Click the first .badge inside the first .casino-card component.
  const firstBadge = await page.locator('.casino-card .badges > div').first();
  await firstBadge.click();

  // Click the .code inside the popup that appeared.
  const code = await page.locator('.dialog .code');
  await code.click();

  // Check the clipboard it should contain word "WELCOME".
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('WELCOME');

  // Take a screenshot.
  const screenshot = await page.screenshot();

  // Compare screenshot with expected result.
  await expect(screenshot).toMatchSnapshot('code-copied.png');
});
