/**
 * How every endpoint of the public API answers: JSON, readable from any origin,
 * and never asking the database more often than once per TTL however many
 * people have the dashboard open.
 */
import { json } from '@sveltejs/kit';
import { Unavailable } from './db';

/** Seconds an answer is reused, here and in browsers and proxies. */
const TTL = 10;
/** Enough for every bounded key; only /players/<uuid> can grow past it. */
const MAX_ENTRIES = 500;

const cache = new Map<string, { expires: number; value: Promise<unknown> }>();

const headers = {
	'access-control-allow-origin': '*',
	'cache-control': `public, max-age=${TTL}`
};

/**
 * Answers with `load()`'s result, or the cached one for `key`. Requests arriving
 * while a load is running share it. A null result is a 404.
 */
export async function respond(key: string, load: () => Promise<unknown>): Promise<Response> {
	const time = Date.now();
	let entry = cache.get(key);
	if (!entry || entry.expires <= time) {
		if (cache.size >= MAX_ENTRIES) {
			for (const [k, e] of cache) if (e.expires <= time) cache.delete(k);
			if (cache.size >= MAX_ENTRIES) cache.clear();
		}
		entry = { expires: time + TTL * 1000, value: load() };
		cache.set(key, entry);
		// a failure is not worth remembering: the next request tries again
		entry.value.catch(() => cache.delete(key));
	}

	try {
		const value = await entry.value;
		if (value === null) return fail(404, 'not_found');
		return json(value, { headers });
	} catch (e) {
		if (e instanceof Unavailable) return fail(503, 'unavailable');
		throw e;
	}
}

export function fail(status: number, error: string): Response {
	return json(
		{ error },
		{ status, headers: { ...headers, 'cache-control': 'no-store' } }
	);
}
