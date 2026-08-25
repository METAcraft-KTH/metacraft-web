import fallback_image from '$lib/images/pr_squares/survival.png';
import legacyIndex from '../../routes/(splash)/smp/Posts.json';

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

function toPost(path: string, mod: { default: import('svelte').Component; metadata: PostMetadata }): Post {
	const { image } = mod.metadata;
	return {
		...mod.metadata,
		slug: path.replace(/^.*\/([^/]+)\.md$/, '$1'),
		imageUrl: resolveImage(image, mod.metadata.date),
		Content: mod.default
	};
}

const bySlug: Record<string, Post> = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => {
		const post = toPost(path, mod);
		return [post.slug, post];
	})
);

/** A post as the history list needs it: no component, just a link and its metadata. */
export interface PostLink {
	href: string;
	title: string;
	/** Normalised to YYYY-MM-DD so the two post systems sort against each other. */
	date: string;
	type: string;
	imageUrl: string;
	live?: boolean;
	latest?: boolean;
}

/** '2024/9/23' and '2024-09-23' both become '2024-09-23'. */
function normaliseDate(date: string): string {
	const [y, m, d] = date.split(/[/-]/);
	return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

function resolveImage(image: string | undefined, date: string): string {
	if (image?.startsWith('http')) return image;
	// legacy posts fall back to an image named after their date, e.g. 241028.png
	return (image && images[image]) || images[date.replaceAll('/', '')] || fallback_image;
}

export function getPost(slug: string): Post | undefined {
	return bySlug[slug];
}

/** Published posts, newest first. Drafts stay reachable by URL but out of the list. */
export function listPosts(): Post[] {
	return Object.values(bySlug)
		.filter((post) => !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * The full server history, newest first: markdown posts under / plus the older
 * Svelte-component posts under /smp, which still live in Posts.json.
 */
export function listHistory(): PostLink[] {
	const markdown: PostLink[] = listPosts().map((post) => ({
		href: `/${post.slug}`,
		title: post.title,
		date: normaliseDate(post.date),
		type: post.type ?? 'post',
		imageUrl: post.imageUrl
	}));

	const legacy: PostLink[] = legacyIndex.map((post) => ({
		href: `/smp/${post.href}`,
		title: post.title,
		date: normaliseDate(post.date),
		type: post.type,
		imageUrl: resolveImage(post.image, post.date),
		latest: 'latest' in post ? post.latest : undefined
	}));

	return [...markdown, ...legacy].sort((a, b) => b.date.localeCompare(a.date));
}
