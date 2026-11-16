#!/usr/bin/env node
/**
 * Renders the inventory icon of every item into one sprite sheet for the
 * Museum Collection Competition page, straight from the game's own assets:
 * no API, nothing fetched. Run it again when the server moves to a new
 * Minecraft version, and commit what it writes.
 *
 *   node scripts/museum-item-icons.mjs <minecraft client .jar> [resource pack .zip/.jar/dir ...]
 *
 * The client jar is the one Loom keeps for METAmods
 * (~/.gradle/caches/fabric-loom/<version>/minecraft-client.jar), or
 * .minecraft/versions/<version>/<version>.jar. Later sources override earlier
 * ones, so a server resource pack (Polymer's, for instance) adds or replaces
 * items on top of vanilla. Writes:
 *
 *   src/lib/images/museum-items.png   the icons, ICON px square, COLUMNS per row
 *   src/lib/museum-items.json         { size, columns, ids }: icon i is ids[i]
 *   src/lib/images/museum-steve.png   the default skin, for players without one
 *
 * Flat items are drawn like the game does (their layers, tinted). Block items
 * are drawn from their models in the GUI projection, shaded per face. The
 * handful of items the game draws with special entity renderers (chests,
 * beds, heads, banners...) are approximated from their entity textures, or
 * left out, in which case the page shows a placeholder.
 *
 * Dependency-free on purpose: a zip reader and a PNG codec on node:zlib.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const ICON = 32;
const COLUMNS = 32;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- sources

/** Every file under assets/ of a zip, as path → () => Buffer. */
function readZip(file) {
	const data = readFileSync(file);
	let eocd = -1;
	for (let i = data.length - 22; i >= Math.max(0, data.length - 65557); i--) {
		if (data.readUInt32LE(i) === 0x06054b50) {
			eocd = i;
			break;
		}
	}
	if (eocd < 0) throw new Error(`${file}: not a zip`);
	let count = data.readUInt16LE(eocd + 10);
	let offset = data.readUInt32LE(eocd + 16);
	if (count === 0xffff || offset === 0xffffffff) {
		// zip64: the locator sits right before the end record
		const locator = eocd - 20;
		const record = Number(data.readBigUInt64LE(locator + 8));
		count = Number(data.readBigUInt64LE(record + 32));
		offset = Number(data.readBigUInt64LE(record + 48));
	}
	const files = new Map();
	for (let n = 0, p = offset; n < count; n++) {
		if (data.readUInt32LE(p) !== 0x02014b50) throw new Error(`${file}: bad central directory`);
		const method = data.readUInt16LE(p + 10);
		const compressed = data.readUInt32LE(p + 20);
		const nameLength = data.readUInt16LE(p + 28);
		const extraLength = data.readUInt16LE(p + 30);
		const commentLength = data.readUInt16LE(p + 32);
		const local = data.readUInt32LE(p + 42);
		const name = data.toString('utf8', p + 46, p + 46 + nameLength);
		p += 46 + nameLength + extraLength + commentLength;
		if (!name.startsWith('assets/') || name.endsWith('/')) continue;
		files.set(name, () => {
			const start = local + 30 + data.readUInt16LE(local + 26) + data.readUInt16LE(local + 28);
			const raw = data.subarray(start, start + compressed);
			if (method === 0) return raw;
			if (method === 8) return zlib.inflateRawSync(raw);
			throw new Error(`${name}: compression method ${method}`);
		});
	}
	return files;
}

function readDir(dir) {
	const files = new Map();
	const walk = (d) => {
		for (const entry of readdirSync(d)) {
			const path = join(d, entry);
			if (statSync(path).isDirectory()) walk(path);
			else files.set(relative(dir, path).split(sep).join('/'), () => readFileSync(path));
		}
	};
	walk(join(dir, 'assets'));
	for (const [k, v] of [...files]) {
		files.delete(k);
		files.set('assets/' + k, v);
	}
	return files;
}

const sources = process.argv.slice(2);
if (sources.length === 0) {
	console.error('usage: node scripts/museum-item-icons.mjs <minecraft client .jar> [resource packs...]');
	process.exit(1);
}
/** Later sources win. */
const assets = new Map();
for (const source of sources) {
	for (const [k, v] of statSync(source).isDirectory() ? readDir(source) : readZip(source)) assets.set(k, v);
}

