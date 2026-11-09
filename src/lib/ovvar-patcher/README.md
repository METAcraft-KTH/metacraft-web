# ovvar-patcher

`patcher.ts` and `resources.generated.ts` are vendored from METAmods (`mods/ovvar/tools/shaderpatcher/web`,
see `web/README.md` there: `node build.mjs`, then copy `patcher.ts` and `dist/resources.generated.ts`).
Everything else here is the website's own.

Vendoring steps specific to the website, to redo each time:

1. Put the commit in the first line of both vendored files.
2. In `resources.generated.ts`, change the import to `./patcher.ts`.
3. Line 2 of `patcher.ts` must be `// @ts-nocheck`. The upstream file is not strict-null clean, so `npm run check`
   fails on it otherwise; its behaviour is pinned by the METAmods fixtures, not by this type check. tsconfig
   `exclude` and svelte-check `--ignore` do not help (imported files are checked regardless, and `--ignore` needs
   `--no-tsconfig`), so the directive stays; `smoke.test.ts` fails if it goes missing.

Tests: `FIXTURES=<METAmods>/mods/ovvar/tools/shaderpatcher/fixtures/ npm test`.
