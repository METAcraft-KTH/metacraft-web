import type { RequestHandler } from './$types';
import { clamp, recent } from '$lib/server/museum/queries';
import { respond } from '$lib/server/museum/respond';

export const prerender = false;

export const GET: RequestHandler = ({ url }) => {
	const limit = clamp(url.searchParams.get('limit'), 20, 100);
	return respond(`recent:${limit}`, () => recent(limit));
};
