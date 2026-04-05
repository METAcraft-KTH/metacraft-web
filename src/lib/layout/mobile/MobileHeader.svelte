<script lang="ts">

	import MetacraftLogo from '$lib/icons/MetacraftLogo.svelte';
	import Menu from '$lib/icons/Menu.svelte';
	import Map from '$lib/icons/Map.svelte';
	import Sidebar from './Sidebar.svelte';

	import { page } from '$app/state';

	let sideVisible = $state(false);
	$effect(() => {
		page;
		sideVisible = false;
	});

	interface Props {
		hideHeader: boolean; // om true, göm background
	}

	let { hideHeader }: Props = $props();
</script>

<div class="top-0 fixed flex justify-between w-100% h-14 transition-all"
	class:bg-pink-800={!hideHeader || sideVisible}
>

	<button onmousedown={() => sideVisible = !sideVisible} class="inline-block p-2 h-100% aspect-square text-left notButton color-pink-400" class:color-white={sideVisible || hideHeader}>
		<Menu />
	</button>

	<a href="/" class="p-2 h-100% aspect-3 text-center color-pink-400" class:color-white={hideHeader && !sideVisible}>
		<MetacraftLogo />
	</a>

	{#if false}
		<a href="/map" class="inline-block p-3 h-100% aspect-square text-right color-pink-400" class:color-white={page.url.pathname === '/smp/map' || (hideHeader && !sideVisible)}>
			<Map />
		</a>
	{:else}
		<div class="inline-block p-3 h-100% aspect-square"></div>
	{/if}
</div>

<Sidebar {sideVisible} />