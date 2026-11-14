# METACraft web

Built with SvelteKit and Tailwind. Every page is prerendered; a small Node server
(`@sveltejs/adapter-node`) serves them and runs the few API endpoints.

## Developing

Install dependencies with `pnpm install`, then start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

## Building

```bash
pnpm build
node build        # serves on PORT (default 3000)
```

`docker compose up --build` does the same in a container, on `127.0.0.1:3000`.

## East vs West vs Rest

The dashboard at `/smp/eastvswestvsrest` shows the scores of the item collection event run by
the `east-vs-west` mod (METAmods). The mod writes to MySQL/MariaDB; the website only reads, so
its database user needs `SELECT` on `evw_players` and `evw_submissions` and nothing more.

Copy `.env.example` to `.env` and fill in the `EVW_DB_*` variables (`docker compose` and
`pnpm dev` both read it). While `EVW_DB_HOST` is unset the API answers 503 and the dashboard
says the scores can't be reached.

The API is public, read-only JSON with `Access-Control-Allow-Origin: *`. Answers are cached
for 10 seconds, so the database sees at most one round of queries per endpoint in that time.

| Endpoint | What |
| --- | --- |
| `GET /smp/eastvswestvsrest/api` | This list |
| `GET /smp/eastvswestvsrest/api/standings?top=10` | Team scores and the best players (`top`: 1-100) |
| `GET /smp/eastvswestvsrest/api/recent?limit=20` | The latest registered items (`limit`: 1-100) |
| `GET /smp/eastvswestvsrest/api/teams/{east\|west\|rest}` | A team's items and players |
| `GET /smp/eastvswestvsrest/api/players/{uuid}` | A player's team and items |

The response shapes are the types in `src/lib/evw.ts`; the queries are in `src/lib/server/evw/`.
