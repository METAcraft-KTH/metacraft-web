import * as THREE from 'three';

/** Minecraft's fixed per-face shading, so the models look like they do in game. */
const SHADE = { up: 1, down: 0.5, north: 0.8, south: 0.8, east: 0.6, west: 0.6 } as const;
type Face = keyof typeof SHADE;

interface BlockbenchFace {
	uv: [number, number, number, number];
	texture?: string;
}
interface BlockbenchElement {
	from: [number, number, number];
	to: [number, number, number];
	shade?: boolean;
	rotation?: { angle: number; axis: 'x' | 'y' | 'z'; origin: [number, number, number] };
	faces?: Partial<Record<Face, BlockbenchFace>>;
}
interface BlockbenchModel {
	textures: Record<string, string>;
	elements: BlockbenchElement[];
}

const AXES = {
	x: new THREE.Vector3(1, 0, 0),
	y: new THREE.Vector3(0, 1, 0),
	z: new THREE.Vector3(0, 0, 1)
};

function loadTexture(url: string): Promise<THREE.Texture> {
	return new THREE.TextureLoader().loadAsync(url).then((tx) => {
		tx.magFilter = THREE.NearestFilter;
		tx.minFilter = THREE.NearestFilter;
		tx.generateMipmaps = false;
		tx.colorSpace = THREE.SRGBColorSpace;
		return tx;
	});
}

/**
 * Loads a Java-edition / Blockbench JSON model from `${dir}/${name}.json` (textures are
 * expected next to it as `${dir}/<texture>.png`). The result is centred on the origin and
 * scaled so its largest side is 1 unit.
 */
export async function loadBlockbenchModel(dir: string, name: string): Promise<THREE.Group> {
	const model: BlockbenchModel = await (await fetch(`${dir}/${name}.json`)).json();

	const resolveTexture = (ref: string) => {
		let value: string | undefined = model.textures[ref.replace('#', '')];
		while (value?.startsWith('#')) value = model.textures[value.slice(1)];
		return (value ?? '').split('/').pop()!.split(':').pop()!;
	};

	// one mesh per texture
	const buckets: Record<string, { pos: number[]; uv: number[]; col: number[]; idx: number[] }> = {};

	for (const e of model.elements) {
		const [x1, y1, z1] = e.from;
		const [x2, y2, z2] = e.to;
		const quads: Record<Face, number[][]> = {
			north: [[x2, y2, z1], [x1, y2, z1], [x1, y1, z1], [x2, y1, z1]],
			south: [[x1, y2, z2], [x2, y2, z2], [x2, y1, z2], [x1, y1, z2]],
			west: [[x1, y2, z1], [x1, y2, z2], [x1, y1, z2], [x1, y1, z1]],
			east: [[x2, y2, z2], [x2, y2, z1], [x2, y1, z1], [x2, y1, z2]],
			up: [[x1, y2, z1], [x2, y2, z1], [x2, y2, z2], [x1, y2, z2]],
			down: [[x1, y1, z2], [x2, y1, z2], [x2, y1, z1], [x1, y1, z1]]
		};
		const rot = e.rotation?.angle
			? {
					q: new THREE.Quaternion().setFromAxisAngle(
						AXES[e.rotation.axis],
						THREE.MathUtils.degToRad(e.rotation.angle)
					),
					o: new THREE.Vector3(...e.rotation.origin)
				}
			: null;

		for (const [dir, face] of Object.entries(e.faces ?? {}) as [Face, BlockbenchFace][]) {
			if (!face.texture) continue;
			const b = (buckets[resolveTexture(face.texture)] ??= { pos: [], uv: [], col: [], idx: [] });
			const [u1, v1, u2, v2] = face.uv;
			const uvs = [[u1, v1], [u2, v1], [u2, v2], [u1, v2]];
			const base = b.pos.length / 3;
			const shade = e.shade === false ? 1 : SHADE[dir];
			quads[dir].forEach((p, k) => {
				const v = new THREE.Vector3(p[0], p[1], p[2]);
				if (rot) v.sub(rot.o).applyQuaternion(rot.q).add(rot.o);
				b.pos.push(v.x, v.y, v.z);
				b.uv.push(uvs[k][0] / 16, 1 - uvs[k][1] / 16);
				b.col.push(shade, shade, shade);
			});
			b.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
		}
	}

	const group = new THREE.Group();
	await Promise.all(
		Object.entries(buckets).map(async ([tex, b]) => {
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3));
			geometry.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
			geometry.setAttribute('color', new THREE.Float32BufferAttribute(b.col, 3));
			geometry.setIndex(b.idx);
			const map = await loadTexture(`${dir}/${tex}.png`);
			const material = new THREE.MeshBasicMaterial({
				map,
				vertexColors: true,
				alphaTest: 0.1,
				side: THREE.DoubleSide
			});
			group.add(new THREE.Mesh(geometry, material));
		})
	);

	const box = new THREE.Box3().setFromObject(group);
	const centre = box.getCenter(new THREE.Vector3());
	const size = box.getSize(new THREE.Vector3());
	const k = 1 / Math.max(size.x, size.y, size.z);
	for (const child of group.children) {
		const mesh = child as THREE.Mesh;
		mesh.geometry.translate(-centre.x, -centre.y, -centre.z);
		mesh.geometry.scale(k, k, k);
	}
	return group;
}

/** Frees the GPU resources of a group returned by {@link loadBlockbenchModel}. */
export function disposeModel(group: THREE.Group) {
	for (const child of group.children) {
		const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
		mesh.geometry.dispose();
		mesh.material.map?.dispose();
		mesh.material.dispose();
	}
}
