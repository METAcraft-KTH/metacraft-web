/**
 * Player skins, for the heads on the dashboard, without any profile API.
 *
 * The mod stores the hash of each player's skin (read from the profile Mojang
 * signed at login), so the only thing ever fetched is the skin file itself:
 * `textures.minecraft.net/texture/<hash>`, a CDN of files that never change (a
 * new skin is a new hash). Each one is fetched once and kept here, and
 * browsers are told to keep it forever, so a page with hundreds of heads costs
 * Mojang one request per skin the server hasn't seen before, and the database
 * nothing at all.
 */

/** The shape of the hashes textures.minecraft.net serves; also all the mod stores. */
export const SKIN_HASH = /^[0-9a-f]{1,64}$/;

/** About 2-4 KB each, so this is a few MB at most. */
const MAX_ENTRIES = 2000;
/** Skins are small; anything bigger isn't one. */
const MAX_BYTES = 64 * 1024;
/** How long a hash Mojang doesn't know is remembered as such. */
const MISSING_TTL = 60 * 60 * 1000;
const PNG = [0x89, 0x50, 0x4e, 0x47];

type Entry = { value: Promise<Uint8Array | null>; expires: number };
/** In order of last use: Map keeps insertion order, and a hit is moved to the end. */
const cache = new Map<string, Entry>();

/**
 * The skin PNG for a hash, or null for one Mojang doesn't have. Throws when
 * Mojang can't be reached, which isn't remembered.
 */
export function skin(hash: string): Promise<Uint8Array | null> {
	const now = Date.now();
	const hit = cache.get(hash);
	if (hit && hit.expires > now) {
		cache.delete(hash);
		cache.set(hash, hit);
		return hit.value;
	}

	const entry: Entry = { value: download(hash), expires: Infinity };
	cache.set(hash, entry);
	while (cache.size > MAX_ENTRIES) cache.delete(cache.keys().next().value!);
	entry.value.then(
		(png) => {
			if (png === null) entry.expires = Date.now() + MISSING_TTL;
		},
		() => cache.delete(hash)
	);
	return entry.value;
}

async function download(hash: string): Promise<Uint8Array | null> {
	const response = await fetch(`https://textures.minecraft.net/texture/${hash}`, {
		signal: AbortSignal.timeout(5000)
	});
	if (response.status === 404) return null;
	if (!response.ok) throw new Error(`textures.minecraft.net answered ${response.status}`);
	const png = new Uint8Array(await response.arrayBuffer());
	if (png.length > MAX_BYTES || !PNG.every((byte, i) => png[i] === byte)) return null;
	return png;
}