const id = (ref, ns = 'minecraft') => (ref.includes(':') ? ref.split(':', 2) : [ns, ref]);
const asset = (ns, path) => assets.get(`assets/${ns}/${path}`)?.();
const json = (ns, path) => {
	const data = asset(ns, path);
	return data ? JSON.parse(data.toString('utf8').replace(/^﻿/, '')) : undefined;
};

// ---------------------------------------------------------------- png

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

/** RGBA, 8 bits per channel. Throws on what Minecraft textures don't use (interlacing). */
function decodePng(buffer) {
	if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error('not a png');
	let width, height, depth, type, interlace, palette, transparency;
	const idat = [];
	for (let p = 8; p < buffer.length; ) {
		const length = buffer.readUInt32BE(p);
		const kind = buffer.toString('ascii', p + 4, p + 8);
		const body = buffer.subarray(p + 8, p + 8 + length);
		if (kind === 'IHDR') {
			width = body.readUInt32BE(0);
			height = body.readUInt32BE(4);
			depth = body[8];
			type = body[9];
			interlace = body[12];
		} else if (kind === 'PLTE') palette = body;
		else if (kind === 'tRNS') transparency = body;
		else if (kind === 'IDAT') idat.push(body);
		else if (kind === 'IEND') break;
		p += 12 + length;
	}
	if (interlace) throw new Error('interlaced png');
	const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[type];
	const bpp = Math.max(1, (channels * depth) >> 3);
	const stride = (width * channels * depth + 7) >> 3;
	const raw = zlib.inflateSync(Buffer.concat(idat));
	const rows = Buffer.alloc(stride * height);
	for (let y = 0; y < height; y++) {
		const filter = raw[y * (stride + 1)];
		const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
		const out = rows.subarray(y * stride, (y + 1) * stride);
		const prev = y > 0 ? rows.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
		for (let x = 0; x < stride; x++) {
			const a = x >= bpp ? out[x - bpp] : 0;
			const b = prev[x];
			const c = x >= bpp ? prev[x - bpp] : 0;
			let v = line[x];
			if (filter === 1) v += a;
			else if (filter === 2) v += b;
			else if (filter === 3) v += (a + b) >> 1;
			else if (filter === 4) {
				const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
				v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
			}
			out[x] = v & 255;
		}
	}
	/** The i-th sample of row y, as stored. */
	const rawSample = (y, i) => {
		if (depth === 8) return rows[y * stride + i];
		if (depth === 16) return rows.readUInt16BE(y * stride + i * 2);
		const bit = i * depth;
		return (rows[y * stride + (bit >> 3)] >> (8 - depth - (bit & 7))) & ((1 << depth) - 1);
	};
	const max = (1 << depth) - 1;
	/** The same, scaled to 8 bits. */
	const sample = (y, i) => Math.round((rawSample(y, i) * 255) / max);
	// Gray and RGB images without alpha can name one colour transparent (tRNS), as many of Minecraft's do.
	const keyed = (y, i, n) =>
		transparency !== undefined && [...Array(n).keys()].every((c) => rawSample(y, i + c) === transparency.readUInt16BE(c * 2));
	const pixels = new Uint8ClampedArray(width * height * 4);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const o = (y * width + x) * 4;
			if (type === 3) {
				const i = rawSample(y, x);
				pixels.set([palette[i * 3], palette[i * 3 + 1], palette[i * 3 + 2], transparency && i < transparency.length ? transparency[i] : 255], o);
			} else if (type === 0 || type === 4) {
				const g = sample(y, x * channels);
				pixels.set([g, g, g, type === 4 ? sample(y, x * 2 + 1) : keyed(y, x, 1) ? 0 : 255], o);
			} else {
				const alpha = type === 6 ? sample(y, x * 4 + 3) : keyed(y, x * 3, 3) ? 0 : 255;
				pixels.set([sample(y, x * channels), sample(y, x * channels + 1), sample(y, x * channels + 2), alpha], o);
			}
		}
	}
	return { width, height, pixels };
}

