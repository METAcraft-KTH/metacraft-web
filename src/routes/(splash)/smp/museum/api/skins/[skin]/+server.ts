import type { RequestHandler } from './$types';
import { SKIN_HASH, skin } from '$lib/server/museum/skins';
import { fail } from '$lib/server/museum/respond';

export const prerender = false;

/** A player's skin by its hash (see $lib/server/museum/skins.ts). Never changes, so cached for good. */
export const GET: RequestHandler = async ({ params }) => {
	const hash = params.skin;
	if (!SKIN_HASH.test(hash)) return fail(404, 'not_found');
	let png: Uint8Array | null;
	try {
		png = await skin(hash);
	} catch (e) {
		console.error('[museum] could not fetch a skin:', (e as Error).message);
		return fail(502, 'unavailable');
	}
	if (!png) return fail(404, 'not_found');
	return new Response(png as BodyInit, {
		headers: {
			'content-type': 'image/png',
			'cache-control': 'public, max-age=31536000, immutable',
			'access-control-allow-origin': '*'
		}
	});
};
