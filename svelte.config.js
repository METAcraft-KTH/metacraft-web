import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: { _: join(__dirname, 'src/lib/markdown/MarkdownLayout.svelte') },
			smartypants: { dashes: 'oldschool' }
		})
	],

	kit: {
		// Every page is still prerendered (see src/routes/+layout.ts); the node server
		// serves those files and runs the few +server.ts endpoints that opt out,
		// such as the East vs West vs Rest API that reads MySQL.
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
		}
	}
};

export default config;