function encodePng({ width, height, pixels }) {
	const stride = width * 4;
	const raw = Buffer.alloc((stride + 1) * height);
	const candidate = Buffer.alloc(stride);
	for (let y = 0; y < height; y++) {
		// the filter with the smallest sum of absolute values: the usual heuristic
		let best = Infinity;
		for (let filter = 0; filter <= 4; filter++) {
			let sum = 0;
			for (let x = 0; x < stride; x++) {
				const v = pixels[y * stride + x];
				const a = x >= 4 ? pixels[y * stride + x - 4] : 0;
				const b = y > 0 ? pixels[(y - 1) * stride + x] : 0;
				const c = x >= 4 && y > 0 ? pixels[(y - 1) * stride + x - 4] : 0;
				let p = 0;
				if (filter === 1) p = a;
				else if (filter === 2) p = b;
				else if (filter === 3) p = (a + b) >> 1;
				else if (filter === 4) {
					const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
					p = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
				}
				candidate[x] = (v - p) & 255;
				sum += candidate[x] < 128 ? candidate[x] : 256 - candidate[x];
			}
			if (sum < best) {
				best = sum;
				raw[y * (stride + 1)] = filter;
				candidate.copy(raw, y * (stride + 1) + 1);
			}
		}
	}
	const chunk = (kind, body) => {
		const head = Buffer.alloc(8);
		head.writeUInt32BE(body.length, 0);
		head.write(kind, 4, 'ascii');
		const crc = Buffer.alloc(4);
		crc.writeUInt32BE(zlib.crc32(Buffer.concat([head.subarray(4), body])) >>> 0);
		return Buffer.concat([head, body, crc]);
	};
	const header = Buffer.alloc(13);
	header.writeUInt32BE(width, 0);
	header.writeUInt32BE(height, 4);
	header[8] = 8;
	header[9] = 6;
	return Buffer.concat([
		PNG_SIGNATURE,
		chunk('IHDR', header),
		chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
		chunk('IEND', Buffer.alloc(0))
	]);
}

// ---------------------------------------------------------------- textures

const textureCache = new Map();

/** A texture's first animation frame, or null if it doesn't exist. */
function texture(ref) {
	const [ns, path] = id(ref);
	const key = `${ns}:${path}`;
	if (textureCache.has(key)) return textureCache.get(key);
	let result = null;
	const data = asset(ns, `textures/${path}.png`);
	if (data) {
		try {
			const image = decodePng(data);
			const animation = json(ns, `textures/${path}.png.mcmeta`)?.animation;
			if (animation) {
				const frameWidth = animation.width ?? Math.min(image.width, image.height);
				const frameHeight = animation.height ?? frameWidth;
				image.width = Math.min(image.width, frameWidth);
				const pixels = new Uint8ClampedArray(image.width * frameHeight * 4);
				for (let y = 0; y < frameHeight; y++) {
					pixels.set(image.pixels.subarray(y * image.pixels.length / image.height, y * image.pixels.length / image.height + image.width * 4), y * image.width * 4);
				}
				image.height = frameHeight;
				image.pixels = pixels;
			}
			result = image;
		} catch (e) {
			console.warn(`  ${key}: ${e.message}`);
		}
	}
	textureCache.set(key, result);
	return result;
}

/** Nearest texel at (u, v) in 0..1, as [r, g, b, a] in 0..255. */
function sample(image, u, v) {
	const x = Math.min(image.width - 1, Math.max(0, Math.floor(u * image.width)));
	const y = Math.min(image.height - 1, Math.max(0, Math.floor(v * image.height)));
	const o = (y * image.width + x) * 4;
	return image.pixels.subarray(o, o + 4);
}

// ---------------------------------------------------------------- tints

let grassColormap;
function grass(temperature, downfall) {
	grassColormap ??= texture('minecraft:colormap/grass');
	if (!grassColormap) return [0x7c, 0xbd, 0x6b];
	const t = Math.min(1, Math.max(0, temperature));
	const d = Math.min(1, Math.max(0, downfall)) * t;
	const c = sample(grassColormap, (1 - t) * 0.999, (1 - d) * 0.999);
	return [c[0], c[1], c[2]];
}

