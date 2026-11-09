// Run with: node --test src/lib/ovvar-patcher/
// Zips METAmods' shared fixtures (mods/ovvar/tools/shaderpatcher/fixtures) and pushes them through the
// function the worker runs. FIXTURES overrides where the fixtures are.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { zipSync, Zip, ZipPassThrough } from 'fflate';
import { processPack, readZip } from './process.ts';

const fixtures =
	process.env.FIXTURES ??
	fileURLToPath(
		new URL(
			'../../../../METAmods-ovvar-shaders/mods/ovvar/tools/shaderpatcher/fixtures/',
			import.meta.url
		)
	);

function zipFixture(name: string): Uint8Array {
	const root = fixtures + name + '/in/';
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

test('split-programs is patched', () => {
	const r = processPack('pack.zip', zipFixture('split-programs'));
	assert.equal(r.status, 'PATCHED');
	assert.equal(r.outName, 'pack+ovvar.zip');
	assert.ok(r.bytes);
	assert.ok(readZip(r.bytes).has('ovvar-patch.properties'));
});

test('not-a-shaderpack is refused', () => {
	assert.equal(processPack('x.zip', zipFixture('not-a-shaderpack')).status, 'NOT_A_SHADERPACK');
});

test('a patched output is recognised as a patched copy', () => {
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
