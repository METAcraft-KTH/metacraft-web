/**
 * East vs West vs Rest: what the dashboard and its API share.
 *
 * The data is written by the `east-vs-west` Fabric mod (METAmods); the website
 * only ever reads it. The JSON shapes below are the public API's contract, so
 * change them with care.
 */

/** The team keys the mod stores in MySQL. Fixed: they are an ENUM in the schema. */
export const TEAMS = ['east', 'west', 'rest'] as const;
export type TeamId = (typeof TEAMS)[number];

export const isTeam = (value: unknown): value is TeamId =>
	TEAMS.includes(value as TeamId);

/** Where the API lives. The page is prerendered, so it fetches this from the browser. */
export const API_BASE = '/smp/eastvswestvsrest/api';

export interface TeamStanding {
	id: TeamId;
	/** The team's score: the number of different items its players have registered. */
	score: number;
	/** Every registration by the team's players, duplicates between players included. */
	submissions: number;
	/** Players on the team. */
	players: number;
}

export interface PlayerScore {
	rank: number;
	uuid: string;
	username: string;
	team: TeamId;
	/** Items the player has registered. */
	items: number;
	/** ISO 8601. Ties go to whoever got there first. */
	lastSubmittedAt: string;
}

export interface Standings {
	updatedAt: string;
	/** Always all three teams, in the order of {@link TEAMS}. */
	teams: TeamStanding[];
	/** Different items registered by anyone at all. */
	uniqueItems: number;
	/** Best players across all teams, best first. */
	top: PlayerScore[];
}

export interface RecentSubmission {
	itemId: string;
	team: TeamId;
	submittedAt: string;
	player: { uuid: string; username: string };
}

export interface Recent {
	updatedAt: string;
	submissions: RecentSubmission[];
}

export interface TeamItem {
	itemId: string;
	/** How many of the team's players have registered it. */
	players: number;
	/** When the first of them did, which is when it started counting. */
	firstSubmittedAt: string;
}

export interface TeamDetail {
	updatedAt: string;
	id: TeamId;
	score: number;
	/** Newest first. */
	items: TeamItem[];
	/** Most items first. */
	players: { uuid: string; username: string; items: number }[];
}

export interface PlayerDetail {
	updatedAt: string;
	uuid: string;
	username: string;
	team: TeamId;
	/** Newest first. */
	items: { itemId: string; submittedAt: string }[];
}

/** `minecraft:diamond_sword` → `Diamond Sword`. Other namespaces keep theirs: `mod: Thing`. */
export function itemName(itemId: string): string {
	const [namespace, path = ''] = itemId.includes(':') ? itemId.split(':', 2) : ['minecraft', itemId];
	const name = path
		.split(/[_/]/)
		.filter(Boolean)
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
	return namespace === 'minecraft' ? name : `${namespace}: ${name}`;
}
