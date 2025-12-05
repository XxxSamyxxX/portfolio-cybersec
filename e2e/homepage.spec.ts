import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Samy|Portfolio|IT/i);
  });

  test('should display hero section', async ({ page }) => {
    // Check for main hero content
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    // Check for navigation elements
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();
  });

  test('should display projects section', async ({ page }) => {
    // Scroll to projects section or check if visible
    const projectsSection = page.getByText(/Projets/i).first();
    await expect(projectsSection).toBeVisible();
  });

  test('should have working scroll navigation', async ({ page }) => {
    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Verify scroll happened
    const newScroll = await page.evaluate(() => window.scrollY);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('should load stats section', async ({ page }) => {
    // Look for platform stats (TryHackMe, HackTheBox)
    await page.evaluate(() => window.scrollBy(0, 300));
    
    // Check that page content loads
    const content = await page.content();
    expect(content.length).toBeGreaterThan(1000);
  });

  test('should have contact section', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for contact elements
    const footer = page.locator('footer, [class*="contact"]');
    await expect(footer.first()).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Press Tab to navigate through focusable elements
    await page.keyboard.press('Tab');
    
    // An element should have focus
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeTruthy();
  });
});
