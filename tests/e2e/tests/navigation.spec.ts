import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigation between pages', async ({ page }) => {
    // Check if we are on homepage
    await expect(page).toHaveURL('/');

    // Navigate to articles page
    await page.click('a[href="/articles"]');
    await expect(page).toHaveURL('/articles');

    // Return to homepage
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });

  test('should allow navigation to article details', async ({ page }) => {
    // Navigate to articles page
    await page.click('a[href="/articles"]');

    // Click on first article link
    await page.click('[data-testid="article-link-1"]');

    // Check if URL contains article ID
    await expect(page).toHaveURL(/\/articles\/\d+/);

    // Check if article details are visible
    await expect(page.locator('[data-testid="article-details"]')).toBeVisible();
  });
});
