import { test, expect } from '@playwright/test';

/**
 * Contact Page E2E Tests
 */

test.describe('Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Contact/);
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.getByLabel('Name')).toBeVisible();
		await expect(page.getByLabel('Email')).toBeVisible();
		await expect(page.getByLabel('Subject')).toBeVisible();
		await expect(page.getByLabel('Message')).toBeVisible();
	});

	test('should submit contact form', async ({ page }) => {
		await page.getByLabel('Name').fill('Test User');
		await page.getByLabel('Email').fill('test@example.com');
		await page.getByLabel('Subject').fill('Test Subject');
		await page.getByLabel('Message').fill('Test message content');
		
		await page.getByRole('button', { name: /Send Message/i }).click();
		
		await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 5000 });
	});

	test('should display contact information', async ({ page }) => {
		await expect(page.getByText('hello@3wallet.app')).toBeVisible();
	});

	test('should display team section', async ({ page }) => {
		await expect(page.getByText('Meet the Team')).toBeVisible();
		await expect(page.getByText('Hunter Ho')).toBeVisible();
	});

	test('should display FAQ section', async ({ page }) => {
		await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.getByLabel('Name')).toBeVisible();
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		
		await page.goto('/contact');
		await page.waitForLoadState('networkidle');
		expect(errors).toHaveLength(0);
	});
});

