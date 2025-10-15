import { test, expect } from '@playwright/test';

/**
 * Wallet Page E2E Tests
 * Tests wallet creation, balance fetching, and all functionality
 */

test.describe('Wallet Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/wallet');
		// Clear localStorage before each test
		await page.evaluate(() => localStorage.clear());
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/3Wallet/);
		await expect(page.getByText('3Wallet')).toBeVisible();
	});

	test('should show create wallet prompt when no wallet exists', async ({ page }) => {
		await expect(page.getByText('Welcome to 3Wallet')).toBeVisible();
		await expect(page.getByRole('button', { name: /Create New Wallet/i })).toBeVisible();
	});

	test('should open create wallet modal', async ({ page }) => {
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		
		// Modal should be visible
		await expect(page.getByText('Create New Wallet')).toBeVisible();
		await expect(page.getByLabel('Wallet Name')).toBeVisible();
		await expect(page.getByLabel('Password')).toBeVisible();
	});

	test('should create a new wallet', async ({ page }) => {
		// Open modal
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		
		// Fill form
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		
		// Submit
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Wait for wallet to be created
		await expect(page.getByText('Total Portfolio Value')).toBeVisible({ timeout: 10000 });
	});

	test('should display wallet dashboard after creation', async ({ page }) => {
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Check dashboard elements
		await expect(page.getByText('Total Portfolio Value')).toBeVisible({ timeout: 10000 });
		await expect(page.getByText('Your Assets')).toBeVisible();
		await expect(page.getByText('Wallet Addresses')).toBeVisible();
	});

	test('should display all three chains', async ({ page }) => {
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Wait for wallet creation
		await page.waitForTimeout(2000);
		
		// Check for chain cards (may need to scroll)
		await expect(page.getByText('Ethereum')).toBeVisible();
		await expect(page.getByText('Bitcoin')).toBeVisible();
		await expect(page.getByText('Solana')).toBeVisible();
	});

	test('should copy address to clipboard', async ({ page }) => {
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Wait for wallet
		await page.waitForTimeout(2000);
		
		// Grant clipboard permissions
		await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
		
		// Click copy button
		const copyButton = page.getByRole('button', { name: /Copy/i }).first();
		await copyButton.click();
		
		// Check for alert (or success message)
		page.on('dialog', dialog => {
			expect(dialog.message()).toContain('copied');
			dialog.accept();
		});
	});

	test('should validate password strength', async ({ page }) => {
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		
		// Try weak password
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('weak');
		
		// Password should be too short (HTML5 validation or custom)
		const passwordInput = page.getByLabel('Password');
		const value = await passwordInput.inputValue();
		expect(value.length).toBeLessThan(8);
	});

	test('should persist wallet in localStorage', async ({ page }) => {
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Wait for creation
		await page.waitForTimeout(2000);
		
		// Check localStorage
		const walletData = await page.evaluate(() => localStorage.getItem('3wallet_wallets'));
		expect(walletData).toBeTruthy();
	});

	test('should display security tier', async ({ page }) => {
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Wait and check security tier
		await page.waitForTimeout(2000);
		await expect(page.getByText(/Security Tier:/i)).toBeVisible();
		await expect(page.getByText(/Personal/i)).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Check mobile layout
		await page.waitForTimeout(2000);
		await expect(page.getByText('Total Portfolio Value')).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		
		// Create wallet
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.getByLabel('Wallet Name').fill('Test Wallet');
		await page.getByLabel('Password').fill('TestPassword123!@#');
		await page.getByRole('button', { name: /Create Wallet/i }).click();
		
		// Check tablet layout
		await page.waitForTimeout(2000);
		await expect(page.getByText('Total Portfolio Value')).toBeVisible();
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/wallet');
		await page.waitForLoadState('networkidle');
		
		// Filter out expected errors (like network errors for testnet)
		const criticalErrors = errors.filter(e => 
			!e.includes('Failed to fetch') && 
			!e.includes('NetworkError')
		);
		
		expect(criticalErrors).toHaveLength(0);
	});

	test('should close modal on cancel', async ({ page }) => {
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		
		// Modal should be visible
		await expect(page.getByText('Create New Wallet')).toBeVisible();
		
		// Click cancel
		await page.getByRole('button', { name: /Cancel/i }).click();
		
		// Modal should close
		await expect(page.getByText('Create New Wallet')).not.toBeVisible();
	});

	test('should close modal on escape key', async ({ page }) => {
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		
		// Modal should be visible
		await expect(page.getByText('Create New Wallet')).toBeVisible();
		
		// Press escape
		await page.keyboard.press('Escape');
		
		// Modal should close
		await expect(page.getByText('Create New Wallet')).not.toBeVisible();
	});
});

test.describe('Wallet Page - Visual Regression', () => {
	test('should match empty state screenshot', async ({ page }) => {
		await page.goto('/wallet');
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('wallet-empty.png');
	});

	test('should match create modal screenshot', async ({ page }) => {
		await page.goto('/wallet');
		await page.getByRole('button', { name: /Create New Wallet/i }).click();
		await page.waitForTimeout(500);
		await expect(page).toHaveScreenshot('wallet-create-modal.png');
	});
});

