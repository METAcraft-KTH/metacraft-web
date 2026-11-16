import { json } from '@sveltejs/kit';
import { API_BASE, TEAMS } from '$lib/museum';

export const prerender = false;

/** What the API offers, for whoever finds it. The shapes are the types in $lib/museum.ts. */
export const GET = () =>
	json(
		{
			name: 'Museum Collection Competition',
			teams: TEAMS,
			endpoints: {
				[`${API_BASE}/standings?top=10`]: 'Team scores and the best players (top: 1-100)',
				[`${API_BASE}/recent?limit=20`]: 'The latest registered items (limit: 1-100)',
				[`${API_BASE}/teams/{east|west|south}`]: "A team's items and players",
				[`${API_BASE}/players/{uuid}`]: "A player's team and items",
				[`${API_BASE}/skins/{hash}`]: "A player's skin (PNG) by the hash the other endpoints give as skin; never changes"
			}
		},
		{ headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=3600' } }
	);
