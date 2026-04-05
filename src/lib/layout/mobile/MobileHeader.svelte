<script lang="ts">
	import { run } from 'svelte/legacy';

	import MetacraftLogo from '$lib/icons/MetacraftLogo.svelte';
  import Menu from '$lib/icons/Menu.svelte';
  import Map from '$lib/icons/Map.svelte';
	import Sidebar from './Sidebar.svelte';

	import { page } from '$app/stores';

	let sideVisible = $state(false);
	run(() => {
		$page;
		sideVisible = false;
	});

	interface Props {
		hideHeader: boolean; // om true, göm background
	}

	let { hideHeader }: Props = $props();
</script>

<div class="flex justify-between fixed top-0 w-100% h-14 transition-all"
	class:bg-pink-800={!hideHeader || sideVisible}
>

	<button onmousedown={() => sideVisible = !sideVisible} class="notButton text-left inline-block h-100% aspect-square color-pink-400 p-2" class:color-white={sideVisible || hideHeader}>
		<Menu />
	</button>

	<a href="/" class="aspect-3 h-100% text-center p-2 color-pink-400" class:color-white={hideHeader && !sideVisible}>
		<MetacraftLogo />
	</a>

	{#if false}
		<a href="/map" class="inline-block h-100% aspect-square color-pink-400 p-3 text-right" class:color-white={$page.url.pathname === '/map' || (hideHeader && !sideVisible)}>
			<Map />
		</a>
	{:else}
		<div class="inline-block h-100% aspect-square p-3"></div>
	{/if}
</div>

<Sidebar {sideVisible} />