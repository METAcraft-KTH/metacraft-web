/**
 * The connection to the MySQL/MariaDB database the `east-vs-west` mod writes to.
 * Read-only from here: give the website's database user SELECT and nothing else.
 *
 * Configured by environment variables, read when the first request comes in:
 *
 *   EVW_DB_HOST          required; the API answers 503 while it is unset
 *   EVW_DB_PORT          3306
 *   EVW_DB_NAME          metacraft
 *   EVW_DB_USER          metacraft
 *   EVW_DB_PASSWORD      ""
 *   EVW_DB_TABLE_PREFIX  evw_   (the mod's database.table_prefix)
 */
import { env } from '$env/dynamic/private';
import mysql from 'mysql2/promise';

/** The API has no database to ask: not configured, or it can't be reached. */
export class Unavailable extends Error {}

interface Connection {
	pool: mysql.Pool;
	players: string;
	submissions: string;
}

let connection: Connection | undefined;

function connect(): Connection {
	if (connection) return connection;
	if (!env.EVW_DB_HOST) throw new Unavailable('EVW_DB_HOST is not set');

	// The prefix ends up in the SQL text, so it gets the same check the mod gives it.
	const prefix = env.EVW_DB_TABLE_PREFIX ?? 'evw_';
	if (!/^[A-Za-z0-9_]{0,32}$/.test(prefix)) {
		throw new Unavailable('EVW_DB_TABLE_PREFIX may only hold letters, digits and _');
	}

	connection = {
		pool: mysql.createPool({
			host: env.EVW_DB_HOST,
			port: Number(env.EVW_DB_PORT ?? 3306),
			database: env.EVW_DB_NAME ?? 'metacraft',
			user: env.EVW_DB_USER ?? 'metacraft',
			password: env.EVW_DB_PASSWORD ?? '',
			connectionLimit: 3,
			connectTimeout: 5000,
			charset: 'utf8mb4'
		}),
		players: `${prefix}players`,
		submissions: `${prefix}submissions`
	};
	return connection;
}

export type Row = Record<string, unknown>;

/**
 * Runs a prepared statement. `sql` gets the table names from the callback, and
 * everything else goes through `params`.
 *
 * The mod creates its tables at its first query, so until the event has been
 * switched on they don't exist: that reads as "nothing yet", not as an error.
 */
export async function query(
	sql: (tables: { players: string; submissions: string }) => string,
	params: (string | number)[] = []
): Promise<Row[]> {
	const { pool, players, submissions } = connect();
	try {
		const [rows] = await pool.execute(sql({ players, submissions }), params);
		return rows as Row[];
	} catch (e) {
		if ((e as { code?: string }).code === 'ER_NO_SUCH_TABLE') return [];
		console.error('[evw] database query failed:', (e as Error).message);
		throw new Unavailable('database query failed');
	}
}
