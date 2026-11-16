<!--
	An item's inventory icon, cut from the sprite sheet that
	scripts/museum-item-icons.mjs renders from the game's assets: one image
	for every item on the page, fetched once and cached. An item the sheet
	doesn't have (a newer version's, or a modded one) gets a placeholder.
-->
<script module lang="ts">
	import atlas from '$lib/images/museum-items.png';
	import sheet from '$lib/museum-items.json';

	const index = new Map(sheet.ids.map((id, i) => [id, i]));
</script>

<script lang="ts">
	import { itemName } from '$lib/museum';

	let { itemId, size = 32 }: { itemId: string; size?: number } = $props();

	let i = $derived(index.get(itemId));
	let name = $derived(itemName(itemId));
</script>

{#if i === undefined}
	<span class="icon missing" role="img" aria-label={name} title={name} style:width="{size}px" style:height="{size}px">?</span>
{:else}
	<span
		class="icon"
		role="img"
		aria-label={name}
		title={name}
		style:width="{size}px"
		style:height="{size}px"
		style:background-image="url({atlas})"
		style:background-size="{sheet.columns * size}px auto"
		style:background-position="-{(i % sheet.columns) * size}px -{Math.floor(i / sheet.columns) * size}px"
	></span>
{/if}

<style>
	.icon {
		display: inline-block;
		flex-shrink: 0;
		background-repeat: no-repeat;
		image-rendering: pixelated;
	}
	.missing {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		background: #0002;
		font-family: monospace;
		font-weight: bold;
		color: #0006;
	}
</style>
