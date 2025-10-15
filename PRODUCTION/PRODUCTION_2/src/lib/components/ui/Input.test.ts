import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Input from './Input.svelte';

describe('Input Component', () => {
	it('should render input field', () => {
		render(Input, { props: { placeholder: 'Enter text' } });
		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	it('should render with label', () => {
		render(Input, { props: { label: 'Username' } });
		expect(screen.getByText('Username')).toBeInTheDocument();
	});

	it('should show required indicator', () => {
		render(Input, { props: { label: 'Email', required: true } });
		expect(screen.getByText('*')).toBeInTheDocument();
	});

	it('should display error message', () => {
		render(Input, { props: { error: 'This field is required' } });
		expect(screen.getByText('This field is required')).toBeInTheDocument();
	});

	it('should display helper text', () => {
		render(Input, { props: { helperText: 'Enter your email address' } });
		expect(screen.getByText('Enter your email address')).toBeInTheDocument();
	});

	it('should not show helper text when error is present', () => {
		render(Input, { props: { helperText: 'Helper', error: 'Error' } });
		expect(screen.queryByText('Helper')).not.toBeInTheDocument();
		expect(screen.getByText('Error')).toBeInTheDocument();
	});

	it('should be disabled when disabled prop is true', () => {
		render(Input, { props: { disabled: true } });
		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();
	});

	it('should have correct type', () => {
		render(Input, { props: { type: 'password' } });
		const input = screen.getByRole('textbox', { hidden: true });
		expect(input).toHaveAttribute('type', 'password');
	});
});