/** An item tint source, resolved to the colour it gives an item with no components. */
function tint(source) {
	if (!source) return null;
	if (source.type === 'minecraft:grass') return grass(source.temperature ?? 0.5, source.downfall ?? 1);
	const value = source.value ?? source.default;
	if (value === undefined) return null;
	if (Array.isArray(value)) return value.map((c) => Math.round(c * 255));
	return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

// ---------------------------------------------------------------- models

/** A block/item model with its parents merged: textures, elements, gui transform and lighting. */
function resolveModel(ref) {
	const textures = {};
	let elements, gui, light, generated = false;
	for (let depth = 0; ref && depth < 32; depth++) {
		if (ref === 'builtin/generated' || ref === 'minecraft:builtin/generated') {
			generated = true;
			break;
		}
		const [ns, path] = id(ref);
		const model = json(ns, `models/${path}.json`);
		if (!model) return null;
		for (const [k, v] of Object.entries(model.textures ?? {})) textures[k] ??= v;
		elements ??= model.elements;
		gui ??= model.display?.gui;
		light ??= model.gui_light;
		ref = model.parent;
	}
	// A face's texture is always a reference into `textures`; the leading # is optional there.
	const lookup = (name) => {
		let value = name.startsWith('#') ? name : '#' + name;
		for (let i = 0; i < 16 && typeof value === 'string' && value.startsWith('#'); i++) value = textures[value.slice(1)];
		if (value && typeof value === 'object') value = value.sprite;
		return typeof value === 'string' ? value : undefined;
	};
	return { textures, lookup, elements: generated ? null : elements, generated, gui, light: light ?? 'side' };
}

/**
 * The model the item shows in the inventory, with no components: the GUI case
 * of a display-context switch, the false side of a condition, the fallback of
 * anything else.
 */
function pickModels(model, out = []) {
	if (!model) return out;
	switch (model.type.replace(/^minecraft:/, '')) {
		case 'model':
			out.push({ kind: 'model', model: model.model, tints: model.tints ?? [] });
			break;
		case 'composite':
			for (const part of model.models) pickModels(part, out);
			break;
		case 'condition':
			pickModels(model.on_false, out);
			break;
		case 'select': {
			const gui = model.property === 'minecraft:display_context' && model.cases.find((c) => [c.when].flat().includes('gui'));
			pickModels(gui ? gui.model : model.fallback ?? model.cases[0]?.model, out);
			break;
		}
		case 'range_dispatch':
			pickModels(model.entries?.[0]?.model ?? model.fallback, out);
			break;
		case 'special':
			out.push({ kind: 'special', special: model.model, base: model.base });
			break;
		// 'empty', 'bundle/selected_item': nothing to draw
	}
	return out;
}

// ---------------------------------------------------------------- drawing

class Canvas {
	constructor(size) {
		this.size = size;
		this.pixels = new Uint8ClampedArray(size * size * 4);
		this.depth = new Float32Array(size * size).fill(-Infinity);
	}
	/** Blends a colour into the pixel; opaque ones also pass a depth test and write depth. */
	put(x, y, z, [r, g, b, a]) {
		const i = y * this.size + x;
		if (a === 0 || z < this.depth[i] - 1e-6) return;
		const o = i * 4;
		if (a >= 255) {
			this.depth[i] = z;
			this.pixels.set([r, g, b, 255], o);
			return;
		}
		const alpha = a / 255;
		const under = this.pixels[o + 3] / 255;
		const out = alpha + under * (1 - alpha);
		for (let c = 0; c < 3; c++) {
			this.pixels[o + c] = ([r, g, b][c] * alpha + this.pixels[o + c] * under * (1 - alpha)) / out;
		}
		this.pixels[o + 3] = out * 255;
	}
	empty() {
		for (let i = 3; i < this.pixels.length; i += 4) if (this.pixels[i]) return false;
		return true;
	}
}

const shadeTint = (color, shade, tintColor) => [
	(color[0] * shade * (tintColor ? tintColor[0] : 255)) / 255,
	(color[1] * shade * (tintColor ? tintColor[1] : 255)) / 255,
	(color[2] * shade * (tintColor ? tintColor[2] : 255)) / 255,
	color[3]
];

/** A flat item: its layers on top of each other, each with its tint. */
function drawGenerated(canvas, resolved, tints) {
	for (let layer = 0; ; layer++) {
		const ref = resolved.lookup(`#layer${layer}`);
		if (!ref) break;
		const image = texture(ref);
		if (!image) continue;
		const tintColor = tint(tints[layer]);
		for (let y = 0; y < canvas.size; y++) {
			for (let x = 0; x < canvas.size; x++) {
				canvas.put(x, y, 0, shadeTint(sample(image, (x + 0.5) / canvas.size, (y + 0.5) / canvas.size), 1, tintColor));
			}
		}
	}
}

const rad = (deg) => (deg * Math.PI) / 180;
function rotate([x, y, z], axis, angle) {
	const c = Math.cos(angle), s = Math.sin(angle);
	if (axis === 'x') return [x, y * c - z * s, y * s + z * c];
	if (axis === 'y') return [x * c + z * s, y, -x * s + z * c];
	return [x * c - y * s, x * s + y * c, z];
}

/**
 * Each face's corner at (s, t), s along the texture's u and t along its v
 * (both 0..1), for an element from a to b. Matches the default UVs the game
 * gives a face, so explicit UVs map the same way.
 */
const FACES = {
	down: { normal: [0, -1, 0], at: (a, b, s, t) => [a[0] + (b[0] - a[0]) * s, a[1], b[2] - (b[2] - a[2]) * t], uv: (a, b) => [a[0], 16 - b[2], b[0], 16 - a[2]] },
	up: { normal: [0, 1, 0], at: (a, b, s, t) => [a[0] + (b[0] - a[0]) * s, b[1], a[2] + (b[2] - a[2]) * t], uv: (a, b) => [a[0], a[2], b[0], b[2]] },
	north: { normal: [0, 0, -1], at: (a, b, s, t) => [b[0] - (b[0] - a[0]) * s, b[1] - (b[1] - a[1]) * t, a[2]], uv: (a, b) => [16 - b[0], 16 - b[1], 16 - a[0], 16 - a[1]] },
	south: { normal: [0, 0, 1], at: (a, b, s, t) => [a[0] + (b[0] - a[0]) * s, b[1] - (b[1] - a[1]) * t, b[2]], uv: (a, b) => [a[0], 16 - b[1], b[0], 16 - a[1]] },
	west: { normal: [-1, 0, 0], at: (a, b, s, t) => [a[0], b[1] - (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * s], uv: (a, b) => [a[2], 16 - b[1], b[2], 16 - a[1]] },
	east: { normal: [1, 0, 0], at: (a, b, s, t) => [b[0], b[1] - (b[1] - a[1]) * t, b[2] - (b[2] - a[2]) * s], uv: (a, b) => [16 - b[2], 16 - b[1], 16 - a[2], 16 - a[1]] }
};

/** The world's directional shading, which is what side-lit inventory blocks look like. */
const SHADE = { up: 1, down: 0.5, north: 0.8, south: 0.8, east: 0.6, west: 0.6 };

/**
 * Model elements (cuboids in 0..16 block space) through the GUI transform:
 * ItemTransform's translate · rotate(XYZ) · scale, seen orthographically from +Z.
 */
function drawElements(canvas, elements, lookup, gui, light, tints) {
	const rotation = (gui?.rotation ?? [0, 0, 0]).map(rad);
	const translation = (gui?.translation ?? [0, 0, 0]).map((v) => v / 16);
	const scale = gui?.scale ?? [1, 1, 1];
	const toScreen = (p) => {
		let v = [p[0] / 16 - 0.5, p[1] / 16 - 0.5, p[2] / 16 - 0.5].map((c, i) => c * scale[i]);
		v = rotate(v, 'z', rotation[2]);
		v = rotate(v, 'y', rotation[1]);
		v = rotate(v, 'x', rotation[0]);
		v = v.map((c, i) => c + translation[i]);
		return [(v[0] + 0.5) * canvas.size, (0.5 - v[1]) * canvas.size, v[2]];
	};
	for (const element of elements) {
		const { from: a, to: b } = element;
		const r = element.rotation;
		const place = (p) => {
			if (!r || !r.angle) return p;
			const origin = r.origin ?? [8, 8, 8];
			let v = p.map((c, i) => c - origin[i]);
			v = rotate(v, r.axis, rad(r.angle));
			if (r.rescale) {
				const f = 1 / Math.cos(rad(Math.abs(r.angle) > 45 ? 90 - Math.abs(r.angle) : r.angle));
				v = v.map((c, i) => ('xyz'[i] === r.axis ? c : c * f));
			}
			return v.map((c, i) => c + origin[i]);
		};
		for (const [name, face] of Object.entries(element.faces ?? {})) {
			const info = FACES[name];
			const image = texture(lookup(face.texture) ?? 'minecraft:missingno');
			if (!info || !image) continue;
			const uv = face.uv ?? info.uv(a, b);
			const turn = ((face.rotation ?? 0) / 90) & 3;
			const tex = (s, t) => {
				// the face's own rotation turns the texture clockwise in 90° steps
				[s, t] = [[s, t], [t, 1 - s], [1 - s, 1 - t], [1 - t, s]][turn];
				return [(uv[0] + (uv[2] - uv[0]) * s) / 16, (uv[1] + (uv[3] - uv[1]) * t) / 16];
			};
			const shade = light === 'front' || element.shade === false ? 1 : SHADE[name];
			const tintColor = face.tintindex !== undefined && face.tintindex >= 0 ? tint(tints[face.tintindex]) : null;
			const corners = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([s, t]) => ({ p: toScreen(place(info.at(a, b, s, t))), uv: tex(s, t) }));
			// back faces would only ever be hidden behind front ones, except on flat planes (crosses, panes),
			// which are meant to be seen from both sides
			for (const triangle of [[corners[0], corners[1], corners[2]], [corners[0], corners[2], corners[3]]]) {
				fillTriangle(canvas, triangle, image, shade, tintColor);
			}
		}
	}
}

function fillTriangle(canvas, [A, B, C], image, shade, tintColor) {
	const [x0, y0] = A.p, [x1, y1] = B.p, [x2, y2] = C.p;
	const area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
	if (Math.abs(area) < 1e-9) return;
	const minX = Math.max(0, Math.floor(Math.min(x0, x1, x2))), maxX = Math.min(canvas.size - 1, Math.ceil(Math.max(x0, x1, x2)));
	const minY = Math.max(0, Math.floor(Math.min(y0, y1, y2))), maxY = Math.min(canvas.size - 1, Math.ceil(Math.max(y0, y1, y2)));
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			const px = x + 0.5, py = y + 0.5;
			const w0 = ((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)) / area;
			const w1 = ((x2 - px) * (y0 - py) - (x0 - px) * (y2 - py)) / area;
			const w2 = 1 - w0 - w1;
			if (w0 < -1e-6 || w1 < -1e-6 || w2 < -1e-6) continue;
			const z = w0 * A.p[2] + w1 * B.p[2] + w2 * C.p[2];
			const u = w0 * A.uv[0] + w1 * B.uv[0] + w2 * C.uv[0];
			const v = w0 * A.uv[1] + w1 * B.uv[1] + w2 * C.uv[1];
			canvas.put(x, y, z, shadeTint(sample(image, u, v), shade, tintColor));
		}
	}
}

