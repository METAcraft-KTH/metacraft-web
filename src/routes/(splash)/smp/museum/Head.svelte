<!--
	A player's head: the face and hat layer of their skin, cut out with CSS
	from the skin file itself, so nothing has to crop or render it. The skin
	comes from this site's API by its hash (one request per skin, cached for
	good), or is the default skin for a player without one.
-->
<script lang="ts">
	import steve from '$lib/images/museum-steve.png';
	import { API_BASE } from '$lib/museum';

	let { skin, size = 32 }: { skin: string | null; size?: number } = $props();

	let url = $derived(skin ? `${API_BASE}/skins/${skin}` : steve);
</script>

<!--
	A skin is 64 texels wide (64×32 for old ones, which keeps the same layout
	at the top), so at 8 texels per head each texel is size/8 px. Face at
	(8, 8), hat at (40, 8), hat on top.
-->
<span
	class="head"
	aria-hidden="true"
	style:width="{size}px"
	style:height="{size}px"
	style:background-image="url({url}), url({url})"
	style:background-size="{size * 8}px auto"
	style:background-position="-{size * 5}px -{size}px, -{size}px -{size}px"
></span>

<style>
	.head {
		display: inline-block;
		flex-shrink: 0;
		background-repeat: no-repeat;
		image-rendering: pixelated;
	}
</style>
