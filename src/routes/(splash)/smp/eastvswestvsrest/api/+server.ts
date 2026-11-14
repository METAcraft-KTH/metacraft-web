import { json } from '@sveltejs/kit';
import { API_BASE, TEAMS } from '$lib/evw';

export const prerender = false;

/** What the API offers, for whoever finds it. The shapes are the types in $lib/evw.ts. */
export const GET = () =>
	json(
		{
			name: 'East vs West vs Rest',
			teams: TEAMS,
			endpoints: {
				[`${API_BASE}/standings?top=10`]: 'Team scores and the best players (top: 1-100)',
				[`${API_BASE}/recent?limit=20`]: 'The latest registered items (limit: 1-100)',
				[`${API_BASE}/teams/{east|west|rest}`]: "A team's items and players",
				[`${API_BASE}/players/{uuid}`]: "A player's team and items"
			}
		},
		{ headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=3600' } }
	);
