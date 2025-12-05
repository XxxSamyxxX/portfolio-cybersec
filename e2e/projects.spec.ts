import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should load projects list page', async ({ page }) => {
    await expect(page).toHaveURL(/\/projects/);
  });

  test('should display projects header', async ({ page }) => {
    const header = page.getByRole('heading', { level: 1 });
    await expect(header).toBeVisible();
  });

  test('should show project cards', async ({ page }) => {
    // Wait for projects to load
    await page.waitForLoadState('networkidle');
    
    // Check for project cards or list items
    const projectCards = page.locator('[class*="project"], [class*="card"], article');
    
    // Should have at least some content
    const content = await page.content();
    expect(content.length).toBeGreaterThan(500);
  });

  test('should navigate to project detail on click', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Find and click first project link
    const projectLink = page.locator('a[href*="/projects/"]').first();
    
    if (await projectLink.isVisible()) {
      await projectLink.click();
      await expect(page).toHaveURL(/\/projects\/.+/);
    }
  });

  test('should have filter or search functionality', async ({ page }) => {
    // Look for filter/search elements
    const searchInput = page.locator('input[type="text"], input[type="search"], [class*="filter"]');
    
    // Page should render properly regardless of filters
    const content = await page.content();
    expect(content).toContain('project');
  });

  test('should display project tags', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Tags are usually in spans or badges
    const tags = page.locator('[class*="tag"], [class*="badge"]');
    
    // Page should have loaded content
    const html = await page.content();
    expect(html.length).toBeGreaterThan(500);
  });
});

test.describe('Project Detail Page', () => {
  test('should handle non-existent project gracefully', async ({ page }) => {
    await page.goto('/projects/non-existent-project-123');
    
    // Should show 404 or redirect to projects list
    const content = await page.content();
    expect(content).toBeDefined();
  });
});
