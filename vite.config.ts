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
		},
		rollupOptions: {
			external: []
		}
	},
	resolve: {
		alias: {
			'@solana/web3.js': '@solana/web3.js/lib/index.browser.esm.js'
		},
		conditions: ['browser', 'module', 'import', 'default']
	},
	ssr: {
		noExternal: ['@solana/web3.js']
	}
});
