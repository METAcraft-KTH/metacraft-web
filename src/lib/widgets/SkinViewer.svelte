<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	/**
	 * 3D Minecraft skin previewer built on CSS 3D transforms.
	 * ponytail: no three.js — a skin is 12 axis-aligned boxes with flat, unlit
	 * texturing, which `transform-style: preserve-3d` renders natively. Switch to
	 * a real WebGL renderer only if this ever needs lighting, capes or animation
	 * beyond a walk cycle.
	 */
	interface Props {
		/** Skin image URL (64x64 PNG). */
		src: string;
		/** Pixels per Minecraft unit. */
		scale?: number;
		alt?: string;
	}

	let { src, scale = 6, alt = '' }: Props = $props();

	let yaw = $state(-25);
	let pitch = $state(-12);
	let dragging = $state(false);
	let walking = $state(true);
	let t = $state(0);

	// walk cycle
	$effect(() => {
		if (!walking) return;
		let raf = 0;
		const start = performance.now();
		const tick = (now: number) => {
			t = (now - start) / 1000;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	const swing = $derived(walking ? Math.sin(t * 5) * 32 : 0);

	function drag(e: PointerEvent) {
		if (!dragging) return;
		yaw += e.movementX * 0.6;
		pitch = Math.max(-80, Math.min(80, pitch + e.movementY * 0.6));
	}

	/**
	 * One cuboid: six faces, each showing a rect of the skin sheet.
	 * `u`/`v` are the top-left of the box's texture region, laid out in the
	 * standard Minecraft cross: right, front, left, back on the middle row,
	 * top and bottom above it.
	 */
	type Box = { w: number; h: number; d: number; u: number; v: number };

	// [x, y, z] size in MC units, and [u, v] sheet origin
	const HEAD: Box = { w: 8, h: 8, d: 8, u: 0, v: 0 };
	const HAT: Box = { w: 8, h: 8, d: 8, u: 32, v: 0 };
	const BODY: Box = { w: 8, h: 12, d: 4, u: 16, v: 16 };
	const JACKET: Box = { w: 8, h: 12, d: 4, u: 16, v: 32 };
	const RARM: Box = { w: 4, h: 12, d: 4, u: 40, v: 16 };
	const RARM2: Box = { w: 4, h: 12, d: 4, u: 40, v: 32 };
	const LARM: Box = { w: 4, h: 12, d: 4, u: 32, v: 48 };
	const LARM2: Box = { w: 4, h: 12, d: 4, u: 48, v: 48 };
	const RLEG: Box = { w: 4, h: 12, d: 4, u: 0, v: 16 };
	const RLEG2: Box = { w: 4, h: 12, d: 4, u: 0, v: 32 };
	const LLEG: Box = { w: 4, h: 12, d: 4, u: 16, v: 48 };
	const LLEG2: Box = { w: 4, h: 12, d: 4, u: 0, v: 48 };

	/** The six faces of a box: css transform + which sheet rect to show. */
	function faces(b: Box, s: number) {
		const { w, h, d, u, v } = b;
		// [name, width, height, transform, texture x, texture y]
		return [
			['top', w, d, `rotateX(90deg) translateZ(${(h / 2) * s}px)`, u + d, v],
			['bottom', w, d, `rotateX(-90deg) translateZ(${(h / 2) * s}px) rotate(180deg)`, u + d + w, v],
			['right', d, h, `rotateY(-90deg) translateZ(${(w / 2) * s}px)`, u, v + d],
			['front', w, h, `translateZ(${(d / 2) * s}px)`, u + d, v + d],
			['left', d, h, `rotateY(90deg) translateZ(${(w / 2) * s}px)`, u + d + w, v + d],
			['back', w, h, `rotateY(180deg) translateZ(${(d / 2) * s}px)`, u + d + w + d, v + d]
		] as const;
	}
</script>

<div class="flex flex-col items-center gap-3 select-none">
	<div
		class="relative rounded-lg w-full h-80 overflow-hidden cursor-grab touch-none stage {dragging ? 'cursor-grabbing' : ''}"
		role="img"
		aria-label={alt}
		onpointerdown={(e) => {
			dragging = true;
			e.currentTarget.setPointerCapture(e.pointerId);
		}}
		onpointerup={(e) => {
			dragging = false;
			e.currentTarget.releasePointerCapture(e.pointerId);
		}}
		onpointermove={drag}
	>
		<div class="top-1/2 left-1/2 absolute scene">
			<div class="root" style="transform: rotateX({pitch}deg) rotateY({yaw}deg)">
				<!-- head + hat -->
				{@render part(0, -22 * scale, 2 * scale, 0, [
					[HEAD, scale],
					[HAT, scale * 1.09]
				])}

				<!-- body + jacket -->
				{@render part(0, -14 * scale, 0, 0, [
					[BODY, scale],
					[JACKET, scale * 1.09]
				])}

				<!-- arms swing opposite the legs -->
				{@render part(-6 * scale, -14 * scale, 0, -swing, [
					[RARM, scale],
					[RARM2, scale * 1.09]
				])}
				{@render part(6 * scale, -14 * scale, 0, swing, [
					[LARM, scale],
					[LARM2, scale * 1.09]
				])}

				<!-- legs -->
				{@render part(-2 * scale, -2 * scale, 0, swing, [
					[RLEG, scale],
					[RLEG2, scale * 1.09]
				])}
				{@render part(2 * scale, -2 * scale, 0, -swing, [
					[LLEG, scale],
					[LLEG2, scale * 1.09]
				])}
			</div>
		</div>
	</div>

	<div class="flex items-center gap-4 text-sm">
		<label class="flex items-center gap-2 cursor-pointer">
			<input type="checkbox" bind:checked={walking} />
			<span class="font-mc">{m.style_walk()}</span>
		</label>
		<button
			type="button"
			class="font-mc underline notButton"
			onclick={() => {
				yaw = -25;
				pitch = -12;
			}}
		>
			{m.style_reset_view()}
		</button>
	</div>
</div>

<!--
	A limb pivots at its top edge, so it hangs from the shoulder/hip rather than
	spinning about its middle: rotate the joint, then drop the box half its height.
-->
{#snippet part(x: number, y: number, z: number, angle: number, layers: [Box, number][])}
	<div class="joint" style="transform: translate3d({x}px, {y}px, {z}px) rotateX({angle}deg)">
		{#each layers as [b, s] (b.u + ':' + b.v)}
			<div
				class="box"
				style="
					width: {b.w * s}px;
					height: {b.h * s}px;
					transform: translate3d({(-b.w * s) / 2}px, 0, {(-b.d * s) / 2}px);
				"
			>
				{#each faces(b, s) as [name, fw, fh, transform, tx, ty] (name)}
					<div
						class="face"
						style="
							width: {fw * s}px;
							height: {fh * s}px;
							margin-left: {(b.w * s - fw * s) / 2}px;
							margin-top: {(b.h * s - fh * s) / 2}px;
							transform: {transform};
							background-image: url({src});
							background-size: {64 * s}px {64 * s}px;
							background-position: {-tx * s}px {-ty * s}px;
						"
					></div>
				{/each}
			</div>
		{/each}
	</div>
{/snippet}

<style>
	.stage {
		background: radial-gradient(ellipse at center, #0000000d, #00000026);
		perspective: 900px;
	}
	.scene,
	.root,
	.joint,
	.box {
		transform-style: preserve-3d;
		position: absolute;
	}
	.joint {
		/* pivot at the top of the limb */
		transform-origin: 50% 0;
	}
	.face {
		position: absolute;
		image-rendering: pixelated;
		backface-visibility: hidden;
		/* kill the seams between adjacent faces on fractional scales */
		outline: 1px solid transparent;
	}
	@media (prefers-reduced-motion: reduce) {
		.joint {
			transition: none;
		}
	}
</style>
