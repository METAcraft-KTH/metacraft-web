// Run with: node --test src/lib/ovvar-patcher/
// Zips METAmods' shared fixtures (mods/ovvar/tools/shaderpatcher/fixtures) and pushes them through the
// function the worker runs. Run: FIXTURES=<METAmods>/mods/ovvar/tools/shaderpatcher/fixtures/ npm test
// (the fixture tests skip without FIXTURES).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { zipSync, Zip, ZipPassThrough } from 'fflate';
import { processPack, readZip } from './process.ts';

const fixtures = process.env.FIXTURES;
const skip = fixtures
	? false
	: 'set FIXTURES to METAmods mods/ovvar/tools/shaderpatcher/fixtures/ (with a trailing slash)';

function zipFixture(name: string): Uint8Array {
	const root = fixtures! + name + '/in/';
	const files: Record<string, Uint8Array> = {};
	const walk = (rel: string) => {
		for (const n of readdirSync(root + rel).sort()) {
			const p = rel + n;
			if (statSync(root + p).isDirectory()) walk(p + '/');
			else files[p] = new Uint8Array(readFileSync(root + p));
		}
	};
	walk('');
	return zipSync(files);
}

test('split-programs is patched', { skip }, () => {
	const r = processPack('pack.zip', zipFixture('split-programs'));
	assert.equal(r.status, 'PATCHED');
	assert.equal(r.outName, 'pack+ovvar.zip');
	assert.ok(r.bytes);
	assert.ok(readZip(r.bytes).has('ovvar-patch.properties'));
});

test('not-a-shaderpack is refused', { skip }, () => {
	assert.equal(processPack('x.zip', zipFixture('not-a-shaderpack')).status, 'NOT_A_SHADERPACK');
});

test('a patched output is recognised as a patched copy', { skip }, () => {
	const r = processPack('pack.zip', zipFixture('split-programs'));
	assert.equal(processPack('pack+ovvar.zip', r.bytes!).status, 'PATCHED_COPY');
});

test('entry order is the zip order, directories skipped, integer-like names kept in place', () => {
	const chunks: Uint8Array[] = [];
	const z = new Zip((_e, c) => chunks.push(c));
	for (const n of ['b.txt', '2', 'dir/', 'a.txt', '1']) {
		const e = new ZipPassThrough(n);
		z.add(e);
		e.push(new Uint8Array([1]), true);
	}
	z.end();
	const bytes = new Uint8Array(chunks.reduce((s, c) => s + c.length, 0));
	let at = 0;
	for (const c of chunks) {
		bytes.set(c, at);
		at += c.length;
	}
	assert.deepEqual([...readZip(bytes).keys()], ['b.txt', '2', 'a.txt', '1']);
});

test('a corrupt zip is reported as unreadable', () => {
	assert.equal(processPack('x.zip', new Uint8Array([1, 2, 3, 4])).status, 'UNREADABLE');
});

test('the vendored patcher keeps its ts-nocheck line (see README.md)', () => {
	const head = readFileSync(new URL('./patcher.ts', import.meta.url), 'utf8')
		.split('\n')
		.slice(0, 3);
	assert.ok(head.some((l) => l.startsWith('// @ts-nocheck')));
});
