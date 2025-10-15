import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@solana/web3.js'],
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	resolve: {
		alias: {
			'@solana/web3.js': '@solana/web3.js/lib/index.browser.esm.js'
		}
	}
});
