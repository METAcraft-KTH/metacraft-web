import type { RequestHandler } from './$types';
import { clamp, standings } from '$lib/server/museum/queries';
import { respond } from '$lib/server/museum/respond';

export const prerender = false;

export const GET: RequestHandler = ({ url }) => {
	const top = clamp(url.searchParams.get('top'), 10, 100);
	return respond(`standings:${top}`, () => standings(top));
};