// ---------------------------------------------------------------- special renderers

/**
 * A cuboid textured the way entity models are: the box's faces laid out around
 * (u, v) on a texture of the given size, all in texture pixels. Returned as a
 * model element in 0..16 space.
 */
function entityBox(texture, [tw, th], [u, v], from, to, size = [to[0] - from[0], to[1] - from[1], to[2] - from[2]]) {
	const [w, h, d] = size;
	const rect = (x, y, rw, rh) => [(x / tw) * 16, (y / th) * 16, ((x + rw) / tw) * 16, ((y + rh) / th) * 16];
	const flipV = ([u1, v1, u2, v2]) => [u1, v2, u2, v1];
	return {
		from,
		to,
		faces: {
			up: { texture, uv: rect(u + d, v, w, d) },
			down: { texture, uv: flipV(rect(u + d + w, v, w, d)) },
			east: { texture, uv: rect(u, v + d, d, h) },
			north: { texture, uv: rect(u + d, v + d, w, h) },
			west: { texture, uv: rect(u + d + w, v + d, d, h) },
			south: { texture, uv: rect(u + d + w + d, v + d, w, h) }
		}
	};
}

/**
 * One rectangle of a texture on a plane facing the viewer (south): banners and
 * shields, which the game draws as thin entity models, read best flat.
 */
