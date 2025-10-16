/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#059669',
					dark: '#047857',
					light: '#10b981',
				},
				secondary: {
					DEFAULT: '#0891b2',
					dark: '#0e7490',
					light: '#06b6d4',
				},
			},
		},
	},
	plugins: [],
};

