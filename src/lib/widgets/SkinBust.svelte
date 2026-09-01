<script lang="ts">
	/**
	 * Head + a sliver of shoulder, cropped from a 64x64 skin sheet with layered
	 * backgrounds — no canvas, the browser does the compositing.
	 *
	 * Two stacked boxes, not one: a background layer isn't clipped to "its"
	 * region, it paints across the whole element. Sizing each box to exactly
	 * its crop makes the box itself the clip, instead of the layers
	 * overlapping into each other.
	 *
	 * The shoulder box is wider than the face: it's the top 2px of the body's
	 * front face PLUS 2px from the right and left faces on either side, which
	 * happen to sit immediately adjacent in the sheet (u=18..20..28..30), so
	 * widening the crop is one contiguous rect rather than extra layers. That
	 * spills 2px into the arms' own UV region instead of the torso's real side
	 * faces, but arm and torso skin tend to look close enough not to show.
	 */
	interface Props {
		src: string;
		/** Pixels per Minecraft unit. */
		scale?: number;
		alt?: string;
	}

	let { src, scale = 4, alt = '' }: Props = $props();

	const sheet = $derived(64 * scale);
</script>

<div class="flex flex-col items-center" role="img" aria-label={alt}>
	<!-- face + hat overlay -->
	<div
		class="pixel"
		style="
			width: {8 * scale}px;
			height: {8 * scale}px;
			background-image: url({src}), url({src});
			background-size: {sheet}px {sheet}px;
			background-position:
				{-40 * scale}px {-8 * scale}px,
				{-8 * scale}px {-8 * scale}px;
			background-repeat: no-repeat;
		"
	></div>
	<!-- top 2px of the body's front face, widened 2px each side into the
	     adjacent side faces so the shoulders read wider than the head -->
	<div
		class="pixel"
		style="
			width: {12 * scale}px;
			height: {2 * scale}px;
			background-image: url({src});
			background-size: {sheet}px {sheet}px;
			background-position: {-18 * scale}px {-20 * scale}px;
			background-repeat: no-repeat;
		"
	></div>
</div>

<style>
	.pixel {
		image-rendering: pixelated;
	}
</style>
