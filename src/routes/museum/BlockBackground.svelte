<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** Block textures from top to bottom; neighbouring blocks dither into each other. */
		textures: string[];
		/** On-screen size of one block in px, before the blur. */
		block?: number;
	}

	let { textures, block = 72 }: Props = $props();

	let wrap: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ready = $state(false);

	/** Small seeded PRNG so the wall looks the same on every visit and resize. */
	function mulberry32(seed: number) {
		return () => {
			seed = (seed + 0x6d2b79f5) | 0;
			let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	onMount(() => {
		const TEX = 16; // draw at the textures' native resolution, CSS scales it up
		const images = textures.map((src) => {
			const img = new Image();
			img.src = src;
			return img;
		});
		let cols = 0;
		let rows = 0;

		const draw = () => {
			const c = Math.ceil(wrap.clientWidth / block) + 2;
			const r = Math.ceil(wrap.clientHeight / block) + 2;
			if (c === cols && r === rows) return;
			cols = c;
			rows = r;
			canvas.width = cols * TEX;
			canvas.height = rows * TEX;
			canvas.style.width = `${cols * block}px`;
			canvas.style.height = `${rows * block}px`;
			const ctx = canvas.getContext('2d')!;
			ctx.imageSmoothingEnabled = false;
			const rand = mulberry32(1337);
			const last = images.length - 1;
			for (let y = 0; y < rows; y++) {
				const s = (y / Math.max(1, rows - 1)) * last;
				const i = Math.min(Math.floor(s), last);
				const f = s - i;
				for (let x = 0; x < cols; x++) {
					// jittered threshold: blocks of the next texture creep in before the boundary
					const next = f + (rand() - 0.5) * 0.7 > 0.5;
					ctx.drawImage(images[Math.min(i + (next ? 1 : 0), last)], x * TEX, y * TEX, TEX, TEX);
				}
			}
			ready = true;
		};

		let ro: ResizeObserver | undefined;
		Promise.all(images.map((img) => img.decode().catch(() => {}))).then(() => {
			draw();
			ro = new ResizeObserver(draw);
			ro.observe(wrap);
		});
		return () => ro?.disconnect();
	});
</script>

<div class="wall" bind:this={wrap} aria-hidden="true">
	<canvas bind:this={canvas} class:ready></canvas>
	<div class="shade"></div>
</div>

<style>
	.wall {
		position: absolute;
		inset: 0;
		z-index: -10;
		overflow: hidden;
		background: #0b0d1a;
		pointer-events: none;
	}
	canvas {
		position: absolute;
		/* the extra block on each side hides the blur's soft edges */
		top: -72px;
		left: -72px;
		image-rendering: pixelated;
		filter: blur(16px) saturate(0.85);
		opacity: 0;
		transition: opacity 0.8s ease-out;
	}
	canvas.ready {
		opacity: 1;
	}
	.shade {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(5, 6, 14, 0.45) 70%),
			linear-gradient(rgba(7, 8, 18, 0.7), rgba(7, 8, 18, 0.7));
	}
</style>
