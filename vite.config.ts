import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
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
