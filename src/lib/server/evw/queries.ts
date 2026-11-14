/**
 * The event's read queries. They follow the mod's own (EventRepository.java in
 * METAmods), so the website and `/evw` in game always agree: a team's score is
 * its COUNT(DISTINCT item_id), and the leaderboard orders by items, then by who
 * got there first.
 *
 * Timestamps are read as UNIX_TIMESTAMP() so the database's time zone setting
 * never comes into it.
 */
import {
	TEAMS,
	isTeam,
	type PlayerDetail,
	type Recent,
	type Standings,
	type TeamDetail,
	type TeamId
} from '$lib/evw';
import { query } from './db';

const iso = (unixSeconds: unknown) => new Date(Number(unixSeconds) * 1000).toISOString();
const now = () => new Date().toISOString();
/** The mod stores CHAR(36); trim in case the server pads it. */
const uuid = (value: unknown) => String(value).trim();

/**
 * Whole numbers for LIMIT. They are put in the SQL text, not bound: MySQL 8
 * rejects a bound LIMIT from mysql2, which sends every number as a double.
 */
export function clamp(value: string | null, fallback: number, max: number): number {
	const n = Number.parseInt(value ?? '', 10);
	return Number.isFinite(n) ? Math.min(Math.max(n, 1), max) : fallback;
}

export async function standings(top: number): Promise<Standings> {
	const [scores, sizes, total, best] = await Promise.all([
		query(
			(t) =>
				`SELECT team, COUNT(DISTINCT item_id) AS score, COUNT(*) AS submissions FROM ${t.submissions} GROUP BY team`
		),
		query((t) => `SELECT team, COUNT(*) AS players FROM ${t.players} GROUP BY team`),
		query((t) => `SELECT COUNT(DISTINCT item_id) AS items FROM ${t.submissions}`),
		query(
			(t) =>
				`SELECT p.uuid, p.username, p.team, COUNT(*) AS items, UNIX_TIMESTAMP(MAX(s.submitted_at)) AS last_submitted
				 FROM ${t.submissions} s JOIN ${t.players} p ON p.uuid = s.player_uuid
				 GROUP BY p.uuid, p.username, p.team
				 ORDER BY items DESC, last_submitted ASC, p.uuid ASC LIMIT ${top}`
		)
	]);

	return {
		updatedAt: now(),
		teams: TEAMS.map((id) => {
			const score = scores.find((row) => row.team === id);
			const size = sizes.find((row) => row.team === id);
			return {
				id,
				score: Number(score?.score ?? 0),
				submissions: Number(score?.submissions ?? 0),
				players: Number(size?.players ?? 0)
			};
		}),
		uniqueItems: Number(total[0]?.items ?? 0),
		top: best
			.filter((row) => isTeam(row.team))
			.map((row, index) => ({
				rank: index + 1,
				uuid: uuid(row.uuid),
				username: String(row.username),
				team: row.team as TeamId,
				items: Number(row.items),
				lastSubmittedAt: iso(row.last_submitted)
			}))
	};
}

export async function recent(limit: number): Promise<Recent> {
	const rows = await query(
		(t) =>
			`SELECT s.item_id, s.team, UNIX_TIMESTAMP(s.submitted_at) AS submitted, p.uuid, p.username
			 FROM ${t.submissions} s JOIN ${t.players} p ON p.uuid = s.player_uuid
			 ORDER BY s.submitted_at DESC, s.item_id ASC LIMIT ${limit}`
	);
	return {
		updatedAt: now(),
		submissions: rows
			.filter((row) => isTeam(row.team))
			.map((row) => ({
				itemId: String(row.item_id),
				team: row.team as TeamId,
				submittedAt: iso(row.submitted),
				player: { uuid: uuid(row.uuid), username: String(row.username) }
			}))
	};
}

export async function team(id: TeamId): Promise<TeamDetail> {
	const [items, players] = await Promise.all([
		query(
			(t) =>
				`SELECT item_id, COUNT(*) AS players, UNIX_TIMESTAMP(MIN(submitted_at)) AS first_submitted
				 FROM ${t.submissions} WHERE team = ?
				 GROUP BY item_id ORDER BY first_submitted DESC, item_id ASC`,
			[id]
		),
		query(
			(t) =>
				`SELECT p.uuid, p.username, COUNT(s.item_id) AS items
				 FROM ${t.players} p LEFT JOIN ${t.submissions} s ON s.player_uuid = p.uuid
				 WHERE p.team = ?
				 GROUP BY p.uuid, p.username ORDER BY items DESC, p.username ASC`,
			[id]
		)
	]);
	return {
		updatedAt: now(),
		id,
		score: items.length,
		items: items.map((row) => ({
			itemId: String(row.item_id),
			players: Number(row.players),
			firstSubmittedAt: iso(row.first_submitted)
		})),
		players: players.map((row) => ({
			uuid: uuid(row.uuid),
			username: String(row.username),
			items: Number(row.items)
		}))
	};
}

/** Null for a player on no team: the mod has no row for them. */
export async function player(id: string): Promise<PlayerDetail | null> {
	const [who, items] = await Promise.all([
		query((t) => `SELECT uuid, username, team FROM ${t.players} WHERE uuid = ?`, [id]),
		query(
			(t) =>
				`SELECT item_id, UNIX_TIMESTAMP(submitted_at) AS submitted FROM ${t.submissions}
				 WHERE player_uuid = ? ORDER BY submitted_at DESC, item_id ASC`,
			[id]
		)
	]);
	const row = who[0];
	if (!row || !isTeam(row.team)) return null;
	return {
		updatedAt: now(),
		uuid: uuid(row.uuid),
		username: String(row.username),
		team: row.team,
		items: items.map((item) => ({
			itemId: String(item.item_id),
			submittedAt: iso(item.submitted)
		}))
	};
}
