// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	/** Frontmatter of a post in src/lib/content/posts/. */
	interface PostMetadata {
		title: string;
		/** YYYY-MM-DD. Rendered by TypeAndTime. */
		date: string;
		/** Drives the icon in the post list: 'post' | 'update' | 'minor update' | 'event' | ... */
		type?: string;
		/**
		 * Splash background. Either a name from $lib/images/splashes (e.g. 'entre',
		 * 'smp/oas'), a name from $lib/images/posts, or an absolute http(s) URL.
		 */
		image?: string;
		/** Italic note shown above the body, e.g. "first posted on Discord". Inline HTML allowed. */
		disclaimer?: string;
		/** Hidden from the post list, but still reachable by URL. */
		draft?: boolean;
		/**
		 * The post has custom markup that markdown cannot express, so its page is a
		 * hand-written route elsewhere. The .md file carries only frontmatter, and
		 * the history list links straight to that route.
		 */
		external?: boolean;
		/** Highlights the post in the history list with a "SENASTE!" banner. */
		latest?: boolean;
		/** Highlights the post in the history list with a "LIVE!" banner. */
		live?: boolean;
	}
}

declare module '*.md' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
	export const metadata: PostMetadata;
}

export {};
