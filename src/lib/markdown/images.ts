/**
 * Vite rewrites $lib paths only in markup it statically analyses. mdsvex passes
 * image sources through as component props, so they arrive unresolved and have
 * to be looked up against an eagerly-globbed map instead.
 */
const urls: Record<string, string> = import.meta.glob('$lib/images/**/*.{png,webp,jpg,jpeg,gif,svg,avif}', {
	eager: true,
	import: 'default',
	query: '?url'
});

/** Resolves '$lib/images/posts/x.png' to its hashed build URL. Other sources pass through. */
export function resolveImage(src: string): string {
	if (!src.startsWith('$lib/')) return src;
	return urls[src.replace('$lib/', '/src/lib/')] ?? src;
}
