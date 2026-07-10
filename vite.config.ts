import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	plugins: [
		UnoCSS({ extractors: [extractorSvelte()] }),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',

			// https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#disabling-asynclocalstorage-in-serverless-environments
			disableAsyncLocalStorage: true,

			strategy: ["url", "baseLocale"],
			// https://inlang.com/m/gerre34r/library-inlang-paraglideJs/i18n-routing#locale-prefixing
			urlPatterns: [
				{
					pattern: "/:path(.*)?",
					localized: [
						["sv", "/sv/:path(.*)?"],
						["en", "/:path(.*)?"],
					],
				},
			]
		})
	],
	resolve: { alias: { $lib: '/src/lib' } }
});
