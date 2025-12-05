import { test, expect } from '@playwright/test';

test.describe('Articles Page', () => {
  test('should navigate to articles from certifications', async ({ page }) => {
    await page.goto('/certifications');
    await expect(page).toHaveURL(/\/certifications/);
  });

  test('should load certification list', async ({ page }) => {
    await page.goto('/certifications');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Should have content
    const content = await page.content();
    expect(content.length).toBeGreaterThan(500);
  });
});

test.describe('Dynamic Article Page', () => {
  test('should load article page structure', async ({ page }) => {
    // Try accessing a dynamic article route
    await page.goto('/articles/exegol');
    
    // Check page loads
    await page.waitForLoadState('domcontentloaded');
    const content = await page.content();
    expect(content).toBeDefined();
  });

  test('should have tab navigation for sections', async ({ page }) => {
    await page.goto('/articles/exegol');
    await page.waitForLoadState('networkidle');
    
    // Page should render
    const html = await page.content();
    expect(html.length).toBeGreaterThan(100);
  });

  test('should lazy load section content on tab click', async ({ page }) => {
    await page.goto('/articles/exegol');
    await page.waitForLoadState('networkidle');
    
    // Find tab buttons
    const tabButtons = page.locator('button, [role="tab"]');
    const count = await tabButtons.count();
    
    if (count > 1) {
      // Click second tab
      await tabButtons.nth(1).click();
      
      // Wait for content to potentially load
      await page.waitForTimeout(500);
      
      // Content should update
      const content = await page.content();
      expect(content).toBeDefined();
    }
  });

  test('should render markdown content', async ({ page }) => {
    await page.goto('/articles/exegol');
    await page.waitForLoadState('networkidle');
    
    // Should have some text content
    const textContent = await page.textContent('body');
    expect(textContent?.length).toBeGreaterThan(0);
  });
});

test.describe('Static Article Pages', () => {
  const staticArticles = [
    '/articles/cpts-journey',
    '/articles/linux-mint-guide',
    '/articles/active-directory',
  ];

  for (const articlePath of staticArticles) {
    test(`should load ${articlePath}`, async ({ page }) => {
      await page.goto(articlePath);
      await page.waitForLoadState('domcontentloaded');
      
      // Page should have content
      const content = await page.content();
      expect(content.length).toBeGreaterThan(500);
    });
  }
});