function flat(texture, [tw, th], [x, y, w, h], from, to, tintindex) {
	const uv = [(x / tw) * 16, (y / th) * 16, ((x + w) / tw) * 16, ((y + h) / th) * 16];
	return { from, to, faces: { south: { texture, uv, tintindex } } };
}

/** The skull renderer's shape: an 8×8×8 head on the floor of the item's space. */
const HEAD = [[4, 0, 4], [12, 8, 12]];

/** The colours of dyed banners. */
const DYES = {
	white: 0xf9fffe, orange: 0xf9801d, magenta: 0xc74ebd, light_blue: 0x3ab3da, yellow: 0xfed83d, lime: 0x80c71f,
	pink: 0xf38baa, gray: 0x474f52, light_gray: 0x9d9d97, cyan: 0x169c9c, purple: 0x8932b8, blue: 0x3c44aa,
	brown: 0x835432, green: 0x5e7c16, red: 0xb02e26, black: 0x1d1d21
};

/** Faces viewed straight on, lit from the front: the flat specials. */
const FLAT_GUI = { gui: { rotation: [0, 0, 0], scale: [1, 1, 1] }, light: 'front' };

/**
 * The special renderers worth drawing, as model elements on their entity
 * textures: { elements, tints, gui?, light? }. The others are left out.
 */
