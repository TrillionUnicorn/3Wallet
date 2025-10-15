import { test, expect } from '@playwright/test';

/**
 * Pitch Deck Page E2E Tests
 */

test.describe('Pitch Deck Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Pitch Deck/);
	});

	test('should display title slide', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /3Wallet/i })).toBeVisible();
		await expect(page.getByText(/The Future of Secure Multi-Chain/i)).toBeVisible();
	});

	test('should display problem section', async ({ page }) => {
		await expect(page.getByText('The Problem')).toBeVisible();
		await expect(page.getByText('$3.8 Billion Lost in 2024')).toBeVisible();
	});

	test('should display market opportunity', async ({ page }) => {
		await expect(page.getByText('Market Opportunity')).toBeVisible();
		await expect(page.getByText('$2.3T')).toBeVisible();
		await expect(page.getByText('420M')).toBeVisible();
	});

	test('should display solution section', async ({ page }) => {
		await expect(page.getByText('Our Solution')).toBeVisible();
		await expect(page.getByText('3-Tier Security Architecture')).toBeVisible();
	});

	test('should display competitive analysis', async ({ page }) => {
		await expect(page.getByText('Competitive Analysis')).toBeVisible();
		await expect(page.getByText('MetaMask')).toBeVisible();
		await expect(page.getByText('Trust Wallet')).toBeVisible();
	});

	test('should display business model', async ({ page }) => {
		await expect(page.getByText('Business Model')).toBeVisible();
		await expect(page.getByText('$289M')).toBeVisible();
	});

	test('should display roadmap', async ({ page }) => {
		await expect(page.getByText('Roadmap')).toBeVisible();
		await expect(page.getByText('Q1 2025')).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.getByRole('heading', { name: /3Wallet/i })).toBeVisible();
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		
		await page.goto('/pitch');
		await page.waitForLoadState('networkidle');
		expect(errors).toHaveLength(0);
	});
});

