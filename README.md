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

## Museum Collection Competition

The dashboard at `/smp/museum` shows the scores of the item collection event run by
the `museum-collection` mod (METAmods). The mod writes to MySQL/MariaDB; the website only reads, so
its database user needs `SELECT` on `museum_players` and `museum_submissions` and nothing more.

Copy `.env.example` to `.env` and fill in the `MUSEUM_DB_*` variables (`docker compose` and
`pnpm dev` both read it). While `MUSEUM_DB_HOST` is unset the API answers 503 and the dashboard
says the scores can't be reached.

The API is public, read-only JSON with `Access-Control-Allow-Origin: *`. Answers are cached
for 5 seconds, so the database sees at most one round of queries per endpoint in that time.

| Endpoint | What |
| --- | --- |
| `GET /smp/museum/api` | This list |
| `GET /smp/museum/api/standings?top=10` | Team scores and the best players (`top`: 1-100) |
| `GET /smp/museum/api/recent?limit=20` | The latest registered items (`limit`: 1-100) |
| `GET /smp/museum/api/teams/{east\|west\|south}` | A team's items and players |
| `GET /smp/museum/api/players/{uuid}` | A player's team and items |
| `GET /smp/museum/api/skins/{hash}` | A player's skin (PNG), by the `skin` hash the others give |

The response shapes are the types in `src/lib/museum.ts`; the queries are in `src/lib/server/museum/`.

### Player heads

The mod stores each player's skin hash, read from the profile Mojang signed at login, so no
profile API (and none of its rate limits) is involved. `/api/skins/{hash}` fetches
`textures.minecraft.net/texture/{hash}` once per skin, keeps up to 2000 in memory and tells
browsers to cache it for a year: a skin hash never changes, a new skin is a new hash. The page
cuts the face and hat out of the skin with CSS (`Head.svelte`). Players without a skin get Steve.

### Item icons

`src/lib/images/museum-items.png` holds the inventory icon of every item, with the index in
`src/lib/museum-items.json`; `ItemIcon.svelte` shows one with CSS. They are rendered from the
game's own assets, with no API, by:

```sh
pnpm museum:icons ~/.gradle/caches/fabric-loom/<version>/minecraft-client.jar [resource packs...]
```

Run it again (and commit the result) when the server moves to a new Minecraft version. Extra
resource packs (zip, jar or folder) are layered on top, for items the server adds. An item that
isn't in the sheet shows a placeholder.
