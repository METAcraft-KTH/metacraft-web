import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/content/posts';

export function entries() {
	// external posts are served by their own hand-written route, not this one
	return listPosts()
		.filter((post) => !post.external)
		.map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post || post.external) error(404, `No post named "${params.slug}"`);
	return { post };
}
