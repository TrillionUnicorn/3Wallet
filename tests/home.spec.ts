import { test, expect } from '@playwright/test';

/**
 * Home/Landing Page E2E Tests
 * Tests all sections, CTAs, forms, and responsiveness
 */

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/3Wallet/);
	});

	test('should display hero section', async ({ page }) => {
		const hero = page.locator('section').first();
		await expect(hero).toBeVisible();
		
		// Check for gradient text
		const heading = page.getByRole('heading', { name: /The Future of Secure/i });
		await expect(heading).toBeVisible();
		
		// Check CTAs
		const launchButton = page.getByRole('button', { name: /Launch Wallet/i });
		const demoButton = page.getByRole('button', { name: /Watch Demo/i });
		await expect(launchButton).toBeVisible();
		await expect(demoButton).toBeVisible();
	});

	test('should display stats section', async ({ page }) => {
		// Check for all 4 stats
		await expect(page.getByText('$0')).toBeVisible();
		await expect(page.getByText('15+')).toBeVisible();
		await expect(page.getByText('99.9%')).toBeVisible();
		await expect(page.getByText('10K+')).toBeVisible();
	});

	test('should display "Why Us" section', async ({ page }) => {
		await expect(page.getByText('Why Choose 3Wallet?')).toBeVisible();
		await expect(page.getByText('3-Tier Security')).toBeVisible();
		await expect(page.getByText('AI-Powered Protection')).toBeVisible();
		await expect(page.getByText('True Multi-Chain')).toBeVisible();
	});

	test('should display "How It Works" section', async ({ page }) => {
		await expect(page.getByText('How It Works')).toBeVisible();
		await expect(page.getByText('Create Your Wallet')).toBeVisible();
		await expect(page.getByText('Add Your Assets')).toBeVisible();
		await expect(page.getByText('Transact Securely')).toBeVisible();
	});

	test('should display pricing section', async ({ page }) => {
		await expect(page.getByText('Choose Your Security Tier')).toBeVisible();
		await expect(page.getByText('Personal')).toBeVisible();
		await expect(page.getByText('Professional')).toBeVisible();
		await expect(page.getByText('Enterprise')).toBeVisible();
	});

	test('should handle waitlist form submission', async ({ page }) => {
		// Fill form
		await page.getByPlaceholder('Your name').fill('Test User');
		await page.getByPlaceholder('your@email.com').fill('test@example.com');
		
		// Submit
		await page.getByRole('button', { name: /Get Early Access/i }).click();
		
		// Check for success message
		await expect(page.getByText(/Success/i)).toBeVisible({ timeout: 5000 });
	});

	test('should validate waitlist form', async ({ page }) => {
		// Try to submit empty form
		await page.getByRole('button', { name: /Get Early Access/i }).click();
		
		// Form should not submit (HTML5 validation)
		const nameInput = page.getByPlaceholder('Your name');
		await expect(nameInput).toBeFocused();
	});

	test('should display footer', async ({ page }) => {
		await expect(page.getByText('3Wallet', { exact: true })).toBeVisible();
		await expect(page.getByText('Making crypto safe')).toBeVisible();
		
		// Check footer links
		await expect(page.getByRole('link', { name: 'Wallet' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Pitch Deck' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
	});

	test('should navigate to wallet page', async ({ page }) => {
		await page.getByRole('button', { name: /Launch Wallet/i }).first().click();
		await expect(page).toHaveURL('/wallet');
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Check hero is visible
		const heading = page.getByRole('heading', { name: /The Future of Secure/i });
		await expect(heading).toBeVisible();
		
		// Check stats stack vertically
		const stats = page.locator('.glass-effect').first();
		await expect(stats).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		
		// Check layout adapts
		const heading = page.getByRole('heading', { name: /The Future of Secure/i });
		await expect(heading).toBeVisible();
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		expect(errors).toHaveLength(0);
	});

	test('should have no accessibility violations', async ({ page }) => {
		// Check for basic accessibility
		const heading = page.getByRole('heading', { level: 1 });
		await expect(heading).toBeVisible();
		
		// Check all buttons have accessible names
		const buttons = await page.getByRole('button').all();
		for (const button of buttons) {
			const name = await button.getAttribute('aria-label') || await button.textContent();
			expect(name).toBeTruthy();
		}
	});
});

test.describe('Home Page - Visual Regression', () => {
	test('should match desktop screenshot', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('home-desktop.png', { fullPage: true });
	});

	test('should match mobile screenshot', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('home-mobile.png', { fullPage: true });
	});

	test('should match tablet screenshot', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('home-tablet.png', { fullPage: true });
	});
});