function special(special) {
	const type = special.type.replace(/^minecraft:/, '');
	switch (type) {
		case 'chest': {
			const t = `minecraft:entity/chest/${id(special.texture)[1]}`;
			const s = [64, 64];
			return {
				elements: [
					entityBox(t, s, [0, 19], [1, 0, 1], [15, 10, 15]),
					entityBox(t, s, [0, 0], [1, 9, 1], [15, 14, 15]),
					entityBox(t, s, [0, 0], [7, 7, 15], [9, 11, 16], [2, 4, 1])
				].map(frontSouth)
			};
		}
		case 'shulker_box': {
			const t = `minecraft:entity/shulker/${id(special.texture)[1]}`;
			const s = [64, 64];
			return { elements: [entityBox(t, s, [0, 28], [0, 0, 0], [16, 8, 16]), entityBox(t, s, [0, 0], [0, 4, 0], [16, 16, 16])] };
		}
		case 'head': {
			if (special.kind === 'dragon') {
				const t = 'minecraft:entity/enderdragon/dragon';
				return {
					elements: [
						entityBox(t, [256, 256], [112, 30], [3, 0, 1], [13, 10, 11], [16, 16, 16]),
						entityBox(t, [256, 256], [176, 44], [4.5, 1, 11], [11.5, 4, 16], [12, 5, 16])
					].map(frontSouth)
				};
			}
			const skull = { skeleton: 'skeleton/skeleton', wither_skeleton: 'skeleton/wither_skeleton', zombie: 'zombie/zombie', creeper: 'creeper/creeper', piglin: 'piglin/piglin' }[special.kind];
			const image = skull && texture(`minecraft:entity/${skull}`);
			if (!image) return null;
			return { elements: [entityBox(`minecraft:entity/${skull}`, [image.width, image.height], [0, 0], ...HEAD)].map(frontSouth) };
		}
		case 'player_head': {
			const t = 'minecraft:entity/player/wide/steve';
			const hat = entityBox(t, [64, 64], [32, 0], [3.5, -0.5, 3.5], [12.5, 8.5, 12.5], [8, 8, 8]);
			return { elements: [entityBox(t, [64, 64], [0, 0], ...HEAD), hat].map(frontSouth) };
		}
		case 'banner': {
			const t = 'minecraft:entity/banner/banner_base';
			const s = [64, 64];
			// the flag (20×40) under its bar, scaled to fill the slot's height
			return {
				...FLAT_GUI,
				elements: [
					flat(t, s, [1, 1, 20, 40], [4.25, 0.5, 8], [11.75, 15.5, 8]),
					flat(t, s, [2, 44, 20, 2], [3.75, 15, 8.5], [12.25, 16, 8.5])
				].map((element, i) => (i === 0 ? { ...element, faces: { south: { ...element.faces.south, tintindex: 0 } } } : element)),
				tints: [{ value: DYES[special.color] ?? DYES.white }]
			};
		}
		case 'shield': {
			const t = 'minecraft:entity/shield/shield_base_nopattern';
			return { ...FLAT_GUI, elements: [flat(t, [64, 64], [1, 1, 12, 22], [3.75, 0, 8], [12.25, 16, 8])] };
		}
		case 'decorated_pot': {
			const side = 'minecraft:entity/decorated_pot/decorated_pot_side';
			const base = 'minecraft:entity/decorated_pot/decorated_pot_base';
			const body = { from: [1, 0, 1], to: [15, 13, 15], faces: {} };
			for (const face of ['north', 'south', 'east', 'west']) body.faces[face] = { texture: side, uv: [1, 0, 15, 13] };
			body.faces.up = { texture: base, uv: [0, 6.5, 7, 13.5] };
			body.faces.down = { texture: base, uv: [7, 6.5, 14, 13.5] };
			return { elements: [body, entityBox(base, [32, 32], [0, 0], [4, 13, 4], [12, 16, 12], [8, 3, 8])], gui: { rotation: [30, 45, 0], scale: [0.6, 0.6, 0.6] } };
		}
		case 'conduit': {
			return { elements: [entityBox('minecraft:entity/conduit/base', [32, 16], [0, 0], [5, 5, 5], [11, 11, 11])] };
		}
		default:
			return null;
	}
}

