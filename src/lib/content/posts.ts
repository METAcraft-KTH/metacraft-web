import fallback_image from '$lib/images/pr_squares/survival.png';

/**
 * Every markdown post, keyed by slug (the filename without extension).
 * The glob pattern must be a literal string - Vite resolves it statically at build time.
 */
const modules = import.meta.glob<{ default: import('svelte').Component; metadata: PostMetadata }>(
	'./posts/*.md',
	{ eager: true }
);

/** Splash images, keyed by name without directory or extension ('entre', 'oas', ...). */
const images: Record<string, string> = Object.fromEntries(
	Object.entries(
		import.meta.glob<string>('$lib/images/{splashes,posts}/**/*.{png,webp,jpg}', {
			eager: true,
			import: 'default'
		})
	).map(([path, url]) => [path.replace(/^.*\/([^/]+)\.[^.]+$/, '$1'), url])
);

export interface Post extends PostMetadata {
	slug: string;
	/** Resolved URL of the splash image. */
	imageUrl: string;
	Content: import('svelte').Component;
}

function resolveImage(image: string | undefined, slug: string): string {
	if (image?.startsWith('http')) return image;
	// posts without an explicit image may have one named after their slug, e.g. 241028.png
	return (image && images[image]) || images[slug] || fallback_image;
}

const bySlug: Record<string, Post> = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => {
		const slug = path.replace(/^.*\/([^/]+)\.md$/, '$1');
		return [
			slug,
			{
				...mod.metadata,
				slug,
				imageUrl: resolveImage(mod.metadata.image, slug),
				Content: mod.default
			}
		];
	})
);

export function getPost(slug: string): Post | undefined {
	return bySlug[slug];
}

/** Published posts, newest first. Drafts stay reachable by URL but out of the list. */
export function listPosts(): Post[] {
	return Object.values(bySlug)
		.filter((post) => !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}
