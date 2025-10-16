import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button Component', () => {
	it('should render button with text', () => {
		render(Button, { props: { children: 'Click me' } });
		expect(screen.getByRole('button')).toHaveTextContent('Click me');
	});

	it('should apply primary variant by default', () => {
		render(Button, { props: {} });
		const button = screen.getByRole('button');
		expect(button.className).toContain('bg-primary');
	});

	it('should apply secondary variant', () => {
		render(Button, { props: { variant: 'secondary' } });
		const button = screen.getByRole('button');
		expect(button.className).toContain('bg-secondary');
	});

	it('should apply outline variant', () => {
		render(Button, { props: { variant: 'outline' } });
		const button = screen.getByRole('button');
		expect(button.className).toContain('border-2');
	});

	it('should apply danger variant', () => {
		render(Button, { props: { variant: 'danger' } });
		const button = screen.getByRole('button');
		expect(button.className).toContain('bg-red-600');
	});

	it('should be disabled when disabled prop is true', () => {
		render(Button, { props: { disabled: true } });
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('should show loading state', () => {
		render(Button, { props: { loading: true } });
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('should be disabled when loading', () => {
		render(Button, { props: { loading: true } });
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('should apply small size', () => {
		render(Button, { props: { size: 'sm' } });
		const button = screen.getByRole('button');
		expect(button.className).toContain('px-3');
	});

	it('should apply medium size by default', () => {
		render(Button, { props: {} });
		const button = screen.getByRole('button');
		expect(button.className).toContain('px-4');
	});

	it('should apply large size', () => {
		render(Button, { props: { size: 'lg' } });
		const button = screen.getByRole('button');
		expect(button.className).toContain('px-6');
	});
});