/**
 * Entity models face -Z with x mirrored; the item renderers turn them so their
 * front (the cube layout's "north" rectangle) faces south, which the special
 * items' GUI rotation of [30, 45, 0] shows on the right, as a furnace's front.
 */
function frontSouth(element) {
	const f = element.faces;
	element.faces = { ...f, north: f.south, south: f.north, east: f.west, west: f.east };
	for (const name of ['north', 'south', 'east', 'west']) {
		const uv = element.faces[name].uv;
		element.faces[name] = { ...element.faces[name], uv: [uv[2], uv[1], uv[0], uv[3]] };
	}
	return element;
}

// ---------------------------------------------------------------- items

function renderItem(definition) {
	const canvas = new Canvas(ICON);
	for (const part of pickModels(definition.model)) {
		if (part.kind === 'model') {
			const resolved = resolveModel(part.model);
			if (!resolved) continue;
			if (resolved.generated) drawGenerated(canvas, resolved, part.tints);
			else if (resolved.elements) drawElements(canvas, resolved.elements, resolved.lookup, resolved.gui, resolved.light, part.tints);
		} else {
			const drawn = special(part.special);
			if (!drawn) continue;
			const gui = drawn.gui ?? (part.base && resolveModel(part.base)?.gui) ?? { rotation: [30, 45, 0], scale: [0.625, 0.625, 0.625] };
			drawElements(canvas, drawn.elements, (t) => t, gui, drawn.light ?? 'side', drawn.tints ?? []);
		}
	}
	return canvas.empty() ? null : canvas;
}

const items = [...assets.keys()]
	.map((key) => key.match(/^assets\/([^/]+)\/items\/(.+)\.json$/))
	.filter(Boolean)
	.map(([, ns, path]) => `${ns}:${path}`)
	.sort();

const rendered = [];
const missing = [];
for (const item of items) {
	const [ns, path] = id(item);
	try {
		const icon = renderItem(json(ns, `items/${path}.json`));
		if (icon) rendered.push({ item, icon });
		else missing.push(item);
	} catch (e) {
		missing.push(item);
		console.warn(`  ${item}: ${e.message}`);
	}
}

const rows = Math.ceil(rendered.length / COLUMNS);
const atlas = { width: COLUMNS * ICON, height: rows * ICON, pixels: new Uint8ClampedArray(COLUMNS * ICON * rows * ICON * 4) };
rendered.forEach(({ icon }, i) => {
	const ox = (i % COLUMNS) * ICON, oy = Math.floor(i / COLUMNS) * ICON;
	for (let y = 0; y < ICON; y++) {
		atlas.pixels.set(icon.pixels.subarray(y * ICON * 4, (y + 1) * ICON * 4), ((oy + y) * atlas.width + ox) * 4);
	}
});

const png = encodePng(atlas);
writeFileSync(join(ROOT, 'src/lib/images/museum-items.png'), png);
writeFileSync(
	join(ROOT, 'src/lib/museum-items.json'),
	JSON.stringify({ size: ICON, columns: COLUMNS, ids: rendered.map(({ item }) => item) }) + '\n'
);
const steve = asset('minecraft', 'textures/entity/player/wide/steve.png');
if (steve) writeFileSync(join(ROOT, 'src/lib/images/museum-steve.png'), steve);

console.log(`${rendered.length} icons (${(png.length / 1024).toFixed(0)} KiB), ${missing.length} without one`);
if (missing.length) console.log(`  without: ${missing.join(' ')}`);
