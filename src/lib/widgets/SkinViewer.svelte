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

	// Outer layers grow by a fixed number of MC units per side (Blockbench
	// "inflate"), taken from the vanilla player model.
	const HAT_INFLATE = 0.5;
	const LAYER_INFLATE = 0.25;

	// Middle of the whole model in screen units, used as the orbit centre when
	// dragging. It spans y -22..+10, so -6 sits in the lower torso. Every part
	// is centred at z=-2 (each joint shifts its box back by half its depth), so
	// the model's depth centre is -2, not 0.
	const MODEL_CENTRE_Y = -6;
	const MODEL_CENTRE_Z = -2;

	// Shoulder joint, as an offset from the arm box's centre-x / top-y.
	// Legs and head pivot at their box top, so they need no offset.
	const ARM_PIVOT_X = 1;
	const ARM_PIVOT_Y = 2;

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

	/**
	 * The six faces of a box: css transform + which sheet rect to show.
	 *
	 * `inflate` grows the box by a fixed number of MC units on every side, the
	 * way Blockbench/vanilla does it — NOT a percentage. The texture rect stays
	 * the same; only the geometry grows, so the outer layer floats just clear of
	 * the base without distorting its pixels.
	 */
	function faces(b: Box, s: number, inflate = 0) {
		const { u, v } = b;
		const w = b.w + inflate * 2;
		const h = b.h + inflate * 2;
		const d = b.d + inflate * 2;
		// [name, width, height, transform, texture x, texture y, texture scale]
		// UV rects come from the un-inflated box, then stretch over the bigger face.
		return [
			['top', w, d, `rotateX(90deg) translateZ(${(h / 2) * s}px)`, u + b.d, v, b.w, b.d],
			['bottom', w, d, `rotateX(-90deg) translateZ(${(h / 2) * s}px) rotate(180deg)`, u + b.d + b.w, v, b.w, b.d],
			['right', d, h, `rotateY(-90deg) translateZ(${(w / 2) * s}px)`, u, v + b.d, b.d, b.h],
			['front', w, h, `translateZ(${(d / 2) * s}px)`, u + b.d, v + b.d, b.w, b.h],
			['left', d, h, `rotateY(90deg) translateZ(${(w / 2) * s}px)`, u + b.d + b.w, v + b.d, b.d, b.h],
			['back', w, h, `rotateY(180deg) translateZ(${(d / 2) * s}px)`, u + b.d + b.w + b.d, v + b.d, b.w, b.h]
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
		<!-- the model's centre is at y=MODEL_CENTRE_Y, so lift the scene by it to
		     put that point (not the parts' hanging origin) at the viewport centre -->
		<div
			class="top-1/2 left-1/2 absolute scene"
			style="margin-top: {-MODEL_CENTRE_Y * scale}px"
		>
			<!--
				Orbit the model's own centre, not the origin the parts hang from.
				The model spans y -22..+10, so its middle is y=-6 (the lower
				torso): shift up by that, rotate, then shift back.
			-->
			<div
				class="root"
				style="transform: translate3d(0, {MODEL_CENTRE_Y * scale}px, {MODEL_CENTRE_Z * scale}px)
					rotateX({pitch}deg) rotateY({yaw}deg)
					translate3d(0, {-MODEL_CENTRE_Y * scale}px, {-MODEL_CENTRE_Z * scale}px);"
			>
				<!-- head + hat -->
				{@render part(0, -22 * scale, 2 * scale, 0, [
					[HEAD, 0],
					[HAT, HAT_INFLATE]
				])}

				<!-- body + jacket -->
				{@render part(0, -14 * scale, 0, 0, [
					[BODY, 0],
					[JACKET, LAYER_INFLATE]
				])}

				<!-- Arms swing opposite the legs. The first two args are the box's
				     centre-x / top-y; the trailing pair is the rotation pivot as an
				     offset from that point. The model puts the shoulder 1 unit
				     inboard and 2 down, so the arm swings from the joint rather
				     than from the middle of its top face. -->
				{@render part(-6 * scale, -14 * scale, 0, -swing, [
					[RARM, 0],
					[RARM2, LAYER_INFLATE]
				], [ARM_PIVOT_X, ARM_PIVOT_Y])}
				{@render part(6 * scale, -14 * scale, 0, swing, [
					[LARM, 0],
					[LARM2, LAYER_INFLATE]
				], [-ARM_PIVOT_X, ARM_PIVOT_Y])}

				<!-- legs sit at +-1.9, not +-2: the model nudges each leg 0.1 off
				     centre so the two inner faces don't z-fight. Here the box
				     centre and the model pivot happen to coincide. -->
				{@render part(-1.9 * scale, -2 * scale, 0, swing, [
					[RLEG, 0],
					[RLEG2, LAYER_INFLATE]
				])}
				{@render part(1.9 * scale, -2 * scale, 0, -swing, [
					[LLEG, 0],
					[LLEG2, LAYER_INFLATE]
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
{#snippet part(
	x: number,
	y: number,
	z: number,
	angle: number,
	layers: [Box, number][],
	pivot: [number, number] = [0, 0]
)}
	{@const [px, py] = pivot}
	{@const depth = layers[0][0].d}
	<!--
		Rotate about the model's pivot, then translate back, so the limb swings
		from the real joint rather than from the middle of its top face.

		The half-depth shift must be applied BEFORE rotateX (i.e. in the outer
		translate) so the rotation axis runs down the limb's centre line. Put it
		in the inner translate and it rotates with the limb, leaving the axis on
		the front face -- the limb then visibly hinges from its front edge.
	-->
	<div
		class="joint"
		style="transform: translate3d({x + px * scale}px, {y + py * scale}px, {z - (depth / 2) * scale}px)
			rotateX({angle}deg)
			translate3d({-px * scale}px, {-py * scale}px, 0px);"
	>
		{#each layers as [b, inflate] (b.u + ':' + b.v)}
			{@const bw = (b.w + inflate * 2) * scale}
			{@const bh = (b.h + inflate * 2) * scale}
			<div
				class="box"
				style="
					width: {bw}px;
					height: {bh}px;
					transform: translate3d({-bw / 2}px, {-inflate * scale}px, 0px);
				"
			>
				{#each faces(b, scale, inflate) as [name, fw, fh, transform, tx, ty, tw, th] (name)}
					<div
						class="face"
						style="
							width: {fw * scale}px;
							height: {fh * scale}px;
							margin-left: {(bw - fw * scale) / 2}px;
							margin-top: {(bh - fh * scale) / 2}px;
							transform: {transform};
							background-image: url({src});
							background-size: {(64 * fw * scale) / tw}px {(64 * fh * scale) / th}px;
							background-position: {(-tx * fw * scale) / tw}px {(-ty * fh * scale) / th}px;
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
		/* every offset is explicit in the transform above; a 0x0 joint with a
		   default origin keeps rotateX on the limb's own centre line */
		transform-origin: 0 0;
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
