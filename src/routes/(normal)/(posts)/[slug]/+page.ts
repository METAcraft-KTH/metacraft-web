import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/content/posts';

export function entries() {
	return listPosts().map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, `No post named "${params.slug}"`);
	return { post };
}
