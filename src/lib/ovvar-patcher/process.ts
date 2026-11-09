import { unzipSync, Zip, ZipDeflate } from 'fflate';
import { patchPack, type Status } from './patcher.ts';
import { resources } from './resources.generated.ts';

export interface PatchResult {
	status: Status;
	log: string[];
	outName?: string;
	bytes?: Uint8Array;
}

/**
 * Reads a zip into a Map in the zip's own entry order, skipping directory entries, like Patcher.readZip
 * in the Java tool: the patcher's results depend on that order. unzipSync returns a plain object, whose
 * key order is not entry order for integer-like names, so the order is recorded in the filter callback,
 * which fflate calls once per entry in central directory order.
 */
export function readZip(bytes: Uint8Array): Map<string, Uint8Array> {
	const order: string[] = [];
	const data = unzipSync(bytes, {
		filter: (file) => {
			if (file.name.endsWith('/')) return false;
			order.push(file.name);
			return true;
		}
	});
	const files = new Map<string, Uint8Array>();
	for (const name of order) files.set(name, data[name]);
	return files;
}

/**
 * Zips the files in the Map's order. fflate's zipSync takes an object, which would reorder integer-like
 * names, so this uses the streaming Zip class, which writes entries in the order they are added.
 */
export function writeZip(files: Map<string, Uint8Array>): Uint8Array {
	const chunks: Uint8Array[] = [];
	let failure: Error | null = null;
	const zip = new Zip((err, chunk) => {
		if (err) failure = err;
		else chunks.push(chunk);
	});
	for (const [name, data] of files) {
		const entry = new ZipDeflate(name, { level: 6 });
		zip.add(entry);
		entry.push(data, true);
	}
	zip.end();
	if (failure) throw failure;
	let total = 0;
	for (const c of chunks) total += c.length;
	const out = new Uint8Array(total);
	let at = 0;
	for (const c of chunks) {
		out.set(c, at);
		at += c.length;
	}
	return out;
}

export function processPack(name: string, bytes: Uint8Array): PatchResult {
	let files: Map<string, Uint8Array>;
	try {
		files = readZip(bytes);
	} catch {
		return { status: 'NOT_A_SHADERPACK', log: ['Not a readable zip file.'] };
	}
	const result = patchPack(files, resources);
	if (result.status !== 'PATCHED') return { status: result.status, log: result.log };
	const base = name.toLowerCase().endsWith('.zip') ? name.slice(0, -4) : name;
	return {
		status: 'PATCHED',
		log: result.log,
		outName: base + '+ovvar.zip',
		bytes: writeZip(result.files)
	};
}
